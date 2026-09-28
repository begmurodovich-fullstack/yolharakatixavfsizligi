'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminEvidencePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/admin/assessments');
  }, [router]);

  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="text-slate-400 text-xs font-mono">
        Yo‘naltirilmoqda...
      </div>
    </div>
  );
}
