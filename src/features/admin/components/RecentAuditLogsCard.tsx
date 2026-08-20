'use client';

import React from 'react';
import { AuditLog } from '@/types';
import { History, Shield, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface RecentAuditLogsCardProps {
  logs: AuditLog[];
}

export function RecentAuditLogsCard({ logs }: RecentAuditLogsCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xs space-y-5">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-xl bg-teal-50 text-teal-700 border border-teal-200">
            <History className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">
              So‘nggi Administrator Harakatlari
            </h2>
            <p className="text-xs text-slate-500">
              Tizim xavfsizligi va audit jurnali harakatlari
            </p>
          </div>
        </div>

        <Link
          href="/admin/audit-logs"
          className="text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1"
        >
          <span>Barcha jurnallar</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="space-y-3">
        {logs.slice(0, 5).map((log) => (
          <div
            key={log.id}
            className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
          >
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 font-mono text-[10px] font-bold">
                {log.action}
              </span>
              <div>
                <span className="font-bold text-slate-900">{log.actorName}</span>
                <span className="text-slate-500 mx-1.5">•</span>
                <span className="text-slate-700">{log.target}</span>
              </div>
            </div>

            <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono self-end sm:self-center">
              <Clock className="w-3.5 h-3.5" />
              <span>
                {new Date(log.timestamp).toLocaleDateString('uz-UZ', {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
