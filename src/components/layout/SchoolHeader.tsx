'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { School, AssessmentPeriod } from '@/types';
import { schoolService } from '@/services/schoolService';
import { assessmentService } from '@/services/assessmentService';
import { ScoreStatusBadge } from '@/components/ui/status-badge';
import { Shield, School as SchoolIcon, ChevronRight, LogOut, Calendar, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function SchoolHeader() {
  const { user, logout } = useAuth();
  const [school, setSchool] = useState<School | null>(null);
  const [period, setPeriod] = useState<AssessmentPeriod | null>(null);

  useEffect(() => {
    if (user?.schoolId) {
      schoolService.getSchoolById(user.schoolId).then((s) => setSchool(s));
    }
    assessmentService.getCurrentPeriod().then((p) => setPeriod(p));

    const handleScoreUpdate = (e: any) => {
      if (e.detail?.score !== undefined) {
        setSchool((prev) => (prev ? { ...prev, currentScore: Number(e.detail.score) } : prev));
      }
    };

    window.addEventListener('school-score-updated', handleScoreUpdate);
    return () => {
      window.removeEventListener('school-score-updated', handleScoreUpdate);
    };
  }, [user?.schoolId]);

  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-200 bg-white">
      {/* Top institution banner */}
      <div className="bg-slate-900 text-white px-4 py-1.5 text-xs">
        <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-2">
          {/* Identity hierarchy: Region -> District -> School */}
          <div className="flex items-center gap-1.5 text-slate-300 font-medium">
            <SchoolIcon className="w-3.5 h-3.5 text-teal-400 shrink-0" />
            <span>{school?.regionName || 'Navoiy viloyati'}</span>
            <ChevronRight className="w-3 h-3 text-slate-500" />
            <span>{school?.districtName || 'Qiziltepa tumani'}</span>
            <ChevronRight className="w-3 h-3 text-slate-500" />
            <span className="text-white font-semibold">{school?.name || "Umumta'lim maktabi"}</span>
          </div>

          {/* Test Mode & Current Period Badge */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
              ⚠️ Test rejimi
            </span>
            {period && (
              <div className="flex items-center gap-1 text-[11px] text-teal-300 bg-slate-800 px-2 py-0.5 rounded">
                <Calendar className="w-3 h-3 text-teal-400" />
                <span>Joriy davr: {period.academicYear}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main header row */}
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Link href="/school" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-700 text-white">
              <Shield className="h-5 w-5 text-teal-200" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 leading-tight">
                Maktab Shaxsiy Kabineti
              </div>
              <div className="text-xs text-slate-500">
                Direktor: {school?.directorName || 'Mas’ul xodim'}
              </div>
            </div>
          </Link>
        </div>

        {/* Live score indicator & actions */}
        <div className="flex items-center gap-3">
          {school && (
            <div className="hidden sm:flex items-center gap-2 border-r border-slate-200 pr-3">
              <span className="text-xs text-slate-500 font-medium">Joriy Yulduz Reytingi:</span>
              <ScoreStatusBadge score={school.currentScore} />
            </div>
          )}

          {/* Go to main public site */}
          <Link href="/">
            <Button
              variant="outline"
              size="sm"
              className="text-xs font-semibold gap-1.5 border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-teal-800 rounded-xl h-9 px-3"
            >
              <Globe className="w-3.5 h-3.5 text-teal-600" />
              <span>Asosiy saytga o‘tish</span>
            </Button>
          </Link>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => logout()}
            className="text-slate-600 hover:text-rose-600 gap-1 rounded-xl"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Chiqish</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
