'use client';

import React from 'react';
import {
  HeroSection,
  MetricsStrip,
  WorkflowSection,
  CriteriaSection,
  MapPreviewSection,
  RankingPreviewSection,
  StatisticsPreviewSection,
  WhyPlatformSection,
  CtaSection,
} from '@/components/landing';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section: Asosiy Ta’rif va Real Xarita */}
      <HeroSection />

      {/* 2. Executive KPI Metrics: 10 193+ Maktab, 6.8M O‘quvchi, SR4S Standarti */}
      <MetricsStrip />

      {/* 3. Workflow: 5 Bosqichli Baholash Jarayoni */}
      <WorkflowSection />

      {/* 4. 40 ta Xalqaro SR4S Xavfsizlik Mezonlari */}
      <CriteriaSection />

      {/* 5. Hududiy Xavfsizlik Indeksi (Heatmap) & Sputnik Xaritasi */}
      <MapPreviewSection />

      {/* 6. Respublika Yetakchi Maktablar Reytingi */}
      <RankingPreviewSection />

      {/* 7. Respublika Analitikasi va Xavfsizlik Diagrammalari */}
      <StatisticsPreviewSection />

      {/* 8. Milliy Qimmat: Nima uchun bu platforma zarur? */}
      <WhyPlatformSection />

      {/* 9. Yakuniy Chaqiruv (CTA) */}
      <CtaSection />
    </div>
  );
}

