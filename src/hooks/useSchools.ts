'use client';

import { useState, useEffect, useCallback } from 'react';
import { School, SchoolFilterParams, Region, District } from '@/types';
import { schoolService } from '@/services/schoolService';

export function useSchools(initialParams?: SchoolFilterParams) {
  const [schools, setSchools] = useState<School[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [params, setParams] = useState<SchoolFilterParams | undefined>(initialParams);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [schoolList, regionList, districtList] = await Promise.all([
        schoolService.getSchools(params),
        schoolService.getRegions(),
        schoolService.getDistricts(params?.regionId),
      ]);
      setSchools(schoolList);
      setRegions(regionList);
      setDistricts(districtList);
    } catch (err: any) {
      setError(err?.message || 'Maktablar ma\'lumotlarini yuklashda xatolik yuz berdi');
    } finally {
      setIsLoading(false);
    }
  }, [params]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const updateFilters = useCallback((newParams: Partial<SchoolFilterParams>) => {
    setParams((prev) => ({ ...prev, ...newParams }));
  }, []);

  const resetFilters = useCallback(() => {
    setParams({});
  }, []);

  return {
    schools,
    regions,
    districts,
    isLoading,
    error,
    params,
    updateFilters,
    resetFilters,
    reload: loadData,
  };
}
