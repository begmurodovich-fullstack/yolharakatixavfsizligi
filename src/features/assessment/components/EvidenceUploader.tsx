'use client';

import React, { useState, useRef } from 'react';
import { Evidence, EvidenceStatus } from '@/types';
import { GenericStatusBadge } from '@/components/ui/status-badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/toast';
import { compressImage, formatBytes } from '@/lib/imageCompressor';
import {
  Camera,
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Trash2,
  FileCheck2,
  Sparkles,
  Zap,
  UploadCloud,
} from 'lucide-react';

interface EvidenceUploaderProps {
  questionId: string;
  evidenceList: Evidence[];
  onUploadEvidence: (questionId: string, imageUrl: string, caption: string, rawFile?: File) => Promise<void>;
  onRemoveEvidence?: (evidenceId: string) => void;
}

const SAMPLE_PHOTO_PRESETS = [
  {
    name: '1.21 "Bolalar" yo‘l belgisi',
    url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=600&auto=format&fit=crop&q=80',
  },
  {
    name: 'Piyodalar o‘tish joyi "Zebra"',
    url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&auto=format&fit=crop&q=80',
  },
  {
    name: 'Sun’iy notekislik (tezlik to‘sig‘i)',
    url: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=600&auto=format&fit=crop&q=80',
  },
  {
    name: 'Yo‘l cheti xavfsizlik panjarasi',
    url: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=600&auto=format&fit=crop&q=80',
  },
];

