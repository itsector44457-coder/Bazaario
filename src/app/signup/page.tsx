'use client';

import React from 'react';
import AuthLayout from '@/components/auth/AuthLayout';
import SignUpForm from '@/components/auth/SignUpForm';

export default function SignUpPage() {
  return (
    <AuthLayout activeTab="signup">
      <SignUpForm />
    </AuthLayout>
  );
}
