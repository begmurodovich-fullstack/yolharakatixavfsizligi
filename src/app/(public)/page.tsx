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
  ResultsImpactSection,
  CtaSection,
  ContactSection,
} from '@/components/landing';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Platform Key Metrics */}
      <MetricsStrip />

      {/* 3. Workflow Explanation: Platforma qanday ishlaydi? */}
      <WorkflowSection />

      {/* 4. 8 Core Safety Criteria */}
      <CriteriaSection />

      {/* 5. Interactive Verified Map Preview */}
      <MapPreviewSection />

      {/* 6. Republic Leaderboard / Ranking Preview */}
      <RankingPreviewSection />

      {/* 7. Safety Statistics & Category Analytics */}
      <StatisticsPreviewSection />

      {/* 8. Institutional Value: Nima uchun bu platforma kerak? */}
      <WhyPlatformSection />

      {/* 9. Lifecycle: Natijalar qanday qo‘llaniladi? */}
      <ResultsImpactSection />

      {/* 10. Call To Action */}
      <CtaSection />

      {/* 11. Contact & Support */}
      <ContactSection />
    </div>
  );
}
