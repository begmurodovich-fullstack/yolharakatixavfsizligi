import { School, SchoolFilterParams, Region, District, User } from '@/types';
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
      if (params?.limit) queryParams.limit = params.limit;
      if (params?.offset) queryParams.offset = params.offset;

      const schools = await apiClient<School[]>('/schools', { params: queryParams });
      if (Array.isArray(schools)) {
        return schools;
      }
      return [];
    } catch (e) {
      console.error('Error fetching schools from API:', e);
      return [];
    }
  }

  async getSchoolById(id: string): Promise<School | null> {
    try {
      const school = await apiClient<School>(`/schools/${id}`);
      if (school && school.id) {
        return school;
      }
      return null;
    } catch {
      return null;
    }
  }

  async getSchoolByNumberAndDistrict(schoolNumber: string, districtId: string): Promise<School | null> {
    const list = await this.getSchools({ districtId, searchQuery: schoolNumber });
    return list.find((s) => s.schoolNumber === schoolNumber) || null;
  }

  async getRegions(): Promise<Region[]> {
    try {
      const regions = await apiClient<Region[]>('/regions');
      if (Array.isArray(regions)) {
        return regions;
      }
      return [];
    } catch {
      return [];
    }
  }

  async getDistricts(regionId?: string): Promise<District[]> {
    try {
      const districts = await apiClient<District[]>('/districts', {
        params: regionId ? { regionId } : {},
      });
      if (Array.isArray(districts)) {
        return districts;
      }
      return [];
    } catch {
      return [];
    }
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

    return apiClient<School>(`/schools/${schoolId}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    });
  }

  async updateSchoolCoordinates(
    schoolId: string,
    latitude: number,
    longitude: number,
    addressNotes: string,
    user: User
  ): Promise<School> {
    return this.updateCoordinates(schoolId, latitude, longitude, addressNotes, user);
  }

  async updateCoordinates(
    schoolId: string,
    latitude: number,
    longitude: number,
    addressNotes: string,
    user: User
  ): Promise<School> {
    if (!canEditSchool(user, schoolId)) {
      throw new Error("Sizda koordinatalarni o'zgartirish huquqi yo'q");
    }

    return apiClient<School>(`/schools/${schoolId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        latitude,
        longitude,
        addressNotes,
        coordinateStatus: 'PENDING',
      }),
    });
  }

  async changePassword(userId: string, oldPass: string, newPass: string, user?: User): Promise<boolean> {
    try {
      await apiClient('/auth/onboarding', {
        method: 'POST',
        body: JSON.stringify({ userId, newPassword: newPass }),
      });
      return true;
    } catch {
      return false;
    }
  }
}

export const schoolService = new SchoolService();
