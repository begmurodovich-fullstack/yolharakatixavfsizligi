import React from 'react';
import Link from 'next/link';
import { Shield } from 'lucide-react';
import { APP_CONFIG } from '@/lib/constants';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-center py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
      {/* Brand Header */}
      <div className="mx-auto w-full max-w-md text-center mb-6">
        <Link href="/" className="inline-flex items-center gap-3 group">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white shadow-md group-hover:bg-teal-700 transition-colors">
            <Shield className="h-6 w-6 text-teal-400" />
          </div>
          <div className="text-left">
            <span className="block text-lg font-bold text-slate-900 tracking-tight leading-tight">
              {APP_CONFIG.shortName}
            </span>
            <span className="block text-[11px] font-medium text-slate-500">
              Yagona monitoring platformasi
            </span>
          </div>
        </Link>
      </div>

      {/* Main Container */}
      <div className="mx-auto w-full max-w-md">
        {children}
      </div>

      {/* Bottom Footer Note */}
      <div className="mt-8 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} {APP_CONFIG.name}. Barcha huquqlar himoyalangan.</p>
        <p className="mt-1 text-[11px] text-slate-400">
          Xavfsiz ulanish: TLS / SSL himoyalangan raqamli monitoring portali
        </p>
      </div>
    </div>
  );
}
