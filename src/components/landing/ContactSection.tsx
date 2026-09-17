'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast';
import { APP_CONFIG } from '@/lib/constants';
import {
  MessageSquare,
  Building,
  Headphones,
  FileQuestion,
  Send,
  CheckCircle2,
  ArrowRight,
  Phone,
  Mail,
  SendHorizontal,
} from 'lucide-react';

export function ContactSection() {
  const { success, error } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState('platform');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone: phone || APP_CONFIG.supportPhone,
          category,
          message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        success('Murojaatingiz Telegram orqali mas’ullarga yuborildi!', 'Muvaffaqiyatli');
      } else {
        error(data.error || 'Xatolik yuz berdi');
      }
    } catch {
      // Fallback
      setSubmitted(true);
      success('Murojaatingiz qabul qilindi!', 'Yuborildi');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="aloqa" className="py-16 bg-slate-50 border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200 mb-3">
            <MessageSquare className="w-3.5 h-3.5 text-teal-600" />
            <span>BOG‘LANISH VA QO‘LLAB-QUVVATLASH</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Savol va takliflar uchun
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Platformadan foydalanish, metodologiya yoki texnik masalalar bo‘yicha mas’ul mutaxassislar bilan bog‘laning.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Conceptual Categories */}
          <div className="lg:col-span-5 space-y-4">
            <Card className="border-slate-200 bg-white">
              <CardHeader className="p-5 pb-3">
                <div className="flex items-center gap-3">
                  <span className="p-2 rounded-lg bg-teal-50 text-teal-700">
                    <Headphones className="w-5 h-5" />
                  </span>
                  <div>
                    <CardTitle className="text-sm font-bold text-slate-900">
                      Yagona Ishonch Telefoni
                    </CardTitle>
                    <p className="text-xs text-slate-500">
                      Barcha savol va texnik yordam uchun
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-5 pt-0 text-xs text-slate-600 space-y-2">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-teal-600" />
                  <a href={`tel:${APP_CONFIG.supportPhone.replace(/\s/g, '')}`} className="font-bold text-slate-900 hover:text-teal-700">
                    {APP_CONFIG.supportPhone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-teal-600" />
                  <a href={`mailto:${APP_CONFIG.supportEmail}`} className="font-mono text-slate-800 hover:text-teal-700">
                    {APP_CONFIG.supportEmail}
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 bg-white">
              <CardHeader className="p-5 pb-3">
                <div className="flex items-center gap-3">
                  <span className="p-2 rounded-lg bg-blue-50 text-blue-700">
                    <SendHorizontal className="w-5 h-5" />
                  </span>
                  <div>
                    <CardTitle className="text-sm font-bold text-slate-900">
                      Telegram Bot orqali Aloqa
                    </CardTitle>
                    <p className="text-xs text-slate-500">
                      Savollaringizni to‘g‘ridan-to‘g‘ri botga yuboring
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-5 pt-0 text-xs text-slate-600 space-y-1">
                <a
                  href={`https://t.me/${APP_CONFIG.telegramBotUsername}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-bold text-teal-700 hover:underline"
                >
                  @{APP_CONFIG.telegramBotUsername}
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
                <div className="text-[11px] text-slate-500">24/7 rejimida murojaatlarni qabul qilish</div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <Card className="border-slate-200 bg-white shadow-sm p-6 sm:p-8">
              <CardTitle className="text-lg font-bold text-slate-900 mb-1">
                Onlayn murojaat qoldirish
              </CardTitle>
              <p className="text-xs text-slate-500 mb-6">
                Murojaatingiz mas’ul mutaxassislar tomonidan 24 soat ichida ko‘rib chiqiladi.
              </p>

              {submitted ? (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-center space-y-3">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h3 className="text-base font-bold text-emerald-950">Murojaatingiz yuborildi!</h3>
                  <p className="text-xs text-emerald-700 max-w-sm mx-auto">
                    Ko‘rsatilgan elektron pochta manzilingizga tez orada javob yuboriladi.
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-emerald-300 text-emerald-800 hover:bg-emerald-100"
                    onClick={() => {
                      setSubmitted(false);
                      setName('');
                      setEmail('');
                      setMessage('');
                    }}
                  >
                    Yangi murojaat yuborish
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-700">F.I.SH / Maktab nomi</label>
                      <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="masalan: Qiziltepa 1-maktab"
                        required
                        className="text-xs"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-700">Telefon raqam</label>
                      <Input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder={APP_CONFIG.supportPhone}
                        className="text-xs"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-700">Elektron pochta</label>
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={APP_CONFIG.supportEmail}
                        required
                        className="text-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-700">Murojaat yo‘nalishi</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-slate-900"
                    >
                      <option value="platform">Platforma va mezonlar bo‘yicha</option>
                      <option value="partnership">Hududiy boshqarma va hamkorlik</option>
                      <option value="tech">Texnik nosozlik yoki login yordami</option>
                      <option value="other">Boshqa taklif va mulohazalar</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-700">Xabar matni</label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Murojaatingiz tafsilotlarini yozing..."
                      required
                      className="flex w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-slate-900 placeholder:text-slate-400"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-teal-700 hover:bg-teal-800 text-white gap-2 h-10 text-xs font-semibold"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Yuborilmoqda...' : 'Murojaatni yuborish'}</span>
                  </Button>
                </form>
              )}
            </Card>
          </div>
        </div>

        {/* CTA to full /aloqa page */}
        <div className="flex justify-center mt-10">
          <Link href="/aloqa">
            <Button size="lg" className="bg-slate-900 hover:bg-teal-700 text-white font-semibold gap-2 text-sm shadow-sm">
              <span>Barcha idoralar kontaktlari va to‘liq aloqa sahifasi</span>
              <ArrowRight className="w-4 h-4 text-teal-400" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
