'use client';

import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, Home, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global application error caught:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 text-center space-y-5 shadow-lg">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center">
          <AlertTriangle className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <h2 className="text-lg sm:text-xl font-black text-slate-900">
            Tizimda xatolik yuz berdi
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Dastur ishlashida kutilmagan nosozlik kuzatildi. Iltimos, sahifani qayta yuklang.
          </p>
        </div>

        {error?.message && (
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-left">
            <span className="text-[10px] font-mono text-slate-400 block uppercase">Texnik xabar:</span>
            <span className="text-xs font-mono text-slate-700 break-all">{error.message}</span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2">
          <Button
            onClick={() => reset()}
            className="w-full sm:w-auto bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl gap-2 shadow-xs"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Qayta urinish</span>
          </Button>

          <Link href="/" className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="w-full border-slate-300 text-slate-700 text-xs font-medium px-4 py-2.5 rounded-xl gap-1.5"
            >
              <Home className="w-4 h-4" />
              <span>Bosh sahifa</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
