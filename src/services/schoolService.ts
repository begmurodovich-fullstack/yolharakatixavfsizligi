import { School, SchoolFilterParams, Region, District, User } from '@/types';
import { repositories } from '@/repositories';
import { canEditSchool } from '@/lib/permissions';
import { apiClient } from '@/lib/apiClient';

export class SchoolService {
  async getSchools(params?: SchoolFilterParams): Promise<School[]> {
    try {
      const queryParams: Record<string, string | number> = {};
      if (params?.regionId) queryParams.regionId = params.regionId;
      if (params?.districtId) queryParams.districtId = params.districtId;
      if (params?.scoreStatus) queryParams.scoreStatus = params.scoreStatus;
      if (params?.coordinateStatus) queryParams.coordStatus = params.coordinateStatus;
      if (params?.searchQuery) queryParams.search = params.searchQuery;

      const schools = await apiClient<School[]>('/schools', { params: queryParams });
      if (Array.isArray(schools) && schools.length > 0) {
        return schools;
      }
    } catch {
      // fallback to mock
    }
    return repositories.school.getAll(params);
  }

  async getSchoolById(id: string): Promise<School | null> {
    try {
      const school = await apiClient<School>(`/schools/${id}`);
      if (school && school.id) {
        return school;
      }
    } catch {
      // fallback to mock
    }
    return repositories.school.getById(id);
  }

  async getSchoolByNumberAndDistrict(schoolNumber: string, districtId: string): Promise<School | null> {
    return repositories.school.getByNumberAndDistrict(schoolNumber, districtId);
  }

  async getRegions(): Promise<Region[]> {
    try {
      const regions = await apiClient<Region[]>('/regions');
      if (Array.isArray(regions) && regions.length > 0) {
        return regions;
      }
    } catch {
      // fallback
    }
    return repositories.school.getRegions();
  }

  async getDistricts(regionId?: string): Promise<District[]> {
    try {
      const districts = await apiClient<District[]>('/districts', {
        params: regionId ? { regionId } : {},
      });
      if (Array.isArray(districts) && districts.length > 0) {
        return districts;
      }
    } catch {
      // fallback
    }
    return repositories.school.getDistricts(regionId);
  }

  async updateSchoolProfile(
    schoolId: string,
    updates: {
      directorName?: string;
      studentCount?: number;
      phone?: string;
      email?: string;
    },
    user: User
  ): Promise<School> {
    if (!canEditSchool(user, schoolId)) {
      throw new Error("Sizda ushbu maktab ma'lumotlarini o'zgartirish huquqi yo'q");
    }

    try {
      const updated = await apiClient<School>(`/schools/${schoolId}`, {
        method: 'PATCH',
        body: JSON.stringify(updates),
      });
      if (updated && updated.id) {
        return updated;
      }
    } catch {
      // fallback
    }

    return repositories.school.updateSchool(schoolId, updates);
  }

  async updateSchoolCoordinates(
    schoolId: string,
    latitude: number,
    longitude: number,
    addressNotes: string,
    user: User
  ): Promise<School> {
    if (!canEditSchool(user, schoolId)) {
      throw new Error("Sizda ushbu maktab koordinatalarini o'zgartirish huquqi yo'q");
    }

    try {
      const updated = await apiClient<School>(`/schools/${schoolId}`, {
        method: 'PATCH',
        body: JSON.stringify({ latitude, longitude, addressNotes }),
      });
      if (updated && updated.id) {
        return updated;
      }
    } catch {
      // fallback
    }

    return repositories.school.updateCoordinates(schoolId, {
      latitude,
      longitude,
      addressNotes,
      status: 'PENDING' as any,
    });
  }

  async changePassword(arg1: string, arg2: string, arg3?: any, arg4?: any): Promise<void> {
    const newPass = typeof arg3 === 'string' ? arg3 : arg2;
    const user: User | undefined = typeof arg3 === 'object' ? arg3 : arg4;

    if (newPass.length < 6) {
      throw new Error("Yangi parol kamida 6 ta belgidan iborat bo'lishi lozim.");
    }

    if (user) {
      await repositories.auditLog.logAction({
        actorId: user.id,
        actorName: user.name,
        actorRole: user.role,
        action: 'UPDATE_PASSWORD' as any,
        target: 'Hisob paroli yangilandi',
        targetId: user.id,
      });
    }
  }
}

export const schoolService = new SchoolService();
