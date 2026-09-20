import { UserRole, DemoAccount } from '@/types';

export const APP_CONFIG = {
  name: "O'zbekiston Maktab Yo'l Xavfsizligi Monitoring Tizimi",
  shortName: 'Maktab Yo\'l Xavfsizligi',
  nameEn: 'Uzbekistan School Road Safety Platform',
  version: '1.0.0-pilot',
  academicYear: '2025-2026',
  supportEmail: 'azizbekofficialaccaunt@gmail.com',
  supportPhone: '+998 33 585 13 03',
  telegramBotUsername: process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME || 'yolharakatixavfsizligi_bot',
  telegramBotToken: process.env.TELEGRAM_BOT_TOKEN || '8674118429:AAGnRU8AArMUsZYYQIOMx3eF8GUkxhSmpkk',
  telegramAdminChatId: process.env.TELEGRAM_ADMIN_CHAT_ID || '-1004479328930',
};

export const SCORE_THRESHOLDS = {
  GREEN_MIN: 80,  // Good / Safe (>= 80%)
  YELLOW_MIN: 50, // Average / Needs Attention (50% - 79%)
  // Below 50% is RED / High Risk
};

/**
 * Prototype demo accounts per requirements:
 * 1. SCHOOL USER: school24@gijduvon.demo / Demo@1234
 *    24-maktab, G'ijduvon tumani, Buxoro viloyati, Demo Director
 * 2. ADMIN: admin@demo.local / Demo@1234
 * 3. SUPER ADMIN: superadmin@demo.local / Demo@1234
 * 
 * IMPORTANT: These are fictional demo accounts for UI prototyping only.
 * No real credentials or database connections.
 */
export const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    label: 'Maktab Mas’uli (Qiziltepa 1-maktab)',
    email: 'maktab_1_navoiy_qiziltepa@maktab.uz',
    passwordHint: 'Maktab@1',
    role: UserRole.SCHOOL_USER,
    description: '1-sonli umumta\'lim maktabi, Qiziltepa tumani, Navoiy viloyati',
    schoolInfo: {
      schoolNumber: '1',
      schoolName: '1-sonli umumta\'lim maktabi',
      districtName: 'Qiziltepa tumani',
      regionName: 'Navoiy viloyati',
      directorName: 'Maktab Mas’uli',
    },
  },
  {
    label: 'Hududiy Inspektor (Admin)',
    email: 'admin@yhxx.uz',
    passwordHint: 'Admin@1234',
    role: UserRole.ADMIN,
    description: 'Tuman va viloyat darajasidagi monitoring va tekshiruv administratori',
  },
  {
    label: 'Bosh Administrator (IIV YHXX)',
    email: 'superadmin@yhxx.uz',
    passwordHint: 'Super@1234',
    role: UserRole.SUPER_ADMIN,
    description: 'Respublika miqyosidagi tizim boshqaruvi va huquqlarni sozlash',
  },
];
