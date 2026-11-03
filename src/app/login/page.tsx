'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import AuthLayout from '@/components/auth/AuthLayout';
import LoginForm from '@/components/auth/LoginForm';
import type { UserRole } from '@/components/auth/RoleSelector';

function LoginPageInner() {
  const searchParams = useSearchParams();
  const roleParam = searchParams.get('role') as UserRole | null;

  const validRoles: UserRole[] = ['shopper', 'seller', 'admin'];
  const initialRole: UserRole =
    roleParam && validRoles.includes(roleParam) ? roleParam : 'shopper';

  return (
    <AuthLayout activeTab="login">
      <LoginForm initialRole={initialRole} />
    </AuthLayout>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginPageInner />
    </Suspense>
  );
}
