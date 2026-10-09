import React from 'react';
import {
  HeroSection,
  MetricsStrip,
  WorkflowSection,
  WhyPlatformSection,
  CtaSection,
} from '@/components/landing';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section: Asosiy Ta’rif, Qidiruv va Namuna Xarita */}
      <HeroSection />

      {/* 2. Executive KPI Metrics: 10 130+ Maktab, 6.8M O‘quvchi, SR4S Standarti */}
      <MetricsStrip />

      {/* 3. Workflow: 5 Bosqichli Baholash Jarayoni */}
      <WorkflowSection />

      {/* 4. Milliy Qimmat: Nima uchun bu platforma zarur? */}
      <WhyPlatformSection />

      {/* 5. Yakuniy Chaqiruv (CTA) */}
      <CtaSection />
    </div>
  );
}

