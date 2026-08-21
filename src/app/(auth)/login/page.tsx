'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/ui/toast';
import { UserRole } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import {
  Shield,
  LogIn,
  Lock,
  Mail,
  AlertCircle,
  Eye,
  EyeOff,
  Info,
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const { success, error } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  /**
   * Handle standard credential submission
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      setErrorMessage('Login va parol kiritilishi shart.');
      return;
    }

    try {
      const authenticatedUser = await login({
        email: trimmedEmail,
        password: trimmedPassword,
      });

      success(`Xush kelibsiz, ${authenticatedUser.name}!`, 'Muvaffaqiyatli kirildi');

      if (authenticatedUser.role === UserRole.SCHOOL_USER) {
        if (authenticatedUser.isFirstLogin) {
          router.push('/onboarding');
        } else {
          router.push('/school');
        }
      } else {
        router.push('/admin');
      }
    } catch (err: any) {
      const msg = err?.message || 'Login yoki parol noto‘g‘ri.';
      setErrorMessage(msg);
      error(msg, 'Kirish rad etildi');
    }
  };

  return (
    <div className="space-y-6 max-w-md mx-auto">
      {/* Main Login Card */}
      <Card className="border-slate-200 bg-white shadow-md">
        <CardHeader className="p-6 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-700 uppercase tracking-wider mb-1">
            <Shield className="w-4 h-4 text-teal-600" />
            <span>Rasmiy Avtorizatsiya</span>
          </div>
          <CardTitle className="text-xl font-bold text-slate-900 tracking-tight">
            Tizimga kirish
          </CardTitle>
          <CardDescription className="text-xs text-slate-500">
            Iltimos, maktab yoki administrator hisob ma’lumotlaringizni kiriting:
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6">
          {/* Error Banner */}
          {errorMessage && (
            <div className="mb-4 flex items-start gap-2.5 rounded-xl border border-rose-200 bg-rose-50 p-3.5 text-xs text-rose-800 animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-bold">Kirishda xatolik:</span>
                <p className="text-[11px] leading-relaxed text-rose-700">{errorMessage}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email / Username Field */}
            <div className="space-y-1.5">
              <label
                htmlFor="login-email"
                className="block text-xs font-semibold text-slate-700"
              >
                Login (Email)
              </label>
              <div className="relative">
                <Input
                  id="login-email"
                  type="email"
                  autoComplete="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="masalan: maktab_24_gijduvon_tumani@maktab.uz"
                  disabled={isLoading}
                  required
                  className="pl-9 text-xs h-10 border-slate-300 focus:border-slate-900 focus:ring-slate-900"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
              </div>
            </div>

            {/* Password Field with Visibility Toggle */}
            <div className="space-y-1.5">
              <label
                htmlFor="login-password"
                className="block text-xs font-semibold text-slate-700"
              >
                Parol
              </label>
              <div className="relative">
                <Input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  disabled={isLoading}
                  required
                  className="pl-9 pr-10 text-xs h-10 border-slate-300 focus:border-slate-900 focus:ring-slate-900 font-mono"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Parolni yashirish' : 'Parolni ko‘rsatish'}
                  className="absolute right-3 top-2.5 p-0.5 rounded text-slate-400 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-400"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold gap-2 h-11 shadow-xs transition-all mt-2"
            >
              <LogIn className="w-4 h-4" />
              <span>{isLoading ? 'Tekshirilmoqda...' : 'Tizimga kirish'}</span>
            </Button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-start gap-2 text-[11px] text-slate-500 leading-relaxed">
            <Info className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
            <span>
              Har bir maktabga dastlabki kirish uchun maxsus login va boshlang‘ich parol berilgan. Birinchi kirishda yangi shaxsiy parol o‘rnatiladi.
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
