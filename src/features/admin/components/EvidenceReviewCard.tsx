'use client';

import React from 'react';
import { Evidence, EvidenceStatus, School, Question } from '@/types';
import { GenericStatusBadge } from '@/components/ui/status-badge';
import { Button } from '@/components/ui/button';
import {
  Check,
  X,
  School as SchoolIcon,
  HelpCircle,
  Clock,
  ExternalLink,
  MapPin,
} from 'lucide-react';

interface EvidenceReviewCardProps {
  evidence: Evidence;
  school?: School;
  question?: Question;
  onApprove: (id: string) => Promise<void>;
  onOpenRejectModal: (evidence: Evidence) => void;
}

export function EvidenceReviewCard({
  evidence,
  school,
  question,
  onApprove,
  onOpenRejectModal,
}: EvidenceReviewCardProps) {
  const isPending = evidence.status === EvidenceStatus.PENDING;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden flex flex-col justify-between hover:border-slate-300 transition-all">
      {/* Top Image Preview with Status Overlay */}
      <div className="relative h-48 sm:h-52 w-full bg-slate-900 overflow-hidden">
        <img
          src={evidence.imageUrl}
          alt={evidence.caption || 'Foto-dalil'}
          className="h-full w-full object-cover"
        />

        <div className="absolute top-3 left-3 z-10">
          <GenericStatusBadge status={evidence.status} />
        </div>

        <div className="absolute bottom-3 left-3 right-3 z-10 p-2.5 rounded-xl bg-slate-900/80 backdrop-blur-xs text-[11px] text-white border border-slate-700 truncate">
          {evidence.caption || 'Maktab yo‘l xavfsizligi foto-dalili'}
        </div>
      </div>

      {/* Body Info */}
      <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          {/* School Name */}
          <div className="flex items-center gap-2">
            <SchoolIcon className="w-4 h-4 text-teal-600 shrink-0" />
            <span className="text-xs sm:text-sm font-bold text-slate-900 truncate">
              {school?.name || '24-umumta’lim maktabi'}
            </span>
          </div>

          <div className="text-[11px] text-slate-500 flex items-center gap-1.5 pl-6">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>
              {school?.districtName || 'G‘ijduvon tumani'}, {school?.regionName || 'Buxoro viloyati'}
            </span>
          </div>

          {/* Question Context */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Tegishli savol:
            </div>
            <p className="text-slate-800 font-semibold line-clamp-2 leading-relaxed">
              {question?.text || 'Piyodalar o‘tish joyi va yo‘l belgilari holati'}
            </p>
          </div>

          {/* Rejection Note if already rejected */}
          {evidence.reviewReason && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800">
              <strong>Rad etish sababi:</strong> {evidence.reviewReason}
            </div>
          )}
        </div>

        {/* Footer & Actions */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
            <Clock className="w-3.5 h-3.5" />
            <span>{new Date(evidence.uploadedAt).toLocaleDateString('uz-UZ')}</span>
          </div>

          {isPending && (
            <div className="flex items-center gap-2">
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => onOpenRejectModal(evidence)}
                className="text-xs font-bold border-rose-200 text-rose-700 hover:bg-rose-50 rounded-xl h-8.5 px-3"
              >
                <X className="w-3.5 h-3.5" />
                <span>Rad etish</span>
              </Button>

              <Button
                type="button"
                size="sm"
                onClick={() => onApprove(evidence.id)}
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl h-8.5 px-3 shadow-xs gap-1"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Tasdiqlash</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
