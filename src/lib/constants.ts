import { UserRole, DemoAccount } from '@/types';

export const APP_CONFIG = {
  name: "O'zbekiston Maktab Yo'l Xavfsizligi Monitoring Tizimi",
  shortName: 'Maktab Yo\'l Xavfsizligi',
  nameEn: 'Uzbekistan School Road Safety Platform',
  version: '1.0.0-prototype',
  academicYear: '2025-2026',
  supportEmail: 'support@maktabxavfsizligi.uz',
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
    label: 'Maktab Vakili (School User)',
    email: 'school24@gijduvon.demo',
    passwordHint: 'Demo@1234',
    role: UserRole.SCHOOL_USER,
    description: '24-umumta\'lim maktabi, G\'ijduvon tumani, Buxoro viloyati',
    schoolInfo: {
      schoolNumber: '24',
      schoolName: '24-sonli umumta\'lim maktabi',
      districtName: 'G\'ijduvon tumani',
      regionName: 'Buxoro viloyati',
      directorName: 'Demo Director',
    },
  },
  {
    label: 'Hududiy Administrator (Admin)',
    email: 'admin@demo.local',
    passwordHint: 'Demo@1234',
    role: UserRole.ADMIN,
    description: 'Tuman va viloyat darajasidagi monitoring va tekshiruv administratori',
  },
  {
    label: 'Bosh Administrator (Super Admin)',
    email: 'superadmin@demo.local',
    passwordHint: 'Demo@1234',
    role: UserRole.SUPER_ADMIN,
    description: 'Respublika miqyosidagi tizim boshqaruvi va huquqlarni sozlash',
  },
];
