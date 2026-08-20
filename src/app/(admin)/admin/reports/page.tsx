'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { schoolService } from '@/services/schoolService';
import { statisticsService } from '@/services/statisticsService';
import { assessmentService } from '@/services/assessmentService';
import { useToast } from '@/components/ui/toast';
import { School, Region, Criterion, SchoolRankingOverview } from '@/types';
import { ScoreStatusBadge } from '@/components/ui/status-badge';
import { Button } from '@/components/ui/button';
import {
  FileSpreadsheet,
  Download,
  Printer,
  Table,
  Filter,
  FileText,
  CheckCircle2,
  Calendar,
  Layers,
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdminReportsPage() {
  const { success } = useToast();

  const [schools, setSchools] = useState<School[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);
  const [criteria, setCriteria] = useState<Criterion[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Report config
  const [reportType, setReportType] = useState<'FULL_SCHOOLS' | 'REGIONAL_INDEX' | 'CRITERIA_SUMMARY'>('FULL_SCHOOLS');
  const [selectedRegionId, setSelectedRegionId] = useState('ALL');

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [allSchools, allRegions, allCrit] = await Promise.all([
        schoolService.getSchools(),
        schoolService.getRegions(),
        assessmentService.getCriteria(),
      ]);
      setSchools(allSchools);
      setRegions(allRegions);
      setCriteria(allCrit);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Export to CSV simulation
  const handleExportCSV = () => {
    let headers: string[] = [];
    let rows: string[][] = [];
    let filename = `maktablar-xavfsizlik-hisoboti-${new Date().toISOString().slice(0, 10)}.csv`;

    if (reportType === 'FULL_SCHOOLS') {
      headers = ['ID', 'Maktab nomi', 'Viloyat', 'Tuman', 'Direktor', 'Oquvchilar', 'Ball', 'Holat', 'Geolokatsiya'];
      rows = schools
        .filter((s) => selectedRegionId === 'ALL' || s.regionId === selectedRegionId)
        .map((s) => [
          s.id,
          `"${s.name}"`,
          `"${s.regionName}"`,
          `"${s.districtName}"`,
          `"${s.directorName || 'Biriktirilmagan'}"`,
          (s.studentCount || 0).toString(),
          s.currentScore.toString(),
          s.currentScore >= 80 ? 'YASHIL' : s.currentScore >= 50 ? 'SARIQ' : 'QIZIL',
          s.coordinateStatus,
        ]);
    } else if (reportType === 'REGIONAL_INDEX') {
      headers = ['Viloyat', 'Maktablar soni', 'Ortacha ball', 'Yashil maktablar', 'Sariq maktablar', 'Qizil maktablar'];
      rows = regions.map((r) => {
        const regSchools = schools.filter((s) => s.regionId === r.id);
        const avg = regSchools.length > 0 ? Math.round(regSchools.reduce((a, b) => a + b.currentScore, 0) / regSchools.length) : 0;
        const green = regSchools.filter((s) => s.currentScore >= 80).length;
        const yellow = regSchools.filter((s) => s.currentScore >= 50 && s.currentScore < 80).length;
        const red = regSchools.filter((s) => s.currentScore < 50).length;
        return [`"${r.name}"`, regSchools.length.toString(), avg.toString(), green.toString(), yellow.toString(), red.toString()];
      });
      filename = `hududlar-xavfsizlik-indeksi-${new Date().toISOString().slice(0, 10)}.csv`;
    } else {
      headers = ['Mezon ID', 'Mezon nomi', 'Savollar soni', 'Maksimal ball', 'Respublika ortacha bajarilishi'];
      rows = criteria.map((c) => [c.id, `"${c.title}"`, '2-3', '10-15 ball', '76%']);
      filename = `mezonlar-xulosasi-${new Date().toISOString().slice(0, 10)}.csv`;
    }

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    success(`Hisobot muvaffaqiyatli yuklab olindi: ${filename}`, 'Eksport yakunlandi');
  };

  const handlePrint = () => {
    window.print();
  };

  if (isLoading) {
    return (
      <div className="space-y-6 pb-12">
        <Skeleton className="h-24 w-full rounded-2xl" />
        <Skeleton className="h-44 w-full rounded-2xl" />
        <Skeleton className="h-96 w-full rounded-2xl" />
      </div>
    );
  }

  const displayedSchools = schools.filter(
    (s) => selectedRegionId === 'ALL' || s.regionId === selectedRegionId
  );

  return (
    <div className="space-y-6 pb-16">
      {/* 1. Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <FileSpreadsheet className="w-4 h-4 text-teal-600" />
            <span className="font-bold text-slate-800">Tahlil va Eksport</span>
            <span>•</span>
            <span>Rasmiy davlat hisobotlari</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Hisobotlar va Excel Eksport Markazi
          </h1>
          <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
            Vazirlik va tuman bo‘limlari uchun maktablar yo‘l xavfsizligi bo‘yicha tahliliy hisobotlar generatsiyasi va Excel/CSV fayl eksporti.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handlePrint}
            className="text-xs font-semibold gap-1.5 border-slate-200 rounded-xl h-10 px-4"
          >
            <Printer className="w-4 h-4" />
            <span>Chop etish</span>
          </Button>

          <Button
            type="button"
            size="sm"
            onClick={handleExportCSV}
            className="bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs gap-1.5 rounded-xl h-10 px-5 shadow-xs"
          >
            <Download className="w-4 h-4" />
            <span>Excel (.CSV) yuklab olish</span>
          </Button>
        </div>
      </div>

      {/* 2. Report Configuration Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xs space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Hisobot Turini Tanlang:
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => setReportType('FULL_SCHOOLS')}
            className={`p-4 rounded-2xl border text-left transition-all space-y-1.5 ${
              reportType === 'FULL_SCHOOLS'
                ? 'border-teal-600 bg-teal-50/50 shadow-xs'
                : 'border-slate-200 bg-slate-50/70 hover:bg-white'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">1. Maktablar To‘liq Reyestri</span>
              {reportType === 'FULL_SCHOOLS' && <CheckCircle2 className="w-4 h-4 text-teal-600" />}
            </div>
            <p className="text-[11px] text-slate-500">
              Barcha maktablar, direktorlar, ballar va geolokatsiya statuslari ro‘yxati
            </p>
          </button>

          <button
            type="button"
            onClick={() => setReportType('REGIONAL_INDEX')}
            className={`p-4 rounded-2xl border text-left transition-all space-y-1.5 ${
              reportType === 'REGIONAL_INDEX'
                ? 'border-teal-600 bg-teal-50/50 shadow-xs'
                : 'border-slate-200 bg-slate-50/70 hover:bg-white'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">2. Hududlar Xavfsizlik Indeksi</span>
              {reportType === 'REGIONAL_INDEX' && <CheckCircle2 className="w-4 h-4 text-teal-600" />}
            </div>
            <p className="text-[11px] text-slate-500">
              Viloyatlar bo‘yicha o‘rtacha ballar va Yashil/Sariq/Qizil maktablar soni
            </p>
          </button>

          <button
            type="button"
            onClick={() => setReportType('CRITERIA_SUMMARY')}
            className={`p-4 rounded-2xl border text-left transition-all space-y-1.5 ${
              reportType === 'CRITERIA_SUMMARY'
                ? 'border-teal-600 bg-teal-50/50 shadow-xs'
                : 'border-slate-200 bg-slate-50/70 hover:bg-white'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">3. 8 Mezon Bo‘yicha Xulosa</span>
              {reportType === 'CRITERIA_SUMMARY' && <CheckCircle2 className="w-4 h-4 text-teal-600" />}
            </div>
            <p className="text-[11px] text-slate-500">
              Piyodalar yo‘li, yo‘l belgilari, tezlik cheklovlari tahlili
            </p>
          </button>
        </div>

        {reportType === 'FULL_SCHOOLS' && (
          <div className="pt-2 flex items-center gap-3">
            <label className="text-xs font-semibold text-slate-700">Viloyat bo‘yicha cheklash:</label>
            <select
              value={selectedRegionId}
              onChange={(e) => setSelectedRegionId(e.target.value)}
              className="h-9 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-800 focus:outline-none"
            >
              <option value="ALL">Barcha viloyatlar</option>
              {regions.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* 3. Interactive Preview Table */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden space-y-3">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Table className="w-4 h-4 text-teal-600" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Hisobotning Oldindan Ko‘rish Jadvali (Preview)
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400 font-bold">
            {reportType === 'FULL_SCHOOLS'
              ? `${displayedSchools.length} ta maktab`
              : reportType === 'REGIONAL_INDEX'
              ? `${regions.length} ta hudud`
              : `${criteria.length} ta mezon`}
          </span>
        </div>

        <div className="overflow-x-auto">
          {reportType === 'FULL_SCHOOLS' && (
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-5">Maktab</th>
                  <th className="py-3.5 px-5">Hudud</th>
                  <th className="py-3.5 px-5">Direktor</th>
                  <th className="py-3.5 px-5 text-right">Ball</th>
                  <th className="py-3.5 px-5 text-center">Holat</th>
                  <th className="py-3.5 px-5 text-center">Geolokatsiya</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {displayedSchools.slice(0, 15).map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/70">
                    <td className="py-3 px-5 font-bold text-slate-900">{s.name}</td>
                    <td className="py-3 px-5 text-slate-600">{s.districtName}, {s.regionName}</td>
                    <td className="py-3 px-5 text-slate-700">{s.directorName}</td>
                    <td className="py-3 px-5 text-right font-mono font-black">{s.currentScore}</td>
                    <td className="py-3 px-5 text-center">
                      <ScoreStatusBadge score={s.currentScore} showScore={false} />
                    </td>
                    <td className="py-3 px-5 text-center font-mono text-[11px] text-slate-500">
                      {s.coordinateStatus}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {reportType === 'REGIONAL_INDEX' && (
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-5">Hudud nomi</th>
                  <th className="py-3.5 px-5 text-center">Maktablar soni</th>
                  <th className="py-3.5 px-5 text-right">O‘rtacha Ball</th>
                  <th className="py-3.5 px-5 text-center">Yashil</th>
                  <th className="py-3.5 px-5 text-center">Sariq</th>
                  <th className="py-3.5 px-5 text-center">Qizil</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {regions.map((r) => {
                  const regSchools = schools.filter((s) => s.regionId === r.id);
                  const avg = regSchools.length > 0 ? Math.round(regSchools.reduce((a, b) => a + b.currentScore, 0) / regSchools.length) : 0;
                  const green = regSchools.filter((s) => s.currentScore >= 80).length;
                  const yellow = regSchools.filter((s) => s.currentScore >= 50 && s.currentScore < 80).length;
                  const red = regSchools.filter((s) => s.currentScore < 50).length;

                  return (
                    <tr key={r.id} className="hover:bg-slate-50/70">
                      <td className="py-3 px-5 font-bold text-slate-900">{r.name}</td>
                      <td className="py-3 px-5 text-center font-mono font-bold">{regSchools.length}</td>
                      <td className="py-3 px-5 text-right font-mono font-black text-teal-800">{avg} / 100</td>
                      <td className="py-3 px-5 text-center font-mono text-emerald-700 font-bold">{green}</td>
                      <td className="py-3 px-5 text-center font-mono text-amber-700 font-bold">{yellow}</td>
                      <td className="py-3 px-5 text-center font-mono text-rose-700 font-bold">{red}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}

          {reportType === 'CRITERIA_SUMMARY' && (
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-5">Tartib</th>
                  <th className="py-3.5 px-5">Xavfsizlik Mezoni</th>
                  <th className="py-3.5 px-5 text-center">Talab</th>
                  <th className="py-3.5 px-5 text-right">Respublika Muvofiqligi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {criteria.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/70">
                    <td className="py-3 px-5 font-mono font-bold text-slate-400">#{c.order}</td>
                    <td className="py-3 px-5 font-bold text-slate-900">{c.title}</td>
                    <td className="py-3 px-5 text-center text-slate-600">Davlat standarti</td>
                    <td className="py-3 px-5 text-right font-mono font-bold text-teal-700">76% bajarilgan</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
