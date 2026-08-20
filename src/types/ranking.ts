/**
 * Ranking and Score Status Domain Types
 */

export enum ScoreStatus {
  GREEN = 'GREEN',   // Good (>= 80%)
  YELLOW = 'YELLOW', // Average (50% - 79%)
  RED = 'RED',       // Poor (< 50%)
}

export enum RankingScope {
  REPUBLIC = 'REPUBLIC',
  REGION = 'REGION',
  DISTRICT = 'DISTRICT',
  SCHOOL = 'SCHOOL',
}

export interface ScoreEvaluation {
  score: number;
  maxScore: number;
  percentage: number;
  status: ScoreStatus;
  statusLabel: string;
  badgeClass: string;
  bgClass: string;
  textClass: string;
  borderClass: string;
}

export interface RankingEntry {
  rank: number;
  previousRank?: number;
  entityId: string;
  entityName: string;
  scope: RankingScope;
  regionId?: string;
  regionName?: string;
  districtId?: string;
  districtName?: string;
  score: number;
  maxScore: number;
  percentage: number;
  scoreStatus: ScoreStatus;
  assessmentPeriodId: string;
  schoolCount?: number;
}

export interface SchoolRankingOverview {
  schoolId: string;
  schoolName: string;
  schoolNumber: string;
  regionName: string;
  districtName: string;
  periodId: string;
  periodName: string;
  currentScore: number;
  maxScore: number;
  percentage: number;
  scoreStatus: ScoreStatus;
  republicRank: number;
  totalRepublicSchools: number;
  regionRank: number;
  totalRegionSchools: number;
  districtRank: number;
  totalDistrictSchools: number;
}
