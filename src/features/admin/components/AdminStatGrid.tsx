'use client';

import React from 'react';
import { AdminDashboardSummary } from '@/services/adminService';
import {
  School,
  MapPin,
  Camera,
  Trophy,
  ShieldCheck,
  TrendingUp,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import Link from 'next/link';

interface AdminStatGridProps {
  summary: AdminDashboardSummary;
}

export function AdminStatGrid({ summary }: AdminStatGridProps) {
  const verifiedPercentage =
    summary.totalSchools > 0
      ? Math.round((summary.verifiedCoordinatesCount / summary.totalSchools) * 100)
      : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Total Schools */}
      <Link href="/admin/schools" className="block group">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs hover:border-teal-500 hover:shadow-xs transition-all flex flex-col justify-between h-full space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Jami Maktablar
            </span>
            <div className="p-2.5 rounded-xl bg-teal-50 text-teal-700 group-hover:bg-teal-700 group-hover:text-white transition-colors">
              <School className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-slate-900 font-mono tracking-tight">
              {summary.totalSchools}
            </div>
            <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-500">
              <span className="text-emerald-700 font-bold">{summary.greenCount} Yashil</span>
              <span>•</span>
              <span className="text-amber-700 font-bold">{summary.yellowCount} Sariq</span>
              <span>•</span>
              <span className="text-rose-700 font-bold">{summary.redCount} Qizil</span>
            </div>
          </div>
        </div>
      </Link>

      {/* 2. Verified Coordinates */}
      <Link href="/admin/coordinates" className="block group">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs hover:border-teal-500 hover:shadow-xs transition-all flex flex-col justify-between h-full space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Tasdiqlangan Geolokatsiya
            </span>
            <div className="p-2.5 rounded-xl bg-blue-50 text-blue-700 group-hover:bg-blue-700 group-hover:text-white transition-colors">
              <MapPin className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-slate-900 font-mono tracking-tight">
              {verifiedPercentage}%
            </div>
            <div className="flex items-center gap-1 mt-1.5 text-xs text-slate-500">
              <span>{summary.verifiedCoordinatesCount} ta tasdiqlangan</span>
              {summary.pendingCoordinatesCount > 0 && (
                <span className="text-amber-600 font-bold font-mono">
                  ({summary.pendingCoordinatesCount} ta kutilmoqda)
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>

      {/* 3. Pending Evidence Queue */}
      <Link href="/admin/evidence" className="block group">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs hover:border-teal-500 hover:shadow-xs transition-all flex flex-col justify-between h-full space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Kutilayotgan Foto-Dalillar
            </span>
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700 group-hover:bg-amber-700 group-hover:text-white transition-colors">
              <Camera className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-slate-900 font-mono tracking-tight">
              {summary.pendingEvidenceCount}
            </div>
            <div className="flex items-center gap-1 mt-1.5 text-xs text-amber-700 font-semibold">
              <Clock className="w-3.5 h-3.5" />
              <span>Ekspert tekshiruvini kutmoqda</span>
            </div>
          </div>
        </div>
      </Link>

      {/* 4. Republic Avg Score */}
      <div className="rounded-2xl border border-teal-200 bg-teal-50/50 p-5 sm:p-6 shadow-xs flex flex-col justify-between space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-800">
            Respublika O‘rtacha Bali
          </span>
          <div className="p-2.5 rounded-xl bg-teal-100 text-teal-800">
            <Trophy className="w-5 h-5" />
          </div>
        </div>
        <div>
          <div className="text-3xl sm:text-4xl font-black text-teal-950 font-mono tracking-tight">
            {summary.republicAverageScore} <span className="text-sm font-normal text-teal-700 font-sans">/ 100</span>
          </div>
          <div className="flex items-center gap-1.5 mt-1.5 text-xs text-teal-800 font-semibold">
            <TrendingUp className="w-3.5 h-3.5 text-teal-600" />
            <span>Davlat normativiga muvofiq</span>
          </div>
        </div>
      </div>
    </div>
  );
}
