'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Shield, Menu, X, LogIn, Globe, User, LogOut, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { APP_CONFIG } from '@/lib/constants';
import { useAuth } from '@/hooks/useAuth';

const NAV_LINKS = [
  { label: 'Bosh sahifa', href: '/' },
  { label: 'SR4S Kalkulyator', href: '/demonstrator' },
  { label: 'Interaktiv Xarita', href: '/map' },
  { label: 'Platforma', href: '/#platform' },
  { label: 'Mezonlar', href: '/#mezonlar' },
  { label: 'Reyting', href: '/#reyting' },
  { label: 'Statistika', href: '/#statistika' },
];

export function PublicHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-2xs">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand identity */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white shadow-md group-hover:bg-teal-700 transition-colors">
            <Shield className="h-5 w-5 text-teal-400" />
          </div>
          <div>
            <div className="text-sm font-bold tracking-tight text-slate-900 leading-tight">
              {APP_CONFIG.shortName}
            </div>
            <div className="text-[11px] font-medium text-slate-500 hidden sm:block">
              O‘zbekiston Respublikasi monitoring platformasi
            </div>
          </div>
        </Link>

        {/* Desktop navigation with anchors */}
        <nav className="hidden lg:flex items-center gap-5 text-xs font-semibold text-slate-600">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-slate-600 hover:text-teal-700 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right action buttons */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Language selector */}
          <div className="flex items-center gap-1 text-xs text-slate-600 px-2.5 py-1 rounded-lg border border-slate-200 bg-slate-50">
            <Globe className="h-3.5 w-3.5 text-slate-500" />
            <span className="font-semibold">O‘Z</span>
          </div>

          {user ? (
            /* Logged In User State */
            <div className="flex items-center gap-2">
              <Link href={user.role === 'SCHOOL_USER' ? '/school' : '/admin'}>
                <Button size="sm" className="bg-slate-900 hover:bg-slate-800 text-white gap-1.5 shadow-2xs text-xs font-semibold rounded-xl">
                  <LayoutDashboard className="h-3.5 w-3.5 text-teal-400" />
                  <span>{user.role === 'SCHOOL_USER' ? 'Shaxsiy Kabinet' : 'Admin Portal'}</span>
                </Button>
              </Link>

              <Button
                size="sm"
                variant="outline"
                onClick={() => logout()}
                className="text-rose-600 hover:bg-rose-50 border-rose-200 text-xs font-semibold rounded-xl gap-1"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Chiqish</span>
              </Button>
            </div>
          ) : (
            /* Guest User State */
            <Link href="/login">
              <Button size="sm" className="bg-teal-700 hover:bg-teal-800 text-white gap-1.5 shadow-2xs text-xs font-semibold rounded-xl">
                <LogIn className="h-3.5 w-3.5" />
                <span>Tizimga kirish</span>
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile menu toggle */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-4 space-y-3">
          <nav className="flex flex-col space-y-2 text-sm font-medium text-slate-700">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md hover:bg-slate-100 text-xs font-semibold"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-2 border-t border-slate-100">
            {user ? (
              <div className="space-y-2">
                <Link href={user.role === 'SCHOOL_USER' ? '/school' : '/admin'} onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white gap-1.5 text-xs font-semibold rounded-xl">
                    <LayoutDashboard className="h-4 w-4 text-teal-400" />
                    <span>{user.role === 'SCHOOL_USER' ? 'Shaxsiy Kabinet' : 'Admin Portal'}</span>
                  </Button>
                </Link>
                <Button
                  onClick={() => { logout(); setMobileMenuOpen(false); }}
                  className="w-full bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 text-xs font-semibold rounded-xl gap-1.5"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Chiqish</span>
                </Button>
              </div>
            ) : (
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-teal-700 hover:bg-teal-800 text-white gap-1.5 text-xs font-semibold rounded-xl">
                  <LogIn className="h-4 w-4" />
                  <span>Tizimga kirish</span>
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
