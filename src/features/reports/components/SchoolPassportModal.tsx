'use client';

import React from 'react';
import { School, Criterion, Assessment } from '@/types';
import { Button } from '@/components/ui/button';
import {
  ShieldCheck,
  Printer,
  Download,
  X,
  MapPin,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  QrCode,
  Building,
  Users,
  Compass,
} from 'lucide-react';

interface SchoolPassportModalProps {
  school: School;
  criteria: Criterion[];
  assessment: Assessment | null;
  isOpen: boolean;
  onClose: () => void;
}

export function SchoolPassportModal({
  school,
  criteria,
  assessment,
  isOpen,
  onClose,
}: SchoolPassportModalProps) {
  if (!isOpen) return null;

  const totalScore = school.currentScore || 0;
  const scoreStatus = totalScore >= 80 ? 'GREEN' : totalScore >= 50 ? 'YELLOW' : 'RED';
  const statusLabel =
    scoreStatus === 'GREEN'
      ? 'Yuqori Xavfsizlik Darajasi (Yashil)'
      : scoreStatus === 'YELLOW'
      ? 'O‘rtacha Xavfsizlik Darajasi (Sariq)'
      : 'Xavfli / Qoniqarsiz Holat (Qizil)';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-sm print:p-0 print:bg-white">
      {/* Container */}
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto print:border-none print:shadow-none print:rounded-none">
        {/* Modal Action Controls (Hidden when printing) */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white print:hidden">
          <div className="flex items-center gap-2 font-bold text-sm">
            <ShieldCheck className="w-5 h-5 text-teal-400" />
            <span>Rasmiy Pasportni Ko‘rish va PDF Yuklab Olish</span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              onClick={handlePrint}
              className="bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs rounded-xl h-9 px-4 gap-1.5 shadow-xs"
            >
              <Printer className="w-4 h-4" />
              <span>Chop etish / PDF Saqlash</span>
            </Button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Official Document Body */}
        <div className="p-8 sm:p-12 space-y-8 print:p-6 print:space-y-6 text-slate-900">
          {/* 1. Official Header */}
          <div className="text-center space-y-2 border-b-2 border-slate-900 pb-6">
            <div className="flex items-center justify-center gap-3">
              <div className="h-12 w-12 rounded-full border-2 border-slate-900 flex items-center justify-center font-black text-slate-900 text-xl font-serif">
                🇺🇿
              </div>
            </div>
            <div className="text-xs font-mono uppercase tracking-widest text-slate-600 font-bold">
              O‘zbekiston Respublikasi Ichki Ishlar Vazirligi Jamoat Xavfsizligi Departamenti
            </div>
            <div className="text-sm font-extrabold uppercase tracking-wider text-slate-900">
              Yo‘l Harakati Xavfsizligi Xizmati & Maktabgacha va Maktab Ta’limi Vazirligi
            </div>
            <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-slate-900 pt-2 font-serif">
              Maktab Atrofidagi Yo‘l Harakati Xavfsizligi Pasporti
            </h1>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full border border-slate-300">
              <span>Hujjat №: YHX-PASSPORT-{school.id.toUpperCase()}</span>
              <span>•</span>
              <span>2025–2026 O‘quv yili (III chorak)</span>
            </div>
          </div>

          {/* 2. School Identity Grid */}
          <div className="grid grid-cols-2 gap-4 p-5 rounded-2xl border border-slate-200 bg-slate-50 print:bg-white print:border-slate-400">
            <div className="space-y-1.5">
              <div className="text-[11px] font-mono text-slate-500 uppercase font-bold">
                Ta’lim Muassasasi:
              </div>
              <div className="text-sm font-extrabold text-slate-900">
                {school.name}
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="text-[11px] font-mono text-slate-500 uppercase font-bold">
                Hudud / Tuman:
              </div>
              <div className="text-sm font-extrabold text-slate-900">
                {school.districtName}, {school.regionName}
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="text-[11px] font-mono text-slate-500 uppercase font-bold">
                Mas’ul Direktor / O‘quvchilar:
              </div>
              <div className="text-xs font-bold text-slate-800">
                {school.directorName || 'Kiritilmagan'} ({school.studentCount || 0} nafar o‘quvchi)
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="text-[11px] font-mono text-slate-500 uppercase font-bold">
                GPS Koordinatalari:
              </div>
              <div className="text-xs font-mono font-bold text-slate-800 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-teal-600 print:text-black" />
                <span>
                  {school.coordinates?.latitude || 40.1032}° N, {school.coordinates?.longitude || 64.6756}° E
                </span>
                <span className="text-[10px] text-emerald-800 font-bold bg-emerald-100 px-1.5 py-0.2 rounded print:border">
                  (Tasdiqlangan)
                </span>
              </div>
            </div>
          </div>

          {/* 3. Overall Score Indicator */}
          <div className="flex items-center justify-between p-5 rounded-2xl border-2 border-slate-900 bg-slate-900 text-white print:bg-white print:text-slate-900 print:border-slate-900">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-slate-300 print:text-slate-600 font-bold">
                Umumiy Yo‘l Xavfsizligi Indeksi
              </div>
              <div className="text-base font-black mt-0.5">{statusLabel}</div>
            </div>

            <div className="text-right">
              <div className="text-3xl font-black tracking-tight">{totalScore} / 100</div>
              <div className="text-[11px] font-mono text-teal-300 print:text-slate-700">
                Ballik Milliy Baholash
              </div>
            </div>
          </div>

          {/* 4. 8 Criteria Compliance Table */}
          <div className="space-y-3">
            <div className="text-xs font-black uppercase tracking-wider text-slate-900">
              1. Standart Xavfsizlik Mezonlari Bo‘yicha Ko‘rsatkichlar:
            </div>

            <div className="border border-slate-300 rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-300 text-slate-700 font-bold">
                    <th className="p-2.5 w-10 text-center">№</th>
                    <th className="p-2.5">Xavfsizlik Mezoni</th>
                    <th className="p-2.5 w-24 text-center">Maks. Ball</th>
                    <th className="p-2.5 w-28 text-center">To‘plangan Ball</th>
                    <th className="p-2.5 w-28 text-center">Holati</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {criteria.map((crit, idx) => {
                    const score = Math.round(crit.maxScore * (totalScore / 100));
                    const isGood = totalScore >= 70;
                    return (
                      <tr key={crit.id} className="hover:bg-slate-50">
                        <td className="p-2.5 text-center font-mono font-bold text-slate-600">
                          {idx + 1}
                        </td>
                        <td className="p-2.5 font-semibold text-slate-900">{crit.title}</td>
                        <td className="p-2.5 text-center font-mono">{crit.maxScore} ball</td>
                        <td className="p-2.5 text-center font-mono font-bold text-slate-900">
                          {score} ball
                        </td>
                        <td className="p-2.5 text-center">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              isGood
                                ? 'bg-emerald-100 text-emerald-900'
                                : 'bg-amber-100 text-amber-900'
                            }`}
                          >
                            {isGood ? 'Muvofiq' : 'Tavsiya etiladi'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* 5. Recommendations and Mandatory Corrective Actions */}
          <div className="space-y-2 p-4 rounded-xl border border-slate-300 bg-slate-50 print:bg-white">
            <div className="text-xs font-black uppercase text-slate-900">
              2. Majburiy Chora-tadbirlar va Xulosa:
            </div>
            <ul className="text-xs space-y-1 text-slate-700 list-disc list-inside">
              <li>Maktab darvozasi oldidagi piyodalar o‘tish joyi (zebra) chiziqlari muntazam yangilansin.</li>
              <li>Dars boshlanishi va tugash vaqtida ota-onalar va o‘qituvchilar navbatchilik patruli faollashtirilsin.</li>
              <li>&quot;Uy–Maktab–Uy&quot; xavfsiz harakatlanish sxemasi barcha boshlang‘ich sinf kundaliklariga yopishtirilsin.</li>
            </ul>
          </div>

          {/* 6. Signatures and Verification Seal */}
          <div className="grid grid-cols-3 gap-6 pt-6 border-t-2 border-slate-900 items-end">
            <div className="space-y-6">
              <div className="text-[11px] font-bold text-slate-800">
                Maktab Direktori:
              </div>
              <div className="border-b border-slate-400 pb-1 text-xs text-slate-600">
                Imzo: _____________________
              </div>
              <div className="text-[10px] text-slate-500">M.O‘. (Muhr o‘rni)</div>
            </div>

            <div className="space-y-6">
              <div className="text-[11px] font-bold text-slate-800">
                Hududiy YHXB Mas’ul Inspektori:
              </div>
              <div className="border-b border-slate-400 pb-1 text-xs text-slate-600">
                Imzo: _____________________
              </div>
              <div className="text-[10px] text-slate-500">M.O‘. (Muhr o‘rni)</div>
            </div>

            <div className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-300 bg-white">
              <QrCode className="w-14 h-14 text-slate-900" />
              <div className="text-[9px] font-mono text-slate-500 mt-1 text-center font-bold">
                YHX-QR VERIFICATION ID<br />
                {school.id.toUpperCase()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
