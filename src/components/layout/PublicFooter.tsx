import React from 'react';
import { APP_CONFIG } from '@/lib/constants';
import { Shield, Phone, Mail, Globe, Code2 } from 'lucide-react';

export function PublicFooter() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400 text-sm">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5 text-white">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-600">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-base">{APP_CONFIG.name}</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              O‘zbekiston Respublikasi maktablari atrofidagi yo‘l harakati xavfsizligini ta’minlash,
              bolalar hayoti va salomatligini asrash bo‘yicha milliy yagona monitoring va baholash tizimi.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
              <span className="inline-flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-teal-400" />
                {APP_CONFIG.supportEmail}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-teal-400" />
                {APP_CONFIG.supportPhone}
              </span>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Platforma bo‘limlari
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="/" className="hover:text-teal-400 transition-colors">
                  Bosh sahifa
                </a>
              </li>
              <li>
                <a href="/platform" className="hover:text-teal-400 transition-colors">
                  Platforma mexanizmi
                </a>
              </li>
              <li>
                <a href="/mezonlar" className="hover:text-teal-400 transition-colors">
                  Xalqaro SR4S mezonlari
                </a>
              </li>
              <li>
                <a href="/map" className="hover:text-teal-400 transition-colors">
                  Geolokatsiya xaritasi
                </a>
              </li>
              <li>
                <a href="/reyting" className="hover:text-teal-400 transition-colors">
                  Respublika reytingi
                </a>
              </li>
              <li>
                <a href="/statistika" className="hover:text-teal-400 transition-colors">
                  Xavfsizlik statistikasi
                </a>
              </li>
              <li>
                <a href="/aloqa" className="hover:text-teal-400 transition-colors">
                  Murojaat va aloqa
                </a>
              </li>
            </ul>
          </div>

          {/* System status note */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Tizim holati
            </h4>
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 text-xs text-slate-300 space-y-2">
              <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                <span>⚠️ Pilot Sinov Rejimi</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Tizim O‘zbekiston Respublikasi maktablari uchun pilot rejimda ishga tushirilgan.
                Barcha 40 ta SR4S xavfsizlik mezonlari va reytinglar amaliy sinovdan o‘tmoqda.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="mt-8 border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} {APP_CONFIG.shortName}. Barcha huquqlar himoyalangan.</p>
          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <span>Platforma konsepsiyasi: Akademik va jamoat xavfsizligi tashabbusi</span>
            <span>•</span>
            <span>Versiya: {APP_CONFIG.version}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