export function EvidenceUploader({
  questionId,
  evidenceList,
  onUploadEvidence,
  onRemoveEvidence,
}: EvidenceUploaderProps) {
  const { error: toastError } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const [caption, setCaption] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [compressionStats, setCompressionStats] = useState<{
    originalSize: number;
    compressedSize: number;
  } | null>(null);

  const [selectedPresetUrl, setSelectedPresetUrl] = useState(SAMPLE_PHOTO_PRESETS[0].url);
  const [uploadMode, setUploadMode] = useState<'file' | 'preset'>('file');
  const [isUploading, setIsUploading] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);

  const questionEvidence = evidenceList.filter((e) => e.questionId === questionId);
  const hasExistingEvidence = questionEvidence.length > 0;

  // Handle local image selection and automatic client-side compression
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // Compress in browser memory
      const result = await compressImage(file, {
        maxWidth: 1600,
        maxHeight: 1600,
        quality: 0.82,
        mimeType: 'image/webp',
      });

      setSelectedFile(result.file);
      setPreviewUrl(result.previewUrl);
      setCompressionStats({
        originalSize: result.originalSize,
        compressedSize: result.compressedSize,
      });
    } catch (err: any) {
      toastError(err?.message || 'Rasm yuklashda xatolik', 'Xatolik');
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      if (uploadMode === 'file' && selectedFile) {
        await onUploadEvidence(
          questionId,
          previewUrl || '',
          caption || 'Yo‘l harakati xavfsizligi foto-dalili',
          selectedFile
        );
      } else {
        await onUploadEvidence(
          questionId,
          selectedPresetUrl,
          caption || 'Yo‘l harakati xavfsizligi foto-dalili'
        );
      }

      // Reset
      setCaption('');
      setSelectedFile(null);
      setPreviewUrl(null);
      setCompressionStats(null);
      setShowUploadForm(false);
    } catch (err: any) {
      toastError(err?.message || 'Yuklashda xatolik', 'Xatolik');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xs space-y-5">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
          <Camera className="w-4 h-4 text-teal-600" />
          <span>Tasdiqlovchi Foto-Dalil (Haqiqiy Ombor)</span>
        </div>

        <span className="text-xs font-semibold text-slate-500 font-mono">
          {questionEvidence.length} ta rasm yuklangan
        </span>
      </div>

      {/* Render Existing Evidence Cards */}
      {hasExistingEvidence && (
        <div className="space-y-3">
          {questionEvidence.map((ev) => (
            <div
              key={ev.id}
              className={`rounded-2xl border p-4 sm:p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between ${
                ev.status === EvidenceStatus.REJECTED
                  ? 'border-rose-200 bg-rose-50/40'
                  : ev.status === EvidenceStatus.APPROVED
                  ? 'border-emerald-200 bg-emerald-50/40'
                  : 'border-teal-200 bg-teal-50/30'
              }`}
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="h-16 w-20 sm:h-20 sm:w-24 shrink-0 rounded-xl overflow-hidden bg-slate-900 border border-slate-200 relative group">
                  <img
                    src={ev.imageUrl}
                    alt={ev.caption || 'Foto dalil'}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>

                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <GenericStatusBadge status={ev.status} />
                    <span className="text-[11px] font-mono text-slate-400">
                      #{ev.id}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-slate-900 line-clamp-1">
                    {ev.caption || 'Foto dalil izohi kiritilmagan'}
                  </p>
                  {ev.reviewReason && (
                    <p className="text-xs text-rose-700 font-medium">
                      Inspektor izohi: {ev.reviewReason}
                    </p>
                  )}
                </div>
              </div>

              {onRemoveEvidence && ev.status !== EvidenceStatus.APPROVED && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => onRemoveEvidence(ev.id)}
                  className="text-xs text-rose-600 hover:bg-rose-50 border-rose-200 rounded-xl shrink-0"
                >
                  <Trash2 className="w-3.5 h-3.5 mr-1" />
                  <span>O‘chirish</span>
                </Button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Upload Toggle */}
      {!showUploadForm ? (
        <Button
          type="button"
          variant="outline"
          onClick={() => setShowUploadForm(true)}
          className="w-full border-dashed border-2 border-teal-300 text-teal-800 bg-teal-50/40 hover:bg-teal-50 hover:border-teal-400 font-bold text-xs py-5 rounded-2xl gap-2 transition-colors"
        >
          <UploadCloud className="w-5 h-5 text-teal-600" />
          <span>
            {hasExistingEvidence ? 'Yana yangi rasm qo‘shish' : 'Foto-dalil yuklash (Kamera / Fayl)'}
          </span>
        </Button>
      ) : (
        <form onSubmit={handleUpload} className="rounded-2xl border border-teal-200 bg-teal-50/20 p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-teal-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-900">Rasm manbasini tanlang:</span>
            </div>

            <div className="flex items-center gap-1.5 p-1 bg-white border border-slate-200 rounded-xl">
              <button
                type="button"
                onClick={() => setUploadMode('file')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                  uploadMode === 'file'
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                📂 Kompyuter / Telefon
              </button>
              <button
                type="button"
                onClick={() => setUploadMode('preset')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                  uploadMode === 'preset'
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🖼️ Namunalar
              </button>
            </div>
          </div>

          {/* Mode 1: Real Local File Upload with Auto-Compressor */}
          {uploadMode === 'file' ? (
            <div className="space-y-3">
              {/* Hidden Standard File Input */}
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

              {/* Hidden Direct Rear-Camera Input for Mobile Phones */}
              <input
                type="file"
                ref={cameraInputRef}
                accept="image/*"
                capture="environment"
                onChange={handleFileChange}
                className="hidden"
              />

              {!previewUrl ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Option A: Direct Camera Capture (Ideal for phones) */}
                  <button
                    type="button"
                    onClick={() => cameraInputRef.current?.click()}
                    className="border-2 border-dashed border-teal-400 bg-teal-50/50 hover:bg-teal-50 rounded-2xl p-5 text-center transition-all space-y-2 group shadow-2xs"
                  >
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-teal-600 text-white shadow-md group-hover:scale-105 transition-transform">
                      <Camera className="h-6 w-6" />
                    </div>
                    <div>
                      <span className="text-xs font-extrabold text-teal-900 block">
                        📸 To‘g‘ridan-to‘g‘ri Suratga Olish
                      </span>
                      <p className="text-[11px] text-teal-700 mt-0.5 font-medium">
                        Telefon kamerasini ochish
                      </p>
                    </div>
                  </button>

                  {/* Option B: Browse Gallery / Files */}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100/80 rounded-2xl p-5 text-center transition-all space-y-2 group"
                  >
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800 text-white shadow-md group-hover:scale-105 transition-transform">
                      <UploadCloud className="h-6 w-6" />
                    </div>
                    <div>
                      <span className="text-xs font-extrabold text-slate-900 block">
                        📁 Fayllardan Tanlash
                      </span>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Kompyuter yoki galereyadan tanlash
                      </p>
                    </div>
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 h-44 flex items-center justify-center">
                    <img
                      src={previewUrl}
                      alt="Yuklangan rasm"
                      className="h-full w-full object-contain"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedFile(null);
                        setPreviewUrl(null);
                        setCompressionStats(null);
                      }}
                      className="absolute top-3 right-3 bg-slate-900/80 hover:bg-rose-600 text-white p-1.5 rounded-xl backdrop-blur-sm transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {compressionStats && (
                    <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-semibold">
                      <div className="flex items-center gap-1.5">
                        <Zap className="w-4 h-4 text-emerald-600" />
                        <span>Mijoz tomonida aqlli siqildi:</span>
                      </div>
                      <div className="font-mono text-[11px] text-emerald-800">
                        {formatBytes(compressionStats.originalSize)} &rarr;{' '}
                        <span className="font-bold text-emerald-950">
                          {formatBytes(compressionStats.compressedSize)}
                        </span>{' '}
                        (-
                        {Math.round(
                          (1 - compressionStats.compressedSize / compressionStats.originalSize) * 100
                        )}
                        %)
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            /* Mode 2: Sample Presets */
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-800">Namunaviy fotolardan tanlang:</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {SAMPLE_PHOTO_PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedPresetUrl(preset.url)}
                    className={`flex items-center gap-3 p-2.5 rounded-xl border text-left text-xs transition-all ${
                      selectedPresetUrl === preset.url
                        ? 'border-teal-600 bg-teal-50 font-bold text-teal-900 shadow-2xs'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                    }`}
                  >
                    <img
                      src={preset.url}
                      alt={preset.name}
                      className="w-10 h-10 rounded-lg object-cover border border-slate-200 shrink-0"
                    />
                    <span className="line-clamp-2">{preset.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Rasm izohi / Tavsif:</label>
            <Input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="masalan: Maktab oldidagi zebra chizig‘i va 5.19.1 yo‘l belgisi ko‘rinishi"
              className="text-xs h-10 rounded-xl bg-white border-slate-200"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setShowUploadForm(false);
                setSelectedFile(null);
                setPreviewUrl(null);
                setCompressionStats(null);
              }}
              className="text-xs font-semibold rounded-xl"
            >
              Bekor qilish
            </Button>
            <Button
              type="submit"
              disabled={isUploading || (uploadMode === 'file' && !selectedFile)}
              className="bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs rounded-xl h-9 px-5 gap-1.5 shadow-2xs"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>{isUploading ? 'Yuklanmoqda...' : 'Serverga Yuklash'}</span>
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
