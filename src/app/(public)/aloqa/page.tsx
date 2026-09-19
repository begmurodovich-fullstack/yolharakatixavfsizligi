'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  MessageSquare,
  Building,
  Headphones,
  FileQuestion,
  Send,
  CheckCircle2,
  Mail,
  Phone,
  Clock,
  Sparkles,
  Bot,
  ExternalLink,
  Loader2,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast';
import { APP_CONFIG } from '@/lib/constants';

export default function AloqaPage() {
  const { success, error: toastError } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState('platform');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, email, category, message }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.message || 'Murojaatni yuborishda xatolik yuz berdi.');
      }

      setSubmitted(true);
      success(
        'Murojaatingiz qabul qilindi va Telegram botimizga yuborildi. Mas’ul xodimlar tez orada siz bilan bog‘lanadi!',
        'Murojaat yuborildi ✅'
      );
    } catch (err: any) {
      console.error('Contact submission error:', err);
      toastError(err?.message || 'Murojaatni yuborishda xatolik yuz berdi.', 'Xatolik');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header Banner */}
      <section className="relative overflow-hidden bg-white pt-10 pb-12 border-b border-slate-200 shadow-2xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-teal-50 text-teal-800 border border-teal-200">
            <MessageSquare className="w-3.5 h-3.5 text-teal-600" />
            <span>ALOQA VA QO‘LLAB-QUVVATLASH</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-950 leading-tight">
            Savol, Taklif va Murojaatlar
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
            Platformadan foydalanish, yo‘l xavfsizligi monitoringi metodologiyasi yoki texnik masalalar bo‘yicha 
            mas’ul davlat organlari va texnik guruh bilan bevosita bog‘laning.
          </p>
        </div>
      </section>

      {/* Main Form & Contacts Body */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-4">
            {/* Telegram Bot Card */}
            <a
              href={`https://t.me/${APP_CONFIG.telegramBotUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <Card className="border-teal-300 bg-gradient-to-r from-teal-50 to-emerald-50 shadow-xs hover:border-teal-500 hover:shadow-md transition-all">
                <CardHeader className="p-5 pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="p-2.5 rounded-xl bg-teal-600 text-white shadow-xs group-hover:scale-105 transition-transform">
                        <Bot className="w-5 h-5" />
                      </span>
                      <div>
                        <CardTitle className="text-base font-bold text-slate-900">
                          Rasmiy Telegram Bot
                        </CardTitle>
                        <p className="text-xs text-teal-700 font-semibold">
                          @{APP_CONFIG.telegramBotUsername}
                        </p>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-teal-600 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </CardHeader>
                <CardContent className="p-5 pt-0 text-xs text-slate-600">
                  <p className="leading-relaxed">
                    Savollaringizni to‘g‘ridan-to‘g‘ri Telegram bot orqali yuboring va tezkor javob oling.
                  </p>
                </CardContent>
              </Card>
            </a>

            {/* Support Phone & Email Card */}
            <Card className="border-slate-200 bg-white shadow-2xs">
              <CardHeader className="p-5 pb-2">
                <div className="flex items-center gap-3">
                  <span className="p-2.5 rounded-xl bg-amber-50 text-amber-700 border border-amber-200">
                    <Headphones className="w-5 h-5" />
                  </span>
                  <div>
                    <CardTitle className="text-base font-bold text-slate-900">
                      Texnik Qo‘llab-quvvatlash
                    </CardTitle>
                    <p className="text-xs text-slate-500">
                      Tizimga kirish, parollar va foto-dalillarni yuklash
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-5 pt-0 text-xs text-slate-600 space-y-2.5">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-600 shrink-0" />
                  <a href={`tel:${APP_CONFIG.supportPhone.replace(/\s+/g, '')}`} className="font-mono text-slate-900 font-bold hover:underline">
                    {APP_CONFIG.supportPhone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-amber-600 shrink-0" />
                  <a href={`mailto:${APP_CONFIG.supportEmail}`} className="font-mono text-slate-900 font-semibold hover:underline">
                    {APP_CONFIG.supportEmail}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-slate-500">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Dushanba — Juma, 09:00 — 18:00</span>
                </div>
              </CardContent>
            </Card>

            {/* Methodology Card */}
            <Card className="border-slate-200 bg-white shadow-2xs">
              <CardHeader className="p-5 pb-2">
                <div className="flex items-center gap-3">
                  <span className="p-2.5 rounded-xl bg-teal-50 text-teal-700 border border-teal-200">
                    <FileQuestion className="w-5 h-5" />
                  </span>
                  <div>
                    <CardTitle className="text-base font-bold text-slate-900">
                      Metodologiya va SR4S Standartlari
                    </CardTitle>
                    <p className="text-xs text-slate-500">
                      40 ta rasmiy mezon, iRAP formulalari va ball hisoblash tizimi
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-5 pt-0 text-xs text-slate-600 space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-teal-600 shrink-0" />
                  <span className="font-mono text-slate-800 font-semibold">{APP_CONFIG.supportEmail}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-teal-600 shrink-0" />
                  <span className="font-mono text-slate-800 font-semibold">{APP_CONFIG.supportPhone}</span>
                </div>
              </CardContent>
            </Card>

            {/* Institutional Partnership Card */}
            <Card className="border-slate-200 bg-white shadow-2xs">
              <CardHeader className="p-5 pb-2">
                <div className="flex items-center gap-3">
                  <span className="p-2.5 rounded-xl bg-sky-50 text-sky-700 border border-sky-200">
                    <Building className="w-5 h-5" />
                  </span>
                  <div>
                    <CardTitle className="text-base font-bold text-slate-900">
                      Idoralararo Hamkorlik (YHXX & MMTV)
                    </CardTitle>
                    <p className="text-xs text-slate-500">
                      Hududiy YHXX bo‘linmalari va tuman xalq ta’limi boshqarmalari
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-5 pt-0 text-xs text-slate-600 space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-sky-600 shrink-0" />
                  <span className="font-mono text-slate-800 font-semibold">{APP_CONFIG.supportEmail}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-sky-600 shrink-0" />
                  <span className="font-mono text-slate-800 font-semibold">{APP_CONFIG.supportPhone}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <Card className="border-slate-200 bg-white shadow-2xs">
              <CardHeader className="p-6 pb-4 border-b border-slate-100">
                <CardTitle className="text-lg font-bold text-slate-900">
                  Murojaat va Taklif Yuborish Formasi
                </CardTitle>
                <p className="text-xs text-slate-500">
                  Formani to‘ldiring, murojaatingiz to‘g‘ridan-to‘g‘ri Telegram botga va mas’ul xodimlarga yetkaziladi.
                </p>
              </CardHeader>

              <CardContent className="p-6 space-y-4">
                {submitted ? (
                  <div className="p-8 text-center space-y-4 rounded-2xl bg-teal-50 border border-teal-200">
                    <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">Murojaatingiz Muvaffaqiyatli Yuborildi!</h3>
                    <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                      Rahmat! Xabaringiz Telegram bot orqali mas’ul mutaxassislarimizga yetkazildi. Tez orada siz bilan bog‘lanamiz.
                    </p>
                    <div className="pt-2 flex justify-center gap-3">
                      <Button
                        onClick={() => {
                          setSubmitted(false);
                          setName('');
                          setEmail('');
                          setPhone('');
                          setMessage('');
                        }}
                        variant="outline"
                        className="border-slate-300 text-slate-700 text-xs"
                      >
                        Yangi murojaat yuborish
                      </Button>
                      <a
                        href={`https://t.me/${APP_CONFIG.telegramBotUsername}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button className="bg-teal-700 hover:bg-teal-800 text-white text-xs gap-1.5">
                          <Bot className="w-4 h-4" />
                          <span>Telegram botga o‘tish</span>
                        </Button>
                      </a>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700">
                          Ism va Familiyangiz *
                        </label>
                        <Input
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Masalan: Azizbek Karimov"
                          className="bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm rounded-xl"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700">
                          Telefon raqamingiz *
                        </label>
                        <Input
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+998 (33) 585-13-03"
                          className="bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700">
                          Elektron pochta (Email)
                        </label>
                        <Input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="azizbekofficialaccaunt@gmail.com"
                          className="bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm rounded-xl"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700">
                          Murojaat Yo‘nalishi *
                        </label>
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="w-full h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-teal-600 font-medium"
                        >
                          <option value="platform">Platforma va Baholash</option>
                          <option value="criteria">SR4S Mezonlari bo‘yicha savol</option>
                          <option value="infrastructure">Maktab yo‘li infratuzilmasi muammosi</option>
                          <option value="technical">Texnik nosozlik / Parolni tiklash</option>
                          <option value="other">Boshqa masala</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">
                        Xabar yoki Taklif Matni *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Murojaatingiz tafsilotlarini, maktab raqami va tumanini aniq yozing..."
                        className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm focus:outline-none focus:border-teal-600"
                      />
                    </div>

                    <div className="pt-2">
                      <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                        className="w-full bg-teal-700 hover:bg-teal-800 text-white font-semibold gap-2 text-xs sm:text-sm h-11"
                      >
                        {isSubmitting ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Send className="w-4 h-4" />
                        )}
                        <span>{isSubmitting ? 'Yuborilmoqda...' : 'Murojaatni Yuborish'}</span>
                      </Button>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
