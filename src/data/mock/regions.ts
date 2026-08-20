import { Region, District } from '@/types';

export const MOCK_REGIONS: Region[] = [
  { id: 'reg-bukhara', name: 'Buxoro viloyati', code: 'BUX', districtCount: 13, schoolCount: 540 },
  { id: 'reg-tashkent-city', name: 'Toshkent shahri', code: 'TAS-C', districtCount: 12, schoolCount: 380 },
  { id: 'reg-tashkent', name: 'Toshkent viloyati', code: 'TAS-R', districtCount: 15, schoolCount: 890 },
  { id: 'reg-samarkand', name: 'Samarqand viloyati', code: 'SAM', districtCount: 16, schoolCount: 1250 },
  { id: 'reg-fergana', name: 'Farg‘ona viloyati', code: 'FER', districtCount: 19, schoolCount: 960 },
  { id: 'reg-andijan', name: 'Andijon viloyati', code: 'AND', districtCount: 14, schoolCount: 770 },
  { id: 'reg-namangan', name: 'Namangan viloyati', code: 'NAM', districtCount: 12, schoolCount: 710 },
  { id: 'reg-khorezm', name: 'Xorazm viloyati', code: 'XOR', districtCount: 13, schoolCount: 530 },
  { id: 'reg-navoiy', name: 'Navoiy viloyati', code: 'NAV', districtCount: 11, schoolCount: 370 },
  { id: 'reg-kashkadarya', name: 'Qashqadaryo viloyati', code: 'QASH', districtCount: 15, schoolCount: 1180 },
  { id: 'reg-surkhandarya', name: 'Surxondaryo viloyati', code: 'SUR', districtCount: 15, schoolCount: 920 },
  { id: 'reg-jizzakh', name: 'Jizzax viloyati', code: 'JIZ', districtCount: 13, schoolCount: 550 },
  { id: 'reg-sirdaryo', name: 'Sirdaryo viloyati', code: 'SIR', districtCount: 11, schoolCount: 310 },
  { id: 'reg-karakalpakstan', name: 'Qoraqalpog‘iston Respublikasi', code: 'QR', districtCount: 17, schoolCount: 720 },
];

export const MOCK_DISTRICTS: District[] = [
  // Bukhara districts
  { id: 'dist-gijduvon', regionId: 'reg-bukhara', name: 'G‘ijduvon tumani', schoolCount: 65 },
  { id: 'dist-bukhara-city', regionId: 'reg-bukhara', name: 'Buxoro shahri', schoolCount: 42 },
  { id: 'dist-vobkent', regionId: 'reg-bukhara', name: 'Vobkent tumani', schoolCount: 40 },
  { id: 'dist-kogon', regionId: 'reg-bukhara', name: 'Kogon tumani', schoolCount: 35 },
  { id: 'dist-shofirkon', regionId: 'reg-bukhara', name: 'Shofirkon tumani', schoolCount: 48 },

  // Tashkent city districts
  { id: 'dist-yunusobod', regionId: 'reg-tashkent-city', name: 'Yunusobod tumani', schoolCount: 36 },
  { id: 'dist-chilonzor', regionId: 'reg-tashkent-city', name: 'Chilonzor tumani', schoolCount: 38 },
  { id: 'dist-mirzo-ulugbek', regionId: 'reg-tashkent-city', name: 'Mirzo Ulug‘bek tumani', schoolCount: 34 },
  { id: 'dist-shayxontohur', regionId: 'reg-tashkent-city', name: 'Shayxontohur tumani', schoolCount: 32 },

  // Samarkand districts
  { id: 'dist-samarkand-city', regionId: 'reg-samarkand', name: 'Samarqand shahri', schoolCount: 75 },
  { id: 'dist-pastdargom', regionId: 'reg-samarkand', name: 'Pastdarg‘om tumani', schoolCount: 82 },
  { id: 'dist-urgut', regionId: 'reg-samarkand', name: 'Urgut tumani', schoolCount: 105 },

  // Fergana districts
  { id: 'dist-fergana-city', regionId: 'reg-fergana', name: 'Farg‘ona shahri', schoolCount: 45 },
  { id: 'dist-quva', regionId: 'reg-fergana', name: 'Quva tumani', schoolCount: 68 },
  { id: 'dist-margilon', regionId: 'reg-fergana', name: 'Marg‘ilon shahri', schoolCount: 38 },

  // Andijan districts
  { id: 'dist-andijan-city', regionId: 'reg-andijan', name: 'Andijon shahri', schoolCount: 52 },
  { id: 'dist-asaka', regionId: 'reg-andijan', name: 'Asaka tumani', schoolCount: 60 },

  // Khorezm districts
  { id: 'dist-urgench-city', regionId: 'reg-khorezm', name: 'Urganch shahri', schoolCount: 30 },
  { id: 'dist-khiva', regionId: 'reg-khorezm', name: 'Xiva shahri', schoolCount: 26 },

  // Navoiy districts
  { id: 'dist-navoiy-city', regionId: 'reg-navoiy', name: 'Navoiy shahri', schoolCount: 28 },
  { id: 'dist-karmana', regionId: 'reg-navoiy', name: 'Karmana tumani', schoolCount: 32 },
];
