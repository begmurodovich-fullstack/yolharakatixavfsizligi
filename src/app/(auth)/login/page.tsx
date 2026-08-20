'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/ui/toast';
import { DEMO_ACCOUNTS } from '@/lib/constants';
import { UserRole } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import {
  Shield,
  School,
  Crown,
  LogIn,
  Lock,
  Mail,
  AlertCircle,
  Eye,
  EyeOff,
  Sparkles,
  Check,
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
  const [selectedDemoRole, setSelectedDemoRole] = useState<UserRole | null>(null);

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

      // Role-based redirection per specification:
      // SCHOOL_USER (First login) -> /onboarding
      // SCHOOL_USER (Existing)    -> /school
      // ADMIN / SUPER_ADMIN       -> /admin
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

  /**
   * Fill credentials from demo account options
   */
  const handleSelectDemo = (demo: typeof DEMO_ACCOUNTS[0]) => {
    setEmail(demo.email);
    setPassword(demo.passwordHint || 'Demo@1234');
    setSelectedDemoRole(demo.role);
    setErrorMessage(null);
  };

  return (
    <div className="space-y-6">
      {/* Main Login Card */}
      <Card className="border-slate-200 bg-white shadow-md">
        <CardHeader className="p-6 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-700 uppercase tracking-wider mb-1">
            <Shield className="w-4 h-4 text-teal-600" />
            <span>Avtorizatsiya</span>
          </div>
          <CardTitle className="text-xl font-bold text-slate-900 tracking-tight">
            Tizimga kirish
          </CardTitle>
          <CardDescription className="text-xs text-slate-500 leading-relaxed">
            Maktablar va mas’ul davlat organlari uchun yagona monitoring platformasi.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6 pt-5">
          {/* Error Alert Box */}
          {errorMessage && (
            <div
              role="alert"
              className="mb-5 p-3.5 rounded-lg border border-rose-200 bg-rose-50 text-xs text-rose-800 flex items-start gap-2.5 shadow-2xs animate-in fade-in duration-200"
            >
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
              <div className="font-medium">{errorMessage}</div>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Email / Login Field */}
            <div className="space-y-1.5">
              <label
                htmlFor="login-email"
                className="block text-xs font-semibold text-slate-700"
              >
                Elektron pochta (Login)
              </label>
              <div className="relative">
                <Input
                  id="login-email"
                  type="email"
                  autoComplete="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="masalan: school24@gijduvon.demo"
                  disabled={isLoading}
                  required
                  className="pl-9 text-xs h-10 border-slate-300 focus:border-slate-900 focus:ring-slate-900"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
              </div>
            </div>

            {/* Password Field with Visibility Toggle */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="login-password"
                  className="block text-xs font-semibold text-slate-700"
                >
                  Parol
                </label>
                <span className="text-[11px] text-slate-400 font-mono">
                  Standart: Demo@1234
                </span>
              </div>
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
        </CardContent>
      </Card>

      {/* Demo Accounts Quick-Fill Section */}
      <Card className="border-slate-200 bg-white shadow-xs">
        <CardHeader className="p-4 pb-2 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>Demo hisoblari (Sinov uchun)</span>
            </CardTitle>
            <span className="text-[10px] font-semibold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
              Prototip
            </span>
          </div>
          <CardDescription className="text-xs text-slate-500">
            Tizim rollarini sinab ko‘rish uchun quyidagi demo hisoblaridan birini tanlang:
          </CardDescription>
        </CardHeader>

        <CardContent className="p-4 space-y-2.5">
          {DEMO_ACCOUNTS.map((acc) => {
            const isSelected = selectedDemoRole === acc.role;
            let Icon = School;
            let roleTitle = 'Maktab Foydalanuvchisi';
            let roleBadge = 'School User';
            let targetRoute = '/school';

            if (acc.role === UserRole.ADMIN) {
              Icon = Shield;
              roleTitle = 'Hududiy Administrator';
              roleBadge = 'Admin';
              targetRoute = '/admin';
            } else if (acc.role === UserRole.SUPER_ADMIN) {
              Icon = Crown;
              roleTitle = 'Bosh Administrator';
              roleBadge = 'Super Admin';
              targetRoute = '/admin';
            }

            return (
              <button
                key={acc.email}
                type="button"
                onClick={() => handleSelectDemo(acc)}
                className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'border-teal-600 bg-teal-50/50 shadow-2xs ring-1 ring-teal-600'
                    : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/70 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`p-2 rounded-lg shrink-0 ${
                      isSelected
                        ? 'bg-teal-700 text-white'
                        : 'bg-white text-slate-700 border border-slate-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900 truncate">
                        {roleTitle}
                      </span>
                      <span className="text-[10px] font-mono font-medium px-1.5 py-0.2 rounded bg-slate-200/80 text-slate-700">
                        {roleBadge}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono truncate mt-0.5">
                      {acc.email}
                    </div>
                    {acc.schoolInfo && (
                      <div className="text-[10px] text-teal-700 font-medium truncate">
                        {acc.schoolInfo.schoolName} ({acc.schoolInfo.districtName})
                      </div>
                    )}
                  </div>
                </div>

                <div className="shrink-0 pl-2">
                  {isSelected ? (
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-teal-700 text-white">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                  ) : (
                    <span className="text-[11px] font-semibold text-teal-700 hover:underline">
                      Tanlash
                    </span>
                  )}
                </div>
              </button>
            );
          })}

          <div className="pt-2 flex items-start gap-2 text-[11px] text-slate-500 leading-relaxed border-t border-slate-100">
            <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
            <span>
              <strong>Eslatma:</strong> Bu hisoblar faqat V1 frontend interfeysi namoyishi uchun.
              Haqiqiy foydalanuvchilar davlat OneID / E-Imzo tizimi orqali avtorizatsiya qilinadi.
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/**
 * ARCHITECTURE NOTE FOR FUTURE FIRST-LOGIN ONBOARDING:
 * 
 * When a school user logs in for the very first time (flag: isFirstLogin === true),
 * the system will intercept the flow and present the onboarding modal/page:
 * - New Password (required, strong password policy)
 * - Confirm Password (matching validation)
 * - Director full name confirmation
 * - School GPS Coordinates verification/capture
 * 
 * In this V1 prototype, demo accounts are pre-verified to allow immediate access.
 */
