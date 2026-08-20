import { AssessmentPeriod } from '@/types';

export const MOCK_PERIODS: AssessmentPeriod[] = [
  {
    id: 'period-2025-spring',
    name: '2025-2026 O‘quv yili — Bahorgi monitoring davri',
    startDate: '2026-02-01T00:00:00Z',
    endDate: '2026-05-31T23:59:59Z',
    isCurrent: true,
    academicYear: '2025-2026',
    description: 'Joriy faol baholash davri. Barcha joriy reytinglar va ballar ushbu davrga asosan shakllanadi.',
  },
  {
    id: 'period-2024-autumn',
    name: '2024-2025 O‘quv yili — Kuzgi monitoring davri',
    startDate: '2024-09-01T00:00:00Z',
    endDate: '2024-12-31T23:59:59Z',
    isCurrent: false,
    academicYear: '2024-2025',
    description: 'Tarixiy davr (Arxiv). Faqatgina o‘tgan davr dinamikasini solishtirish uchun saqlanadi.',
  },
];
