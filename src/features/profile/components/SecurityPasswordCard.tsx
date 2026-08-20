'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { KeyRound, Eye, EyeOff, Lock } from 'lucide-react';

interface SecurityPasswordCardProps {
  onChangePassword: (oldPass: string, newPass: string) => Promise<void>;
}

export function SecurityPasswordCard({ onChangePassword }: SecurityPasswordCardProps) {
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorText, setErrorText] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorText('');

    if (newPass.length < 6) {
      setErrorText("Yangi parol kamida 6 ta belgidan iborat bo'lishi lozim.");
      return;
    }

    if (newPass !== confirmPass) {
      setErrorText('Yangi parollar bir-biriga mos kelmadi.');
      return;
    }

    setIsSaving(true);
    try {
      await onChangePassword(oldPass, newPass);
      setOldPass('');
      setNewPass('');
      setConfirmPass('');
    } catch (err: any) {
      setErrorText(err?.message || 'Parolni yangilashda xatolik yuz berdi.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xs space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-slate-100 text-slate-700">
            <KeyRound className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Hisob Xavfsizligi va Parolni Yangilash
            </h2>
            <p className="text-xs text-slate-500">
              Maktab foydalanuvchisi kirish parolini o‘zgartirish
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {errorText && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 font-medium">
            {errorText}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">
              Joriy parol:
            </label>
            <Input
              type={showPass ? 'text' : 'password'}
              value={oldPass}
              onChange={(e) => setOldPass(e.target.value)}
              placeholder="••••••••"
              className="text-xs h-10 rounded-xl"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">
              Yangi parol:
            </label>
            <Input
              type={showPass ? 'text' : 'password'}
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              placeholder="••••••••"
              className="text-xs h-10 rounded-xl"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">
              Yangi parolni tasdiqlang:
            </label>
            <Input
              type={showPass ? 'text' : 'password'}
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              placeholder="••••••••"
              className="text-xs h-10 rounded-xl"
              required
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1.5 font-medium"
          >
            {showPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5 text-teal-600" />}
            <span>Parollarni {showPass ? 'yashirish' : 'ko‘rsatish'}</span>
          </button>

          <Button
            type="submit"
            disabled={isSaving}
            size="sm"
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold gap-1.5 text-xs h-10 px-5 rounded-xl shadow-xs"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>{isSaving ? 'Saqlanmoqda...' : 'Parolni yangilash'}</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
