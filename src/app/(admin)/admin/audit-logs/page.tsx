'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { adminService } from '@/services/adminService';
import { AuditLog } from '@/types';
import { Input } from '@/components/ui/input';
import { History, Search, Filter, ShieldCheck, Clock, UserCheck } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/ui/empty-state';

export default function AdminAuditLogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [actionFilter, setActionFilter] = useState('ALL');
  const [isLoading, setIsLoading] = useState(true);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const allLogs = await adminService.getAuditLogs(100);
      setLogs(allLogs);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      if (actionFilter !== 'ALL' && log.action !== actionFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchActor = log.actorName.toLowerCase().includes(q);
        const matchTarget = log.target.toLowerCase().includes(q);
        const matchAction = log.action.toLowerCase().includes(q);
        if (!matchActor && !matchTarget && !matchAction) return false;
      }
      return true;
    });
  }, [logs, actionFilter, searchQuery]);

  if (isLoading) {
    return (
      <div className="space-y-6 pb-12">
        <Skeleton className="h-24 w-full rounded-2xl" />
        <Skeleton className="h-20 w-full rounded-2xl" />
        <Skeleton className="h-96 w-full rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-16">
      {/* 1. Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <History className="w-4 h-4 text-teal-600" />
            <span className="font-bold text-slate-800">Xavfsizlik va Shaffoflik</span>
            <span>•</span>
            <span>O‘zgarmas harakatlar tarixi</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Tizim Harakatlari va Audit Jurnali
          </h1>
          <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
            Administratorlar va inspektorlar tomonidan amalga oshirilgan barcha tekshiruv, tasdiqlash va parollarni o‘zgartirish harakatlarining yozib borilishi.
          </p>
        </div>

        <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 text-white font-mono text-xs font-bold w-fit">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Audit himoyalangan</span>
        </span>
      </div>

      {/* 2. Filters */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Foydalanuvchi yoki obyekt bo‘yicha qidiruv..."
            className="pl-9 text-xs h-10 rounded-xl"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-slate-600">Amal turi:</label>
          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-800 focus:outline-none"
          >
            <option value="ALL">Barcha amallar</option>
            <option value="REVIEW_EVIDENCE">Foto-dalilni tekshirish</option>
            <option value="VERIFY_COORDINATES">Geolokatsiyani tasdiqlash</option>
            <option value="VERIFY_ASSESSMENT">Baholashni tasdiqlash</option>
            <option value="RESET_SCHOOL_PASSWORD">Parolni tiklash</option>
            <option value="TOGGLE_SCHOOL_STATUS">Statusni o‘zgartirish</option>
            <option value="CREATE_ADMIN">Admin yaratish</option>
          </select>
        </div>
      </div>

      {/* 3. Log Table */}
      {filteredLogs.length === 0 ? (
        <EmptyState
          icon={History}
          title="Audit yozuvlari topilmadi"
          description="Qidiruv parametrlari bo‘yicha hech qanday yozuv mavjud emas."
          className="py-16"
        />
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-4 px-5">Vaqt</th>
                  <th className="py-4 px-5">Mas’ul Shaxs</th>
                  <th className="py-4 px-5">Rol</th>
                  <th className="py-4 px-5">Amal</th>
                  <th className="py-4 px-5">Obyekt / Tafsilot</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/70">
                    {/* Timestamp */}
                    <td className="py-3.5 px-5 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                      {new Date(log.timestamp).toLocaleDateString('uz-UZ', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                      })}
                    </td>

                    {/* Actor */}
                    <td className="py-3.5 px-5 font-bold text-slate-900">
                      {log.actorName}
                    </td>

                    {/* Role */}
                    <td className="py-3.5 px-5">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-100 text-slate-700 border border-slate-200">
                        {log.actorRole}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-5">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold bg-teal-50 text-teal-800 border border-teal-200">
                        {log.action}
                      </span>
                    </td>

                    {/* Target */}
                    <td className="py-3.5 px-5 text-slate-800 font-medium">
                      {log.target}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
