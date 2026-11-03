# Bazaario Backend — Production Architecture Document

> **Stack:** Node.js · Express · PostgreSQL · Redis · Socket.io · Nginx · Docker · PM2
> **Folder:** `Bazaario_Backend/`
> **Goal:** Production-grade REST + WebSocket API serving the existing Next.js frontend

---

## Table of Contents

1. [Folder Structure](#1-folder-structure)
2. [Database Schema](#2-database-schema-postgresql)
3. [API Routes](#3-api-routes)
4. [Authentication & Authorization](#4-authentication--authorization)
5. [Real-time — Socket.io](#5-real-time--socketio)
6. [Caching Strategy (Redis)](#6-caching-strategy-redis)
7. [Nginx Configuration](#7-nginx-configuration)
8. [PM2 — Cluster Mode](#8-pm2--cluster-mode)
9. [Docker Setup](#9-docker-setup)
10. [Environment Variables](#10-environment-variables)
11. [Standard API Response Shape](#11-standard-api-response-shape)
12. [Security Checklist](#12-security-checklist)
13. [Deployment Sequence](#13-deployment-sequence)
14. [Frontend → Backend Integration Points](#14-frontend--backend-integration-points)

---

## 1. Folder Structure

```
Bazaario_Backend/
├── nginx/
│   ├── nginx.conf                  # Main Nginx config
│   └── conf.d/
│       ├── bazaario.conf           # HTTP → HTTPS redirect + upstream
│       └── ssl.conf                # SSL/TLS settings
│
├── src/
│   ├── config/
│   │   ├── db.ts                   # PostgreSQL pool (pg)
│   │   ├── redis.ts                # Redis client (ioredis)
│   │   ├── env.ts                  # Validated env vars (zod)
│   │   └── logger.ts               # Winston logger
│   │
│   ├── middleware/
│   │   ├── auth.ts                 # JWT verify + role guard
│   │   ├── rateLimiter.ts          # Redis-backed rate limiting
│   │   ├── validate.ts             # Zod request validation
│   │   ├── errorHandler.ts         # Central error handler
│   │   └── upload.ts               # Multer + S3/Cloudflare R2
│   │
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.routes.ts
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   └── auth.schema.ts
│   │   ├── users/
│   │   ├── shops/
│   │   ├── products/
│   │   ├── orders/
│   │   ├── cart/
│   │   ├── categories/
│   │   ├── seller/
│   │   ├── admin/
│   │   ├── messages/
│   │   │   └── messages.gateway.ts  # Socket.io namespace
│   │   ├── notifications/
│   │   │   └── notifications.gateway.ts
│   │   ├── payments/
│   │   │   ├── payments.service.ts  # Razorpay integration
│   │   │   └── payments.webhook.ts
│   │   ├── search/
│   │   └── rental/
│   │
│   ├── socket/
│   │   ├── index.ts                 # Socket.io server init
│   │   └── socketAuth.ts            # Socket JWT middleware
│   │
│   ├── jobs/
│   │   ├── payoutJob.ts             # Daily seller payout cron
│   │   ├── orderTimeoutJob.ts       # Auto-cancel stale orders
│   │   └── reportJob.ts             # Admin monthly report
│   │
│   ├── utils/
│   │   ├── jwt.ts
│   │   ├── otp.ts                   # OTP gen + SMS (MSG91)
│   │   ├── pagination.ts
│   │   └── response.ts              # Standard API response shape
│   │
│   └── app.ts                       # Express app factory
│
├── db/
│   ├── migrations/
│   │   ├── 001_users.sql
│   │   ├── 002_shops.sql
│   │   ├── 003_products.sql
│   │   ├── 004_orders.sql
│   │   ├── 005_cart.sql
│   │   ├── 006_messages.sql
│   │   ├── 007_payments.sql
│   │   └── 008_rental.sql
│   └── seeds/
│       └── dev.sql
│
├── docker/
│   ├── Dockerfile
│   └── Dockerfile.prod
│
├── docker-compose.yml
├── docker-compose.prod.yml
├── ecosystem.config.js              # PM2 config
├── .env.example
├── tsconfig.json
├── package.json
└── README.md
```

---

## 2. Database Schema (PostgreSQL)

### `users`
```sql
id            UUID PRIMARY KEY DEFAULT gen_random_uuid()
phone         VARCHAR(15) UNIQUE
email         VARCHAR(255) UNIQUE
name          VARCHAR(255)
role          ENUM('shopper', 'seller', 'admin')
password_hash TEXT
google_id     TEXT
avatar_url    TEXT
is_active     BOOLEAN DEFAULT true
created_at    TIMESTAMPTZ DEFAULT NOW()
```

### `shops`
```sql
id              UUID PRIMARY KEY
owner_id        UUID REFERENCES users(id)
name            VARCHAR(255)
category_id     UUID REFERENCES categories(id)
phone           VARCHAR(15)
address         TEXT
city            VARCHAR(100)
pincode         VARCHAR(10)
lat             DECIMAL(9,6)
lng             DECIMAL(9,6)
open_time       TIME
close_time      TIME
has_delivery    BOOLEAN
has_pickup      BOOLEAN
photo_url       TEXT
gstin           VARCHAR(20)
pan_number      VARCHAR(15)
aadhaar_number  VARCHAR(20)
bank_account    VARCHAR(30)
ifsc_code       VARCHAR(15)
status          ENUM('pending','approved','rejected','suspended')
commission_rate DECIMAL(4,2) DEFAULT 7.7
created_at      TIMESTAMPTZ DEFAULT NOW()
```

### `products`
```sql
id              UUID PRIMARY KEY
shop_id         UUID REFERENCES shops(id)
name            VARCHAR(255)
description     TEXT
price           DECIMAL(12,2)
original_price  DECIMAL(12,2)
category_id     UUID REFERENCES categories(id)
rating          DECIMAL(3,2) DEFAULT 0
reviews_count   INT DEFAULT 0
in_stock        BOOLEAN DEFAULT true
stock_count     INT
images          TEXT[]
features        TEXT[]
tag             VARCHAR(50)
is_active       BOOLEAN DEFAULT true
is_flagged      BOOLEAN DEFAULT false
search_vector   TSVECTOR
created_at      TIMESTAMPTZ DEFAULT NOW()
```

### `orders`
```sql
id               UUID PRIMARY KEY
shopper_id       UUID REFERENCES users(id)
status           ENUM('placed','confirmed','packed','shipped','out_for_delivery','delivered','cancelled')
subtotal         DECIMAL(12,2)
discount         DECIMAL(12,2) DEFAULT 0
delivery_charge  DECIMAL(12,2) DEFAULT 0
total            DECIMAL(12,2)
payment_method   VARCHAR(50)
payment_status   ENUM('pending','paid','failed','refunded')
razorpay_order_id TEXT
address_snapshot JSONB
created_at       TIMESTAMPTZ DEFAULT NOW()
```

### `order_items`
```sql
id          UUID PRIMARY KEY
order_id    UUID REFERENCES orders(id)
product_id  UUID REFERENCES products(id)
shop_id     UUID REFERENCES shops(id)
name        VARCHAR(255)
price       DECIMAL(12,2)
quantity    INT
image_url   TEXT
```

### `cart_items`
```sql
id          UUID PRIMARY KEY
user_id     UUID REFERENCES users(id)
product_id  UUID REFERENCES products(id)
quantity    INT
created_at  TIMESTAMPTZ DEFAULT NOW()
UNIQUE(user_id, product_id)
```

### `messages`
```sql
id           UUID PRIMARY KEY
sender_id    UUID REFERENCES users(id)
receiver_id  UUID REFERENCES users(id)
shop_id      UUID REFERENCES shops(id)
content      TEXT
is_read      BOOLEAN DEFAULT false
created_at   TIMESTAMPTZ DEFAULT NOW()
```

### `categories`
```sql
id          UUID PRIMARY KEY
name        VARCHAR(100)
slug        VARCHAR(100) UNIQUE
icon_name   VARCHAR(100)
description TEXT
```

### `rental_items`
```sql
id              UUID PRIMARY KEY
shop_id         UUID REFERENCES shops(id)
name            VARCHAR(255)
description     TEXT
price_per_day   DECIMAL(12,2)
deposit         DECIMAL(12,2)
images          TEXT[]
available_from  DATE
available_to    DATE
is_active       BOOLEAN DEFAULT true
```

---

## 3. API Routes

### Auth — `/api/v1/auth`
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/register` | Register (shopper/seller) |
| POST | `/login` | Password login → JWT |
| POST | `/login/otp/send` | Send OTP to phone/email |
| POST | `/login/otp/verify` | Verify OTP → JWT |
| POST | `/login/google` | Google OAuth token verify |
| POST | `/refresh` | Refresh access token |
| POST | `/logout` | Revoke refresh token |
| POST | `/forgot-password` | Send reset link |
| POST | `/reset-password` | Reset with token |

### Users — `/api/v1/users`
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/me` | Own profile |
| PATCH | `/me` | Update profile |
| GET | `/me/addresses` | Saved addresses |
| POST | `/me/addresses` | Add address |
| DELETE | `/me/addresses/:id` | Remove address |

### Shops — `/api/v1/shops`
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/` | List shops (filter: city, category, status) |
| GET | `/:id` | Shop detail |
| POST | `/` | Register shop (seller) |
| PATCH | `/:id` | Update shop (owner only) |
| GET | `/:id/products` | Products by shop |
| GET | `/:id/reviews` | Shop reviews |

### Products — `/api/v1/products`
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/` | List products (filter, sort, paginate) |
| GET | `/:id` | Product detail |
| POST | `/` | Create product (seller) |
| PATCH | `/:id` | Update product (seller) |
| DELETE | `/:id` | Remove product (seller) |
| GET | `/trending` | Trending products |
| GET | `/deals` | Deals of the day |

### Search — `/api/v1/search`
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/?q=&category=&city=&sort=&page=` | Full-text search (pg tsvector) |
| GET | `/suggestions?q=` | Autocomplete (Redis cache) |

### Cart — `/api/v1/cart`
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/` | Get cart |
| POST | `/items` | Add item |
| PATCH | `/items/:productId` | Update quantity |
| DELETE | `/items/:productId` | Remove item |
| DELETE | `/` | Clear cart |

### Orders — `/api/v1/orders`
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/` | Place order |
| GET | `/` | My orders (shopper) |
| GET | `/:id` | Order detail |
| POST | `/:id/cancel` | Cancel order |
| GET | `/:id/track` | Live tracking status |

### Payments — `/api/v1/payments`
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/create-order` | Create Razorpay order |
| POST | `/verify` | Verify Razorpay signature |
| POST | `/webhook` | Razorpay webhook handler |

### Messages — `/api/v1/messages`
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/conversations` | All conversations |
| GET | `/conversations/:shopId` | Messages with a shop |
| POST | `/conversations/:shopId` | Send message (REST fallback) |
| PATCH | `/conversations/:shopId/read` | Mark as read |

### Seller — `/api/v1/seller`
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/dashboard` | Stats, revenue, orders |
| GET | `/orders` | Seller's incoming orders |
| PATCH | `/orders/:id/status` | Update order status |
| GET | `/earnings` | Earnings breakdown |
| GET | `/settings` | Shop settings |
| PATCH | `/settings` | Update shop settings |
| POST | `/verification/upload` | Upload KYC docs |

### Rental — `/api/v1/rental`
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/` | List rental items |
| GET | `/:id` | Rental item detail |
| POST | `/` | Create rental listing (seller) |
| POST | `/cart` | Add to rental cart |
| POST | `/orders` | Place rental order |

### Admin — `/api/v1/admin`
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/dashboard` | Platform metrics (GMV, commission, etc.) |
| GET | `/shops` | All shops with filters |
| POST | `/shops/:id/approve` | Approve shop |
| POST | `/shops/:id/reject` | Reject shop |
| POST | `/shops/:id/suspend` | Suspend shop |
| GET | `/users` | All users |
| PATCH | `/users/:id/ban` | Ban user |
| GET | `/products/flagged` | Flagged products |
| POST | `/products/:id/moderate` | Approve/remove product |
| GET | `/orders` | All orders + disputes |
| GET | `/categories` | Manage categories |
| POST | `/categories` | Create category |
| PATCH | `/categories/:id` | Update category |
| GET | `/commission` | Commission rules |
| PATCH | `/commission` | Update commission rate |
| GET | `/payouts` | Seller payout queue |
| POST | `/payouts/process` | Trigger batch payouts |

---

## 4. Authentication & Authorization

```
JWT Strategy:
  Access token:  15 min expiry, HS256
  Refresh token: 30 days, stored in Redis (revocable)
  Cookie: httpOnly, Secure, SameSite=Strict for refresh
  Header: Authorization: Bearer <access_token>

Roles:
  shopper  → own profile, cart, orders, messages
  seller   → above + shop management, own products
  admin    → all routes + platform management

OTP Flow:
  1. POST /auth/login/otp/send → generate 6-digit OTP
  2. Store in Redis: key=otp:{phone}, value=hash, TTL=5min
  3. Send via MSG91
  4. POST /auth/login/otp/verify → compare hash → issue JWT

Google OAuth:
  1. Frontend sends Google ID token
  2. Backend verifies with Google tokeninfo
  3. Upsert user → issue JWT
```

---

## 5. Real-time — Socket.io

```
Namespaces:
  /chat          — buyer ↔ seller messaging
  /notifications — order status, new message alerts

Events (chat):
  Client → Server:
    join_conversation   { shopId }
    send_message        { shopId, content }
    typing              { shopId }
    mark_read           { shopId }

  Server → Client:
    new_message         { message }
    typing_indicator    { userId }
    messages_read       { shopId }

Events (notifications):
  Server → Client:
    order_status_update { orderId, status }
    new_message_alert   { shopId, preview }
    payout_processed    { amount }

Auth: Socket middleware verifies JWT from handshake auth.token
Rooms: user:{userId}, shop:{shopId}
Scaling: Redis adapter (socket.io-redis) for multi-instance
```

---

## 6. Caching Strategy (Redis)

| Key Pattern | TTL | Purpose |
|-------------|-----|---------|
| `products:trending` | 10 min | Trending products list |
| `products:deals` | 10 min | Deals of the day |
| `search:suggest:{q}` | 5 min | Search autocomplete |
| `shop:{id}` | 5 min | Shop detail |
| `category:list` | 1 hour | All categories |
| `admin:dashboard:stats` | 2 min | Platform metrics |
| `otp:{phone}` | 5 min | OTP verification |
| `session:{refreshToken}` | 30 days | Refresh token store |
| `ratelimit:{ip}:{route}` | 1 min | Rate limit counters |

---

## 7. Nginx Configuration

### `nginx/nginx.conf`
```nginx
user nginx;
worker_processes auto;
worker_rlimit_nofile 65535;

events {
    worker_connections 4096;
    use epoll;
    multi_accept on;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format main '$remote_addr - [$time_local] "$request" $status $body_bytes_sent rt=$request_time';
    access_log /var/log/nginx/access.log main;
    error_log  /var/log/nginx/error.log warn;

    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;

    gzip on;
    gzip_vary on;
    gzip_comp_level 6;
    gzip_types text/plain text/css application/json application/javascript;

    add_header X-Frame-Options SAMEORIGIN;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Referrer-Policy no-referrer-when-downgrade;

    # Rate limiting zones
    limit_req_zone $binary_remote_addr zone=api:10m rate=60r/m;
    limit_req_zone $binary_remote_addr zone=auth:10m rate=10r/m;

    # Upstream: Node.js app servers (least-connections load balancing)
    upstream bazaario_api {
        least_conn;
        server 127.0.0.1:5000 weight=1;
        server 127.0.0.1:5001 weight=1;
        server 127.0.0.1:5002 weight=1;
        server 127.0.0.1:5003 weight=1;
        keepalive 32;
    }

    # Upstream: Next.js frontend
    upstream bazaario_web {
        server 127.0.0.1:3000;
        keepalive 16;
    }

    include /etc/nginx/conf.d/*.conf;
}
```

### `nginx/conf.d/bazaario.conf`
```nginx
# HTTP → HTTPS redirect
server {
    listen 80;
    server_name bazaario.com www.bazaario.com api.bazaario.com;
    return 301 https://$host$request_uri;
}

# Main frontend
server {
    listen 443 ssl http2;
    server_name bazaario.com www.bazaario.com;
    include /etc/nginx/conf.d/ssl.conf;

    location / {
        proxy_pass http://bazaario_web;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|woff2|webp)$ {
        proxy_pass http://bazaario_web;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}

# API subdomain
server {
    listen 443 ssl http2;
    server_name api.bazaario.com;
    include /etc/nginx/conf.d/ssl.conf;

    location /api/ {
        limit_req zone=api burst=20 nodelay;
        proxy_pass http://bazaario_api;
        proxy_http_version 1.1;
        proxy_set_header Connection "";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_connect_timeout 5s;
        proxy_read_timeout 30s;
    }

    location /api/v1/auth {
        limit_req zone=auth burst=5 nodelay;
        proxy_pass http://bazaario_api;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # WebSocket — Socket.io
    location /socket.io/ {
        proxy_pass http://bazaario_api;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_read_timeout 3600s;
        proxy_send_timeout 3600s;
    }

    # Razorpay webhook — no rate limit
    location /api/v1/payments/webhook {
        proxy_pass http://bazaario_api;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
    }
}
```

### `nginx/conf.d/ssl.conf`
```nginx
ssl_certificate     /etc/letsencrypt/live/bazaario.com/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/bazaario.com/privkey.pem;
ssl_session_cache   shared:SSL:10m;
ssl_session_timeout 10m;
ssl_protocols       TLSv1.2 TLSv1.3;
ssl_ciphers         ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384;
ssl_prefer_server_ciphers off;
ssl_stapling        on;
ssl_stapling_verify on;
add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
```

---

## 8. PM2 — Cluster Mode

### `ecosystem.config.js`
```js
module.exports = {
  apps: [
    {
      name: 'bazaario-api',
      script: 'dist/app.js',
      instances: 'max',         // one per CPU core
      exec_mode: 'cluster',
      watch: false,
      env_production: {
        NODE_ENV: 'production',
        PORT: 5000,
      },
      max_memory_restart: '500M',
      error_file: 'logs/err.log',
      out_file: 'logs/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
    },
  ],
};
```

> PM2 cluster mode spawns N workers all on port 5000.
> Nginx upstream handles load balancing via least_conn.

---

## 9. Docker Setup

### `docker/Dockerfile.prod`
```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json tsconfig.json ./
RUN npm ci --only=production
COPY src ./src
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package.json ./
EXPOSE 5000
USER node
CMD ["node", "dist/app.js"]
```

### `docker-compose.prod.yml`
```yaml
version: '3.9'

services:
  api:
    build:
      context: .
      dockerfile: docker/Dockerfile.prod
    restart: always
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
      - REDIS_URL=${REDIS_URL}
      - JWT_SECRET=${JWT_SECRET}
      - RAZORPAY_KEY_ID=${RAZORPAY_KEY_ID}
      - RAZORPAY_KEY_SECRET=${RAZORPAY_KEY_SECRET}
    deploy:
      replicas: 4
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
    networks:
      - bazaario_net
    depends_on:
      - postgres
      - redis

  postgres:
    image: postgres:16-alpine
    restart: always
    volumes:
      - pgdata:/var/lib/postgresql/data
    environment:
      POSTGRES_DB: bazaario
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    networks:
      - bazaario_net

  redis:
    image: redis:7-alpine
    restart: always
    command: redis-server --requirepass ${REDIS_PASSWORD} --maxmemory 256mb --maxmemory-policy allkeys-lru
    volumes:
      - redisdata:/data
    networks:
      - bazaario_net

  nginx:
    image: nginx:1.25-alpine
    restart: always
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./nginx/conf.d:/etc/nginx/conf.d:ro
      - /etc/letsencrypt:/etc/letsencrypt:ro
      - nginxlogs:/var/log/nginx
    depends_on:
      - api
    networks:
      - bazaario_net

volumes:
  pgdata:
  redisdata:
  nginxlogs:

networks:
  bazaario_net:
    driver: bridge
```

---

## 10. Environment Variables

### `.env.example`
```env
# App
NODE_ENV=production
PORT=5000
API_BASE_URL=https://api.bazaario.com

# Database
DATABASE_URL=postgresql://user:pass@postgres:5432/bazaario
POSTGRES_USER=bazaario_user
POSTGRES_PASSWORD=super_secret_password

# Redis
REDIS_URL=redis://:password@redis:6379
REDIS_PASSWORD=redis_secret_password

# JWT
JWT_SECRET=your_256_bit_random_secret
JWT_ACCESS_EXPIRES=15m
JWT_REFRESH_EXPIRES=30d

# Google OAuth
GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com

# OTP — MSG91
MSG91_AUTH_KEY=your_msg91_key
MSG91_SENDER_ID=BAZZRO

# Payments — Razorpay
RAZORPAY_KEY_ID=rzp_live_xxx
RAZORPAY_KEY_SECRET=xxx
RAZORPAY_WEBHOOK_SECRET=xxx

# File Storage — Cloudflare R2
R2_ACCOUNT_ID=xxx
R2_ACCESS_KEY_ID=xxx
R2_SECRET_ACCESS_KEY=xxx
R2_BUCKET_NAME=bazaario-uploads
R2_PUBLIC_URL=https://cdn.bazaario.com

# CORS
CORS_ORIGIN=https://bazaario.com,https://www.bazaario.com
```

---

## 11. Standard API Response Shape

```typescript
// Success
{
  "success": true,
  "data": { ... },
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 342,
    "totalPages": 18
  }
}

// Error
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "phone is required",
    "details": [...]
  }
}
```

---

## 12. Security Checklist

- [x] JWT access + refresh token rotation
- [x] OTP expiry in Redis (5 min, 3 attempt limit)
- [x] Nginx rate limiting: 60 req/min API, 10 req/min auth
- [x] Helmet.js — security headers
- [x] CORS whitelist — only bazaario.com origins
- [x] Parameterized SQL queries — no raw string concat
- [x] Zod validation on all request bodies
- [x] File upload: type check (image only), 5MB limit, stored on R2
- [x] Razorpay webhook signature verification
- [x] HTTPS enforced via Nginx + HSTS header
- [x] PostgreSQL — no superuser in app connection
- [x] Redis password-protected
- [x] Docker containers run as non-root (`USER node`)
- [x] `.env` in `.gitignore` — no secrets committed

---

## 13. Deployment Sequence

```bash
# 1. Clone backend repo
git clone https://github.com/itsector44457-coder/Bazaario_Backend.git
cd Bazaario_Backend

# 2. Copy and fill env
cp .env.example .env

# 3. Build & start all services
docker compose -f docker-compose.prod.yml up -d --build

# 4. Run DB migrations
docker compose exec api npm run migrate:up

# 5. Reload Nginx (after SSL cert setup)
docker compose exec nginx nginx -s reload

# 6. Monitor
docker compose logs -f api
```

---

## 14. Frontend → Backend Integration Points

| Frontend Route | API Call Needed |
|----------------|-----------------|
| `/login` | `POST /api/v1/auth/login` or `/login/otp/*` |
| `/signup` | `POST /api/v1/auth/register` |
| `/` (home) | `GET /api/v1/products/trending`, `/deals`, `/shops` |
| `/search` | `GET /api/v1/search?q=` |
| `/product/:id` | `GET /api/v1/products/:id` |
| `/shop/:id` | `GET /api/v1/shops/:id` + `/shops/:id/products` |
| `/cart` | `GET/POST/PATCH/DELETE /api/v1/cart` |
| `/checkout` | `POST /api/v1/payments/create-order` |
| `/orders` | `GET /api/v1/orders` |
| `/order-tracking` | `GET /api/v1/orders/:id/track` |
| `/messages` | `GET /api/v1/messages/conversations` + Socket.io `/chat` |
| `/seller-registration` | `POST /api/v1/shops` |
| `/seller-verification` | `POST /api/v1/seller/verification/upload` |
| `/seller-products` | `GET/POST/PATCH/DELETE /api/v1/products` |
| `/seller-orders` | `GET/PATCH /api/v1/seller/orders` |
| `/seller-earnings` | `GET /api/v1/seller/earnings` |
| `/seller-messages` | Socket.io `/chat` namespace |
| `/admin/dashboard` | `GET /api/v1/admin/dashboard` |
| `/admin/approvals` | `GET/POST /api/v1/admin/shops` |
| `/admin/users` | `GET /api/v1/admin/users` |
| `/admin/moderation` | `GET/POST /api/v1/admin/products/flagged` |
| `/rental` | `GET /api/v1/rental` |

---

*Implementation order: Auth → Users → Categories → Shops → Products → Cart → Orders → Payments → Seller → Admin → Messages → Rental*
