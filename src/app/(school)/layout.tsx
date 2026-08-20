'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { SchoolHeader } from '@/components/layout/SchoolHeader';
import { SchoolNav } from '@/components/layout/SchoolNav';
import { Skeleton } from '@/components/ui/skeleton';

/**
 * ============================================================================
 * FRONTEND ROUTE GUARD: School Layout
 * ============================================================================
 * NOTE: This is frontend UX protection only to ensure users see the correct
 * workflow interface. Real cryptographic authorization and row-level data
 * security MUST be enforced by the backend API and database.
 * ============================================================================
 */
export default function SchoolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push('/login');
      } else if (user.isFirstLogin) {
        router.push('/onboarding');
      }
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-slate-50 p-6 space-y-4">
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-12 w-full max-w-4xl mx-auto" />
        <Skeleton className="h-96 w-full max-w-7xl mx-auto" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 pb-16 sm:pb-8">
      <SchoolHeader />
      <SchoolNav />
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>
    </div>
  );
}
