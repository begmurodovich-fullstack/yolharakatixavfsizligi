'use client';

import React, { useState } from 'react';
import { Evidence } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, AlertTriangle } from 'lucide-react';

interface EvidenceRejectModalProps {
  evidence: Evidence | null;
  onClose: () => void;
  onConfirmReject: (evidenceId: string, reason: string) => Promise<void>;
}

const PRESET_REASONS = [
  'Fotosurat sifati past yoki xira olingan',
  'Yo‘l belgisi yoki chiziqlar aniq ko‘rinmayapti',
  'Maktab darvozasi va tutash hudud to‘liq qamrab olinmagan',
  'Fotosurat boshqa hududga tegishli ko‘rinmoqda',
];

export function EvidenceRejectModal({
  evidence,
  onClose,
  onConfirmReject,
}: EvidenceRejectModalProps) {
  const [reason, setReason] = useState(PRESET_REASONS[0]);
  const [customReason, setCustomReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!evidence) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalReason = customReason.trim() || reason;
    setIsSubmitting(true);
    try {
      await onConfirmReject(evidence.id, finalReason);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-2xl animate-in zoom-in-95 duration-150 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2 text-rose-700">
            <AlertTriangle className="w-5 h-5" />
            <h2 className="text-base font-bold text-slate-900">
              Foto-Dalilni Rad Etish
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          Maktab mas’uliga kamchilikni to‘g‘rilash va yangi foto yuklash imkoniyatini berish uchun rad etish sababini ko‘rsating:
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Tayyor sababni tanlang:
            </label>
            <div className="space-y-1.5">
              {PRESET_REASONS.map((preset) => (
                <label
                  key={preset}
                  className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 cursor-pointer hover:bg-white transition-all"
                >
                  <input
                    type="radio"
                    name="rejectReason"
                    checked={reason === preset && !customReason}
                    onChange={() => {
                      setReason(preset);
                      setCustomReason('');
                    }}
                    className="text-rose-600 focus:ring-rose-500"
                  />
                  <span>{preset}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">
              Yoki boshqa maxsus sabab yozing:
            </label>
            <Input
              type="text"
              value={customReason}
              onChange={(e) => setCustomReason(e.target.value)}
              placeholder="masalan: Surat qishki mavsumga oid, joriy holat aks etmagan"
              className="text-xs h-10 rounded-xl"
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onClose}
              className="text-xs rounded-xl"
            >
              Bekor qilish
            </Button>

            <Button
              type="submit"
              disabled={isSubmitting}
              size="sm"
              className="bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs h-9.5 px-4 rounded-xl shadow-xs"
            >
              {isSubmitting ? 'Rad etilmoqda...' : 'Rad etishni tasdiqlash'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
