'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { isSuperAdmin } from '@/lib/permissions';
import { adminService } from '@/services/adminService';
import { schoolService } from '@/services/schoolService';
import { useToast } from '@/components/ui/toast';
import { User, Role, Region } from '@/types';
import { Button } from '@/components/ui/button';
import {
  Users,
  UserPlus,
  ShieldAlert,
  ShieldCheck,
  MapPin,
  Lock,
  Calendar,
} from 'lucide-react';
import { CreateAdminModal } from '@/features/admin/components';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdminUsersManagementPage() {
  const { user } = useAuth();
  const { success, error: toastError } = useToast();

  const [admins, setAdmins] = useState<User[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [allAdmins, allRegions] = await Promise.all([
        adminService.getAdminUsers(),
        schoolService.getRegions(),
      ]);
      setAdmins(allAdmins);
      setRegions(allRegions);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleCreateAdmin = async (payload: {
    name: string;
    email: string;
    role: Role.ADMIN | Role.SUPER_ADMIN;
    regionId?: string;
  }) => {
    if (!user) return;
    try {
      const created = await adminService.createAdmin(payload, user);
      setAdmins((prev) => [...prev, created]);
      success(`Yangi administrator yaratildi: ${created.name}`, 'Muvaffaqiyat');
    } catch (e: any) {
      toastError(e?.message || 'Admin yaratishda xatolik', 'Xatolik');
    }
  };

  if (!user || !isSuperAdmin(user)) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-8 text-center space-y-3">
        <ShieldAlert className="w-12 h-12 text-rose-600 mx-auto" />
        <h2 className="text-lg font-bold text-rose-950">Ruxsat Cheklangan</h2>
        <p className="text-xs text-rose-800 max-w-md mx-auto leading-relaxed">
          Ushbu bo‘lim faqat Bosh Administrator (SUPER_ADMIN) uchun mo‘ljallangan. Iltimos, boshqaruv paneliga qayting.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-6 pb-12">
        <Skeleton className="h-24 w-full rounded-2xl" />
        <Skeleton className="h-96 w-full rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-16">
      {/* 1. Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <Users className="w-4 h-4 text-teal-600" />
            <span className="font-bold text-slate-800">Super Admin Huquqi</span>
            <span>•</span>
            <span>Ruxsatlar va hisoblar</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Administratorlar va Inspektorlar Boshqaruvi
          </h1>
          <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
            Respublika va viloyat darajasidagi inspektorlarga monitoring va tasdiqlash ruxsatlarini biriktirish.
          </p>
        </div>

        <Button
          type="button"
          onClick={() => setShowCreateModal(true)}
          className="bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs gap-1.5 rounded-xl h-10 px-5 shadow-xs"
        >
          <UserPlus className="w-4 h-4" />
          <span>Yangi Admin Qo‘shish</span>
        </Button>
      </div>

      {/* 2. Admin Table */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-4 px-5">Foydalanuvchi</th>
                <th className="py-4 px-5">Elektron Pochta</th>
                <th className="py-4 px-5">Ruxsat Darajasi</th>
                <th className="py-4 px-5">Biriktirilgan Hudud</th>
                <th className="py-4 px-5 text-center">Holat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {admins.map((adm) => {
                const reg = regions.find((r) => r.id === adm.regionId);

                return (
                  <tr key={adm.id} className="hover:bg-slate-50/70">
                    <td className="py-4 px-5 font-bold text-slate-900">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-900 text-white font-bold text-xs font-mono">
                          {adm.name.charAt(0)}
                        </div>
                        <span>{adm.name}</span>
                      </div>
                    </td>

                    <td className="py-4 px-5 font-mono text-slate-600">
                      {adm.email}
                    </td>

                    <td className="py-4 px-5">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-teal-50 text-teal-900 border border-teal-200">
                        <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                        <span>{adm.role}</span>
                      </span>
                    </td>

                    <td className="py-4 px-5 text-slate-700">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{reg ? reg.name : 'Respublika bo‘yicha (Barcha)'}</span>
                      </div>
                    </td>

                    <td className="py-4 px-5 text-center">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        Faol
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Create Modal */}
      {showCreateModal && (
        <CreateAdminModal
          regions={regions}
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateAdmin}
        />
      )}
    </div>
  );
}
