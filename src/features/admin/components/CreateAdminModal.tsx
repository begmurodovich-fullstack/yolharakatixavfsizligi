'use client';

import React, { useState } from 'react';
import { Role, Region } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, UserPlus, ShieldAlert, ShieldCheck } from 'lucide-react';

interface CreateAdminModalProps {
  regions: Region[];
  onClose: () => void;
  onCreate: (payload: {
    name: string;
    email: string;
    role: Role.ADMIN | Role.SUPER_ADMIN;
    regionId?: string;
  }) => Promise<void>;
}

export function CreateAdminModal({
  regions,
  onClose,
  onCreate,
}: CreateAdminModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<Role.ADMIN | Role.SUPER_ADMIN>(Role.ADMIN);
  const [regionId, setRegionId] = useState('ALL');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onCreate({
        name,
        email,
        role,
        regionId: regionId === 'ALL' ? undefined : regionId,
      });
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

      <div className="relative z-10 w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-2xl animate-in zoom-in-95 duration-150 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2 text-slate-900">
            <UserPlus className="w-5 h-5 text-teal-600" />
            <h2 className="text-base font-bold">
              Yangi Administrator Qo‘shish
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">
              Administrator F.I.Sh.:
            </label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="masalan: Qosimov Dilshod Baxtiyorovich"
              className="text-xs h-10 rounded-xl"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">
              Elektron pochta (Kirish logini):
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="masalan: inspector.bukhara@yhxx.uz"
              className="text-xs h-10 rounded-xl"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">
              Ruxsat Darajasi (Rol):
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as any)}
              className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-800 focus:outline-none"
            >
              <option value={Role.ADMIN}>Hududiy Inspektor / Admin (Tekshirish)</option>
              <option value={Role.SUPER_ADMIN}>Super Admin (To‘liq huquq)</option>
            </select>
          </div>

          {role === Role.ADMIN && (
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Biriktirilgan Viloyat:
              </label>
              <select
                value={regionId}
                onChange={(e) => setRegionId(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-800 focus:outline-none"
              >
                <option value="ALL">Respublika (Barcha viloyatlar)</option>
                {regions.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
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
              className="bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs h-9.5 px-4 rounded-xl shadow-xs"
            >
              {isSubmitting ? 'Qo‘shilmoqda...' : 'Adminni yaratish'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
