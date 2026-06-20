"use client";

import React from "react";
import { useParams } from "next/navigation";
import { toJalaliDate, formatToman } from "@/shared/utils/persian";
import { PermissionGuard } from "@/shared/components/PermissionGuard";
import { Permission } from "@/shared/types/permission.types";
import { DataTable } from "@/components/ui/data-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ColumnDef } from "@tanstack/react-table";
import { ShieldCheck, UserCheck, CreditCard, Calendar } from "lucide-react";

interface AuditLog {
  id: string;
  action: string;
  user: string;
  date: string;
  ip: string;
}

const auditLogsData: AuditLog[] = [
  {
    id: "۱۰۱",
    action: "ورود موفقیت‌آمیز به سیستم",
    user: "سجاد احمدی (مدیر کل)",
    date: new Date().toISOString(),
    ip: "192.168.1.55",
  },
  {
    id: "۱۰۲",
    action: "تغییر تنظیمات سازمان",
    user: "سجاد احمدی (مدیر کل)",
    date: new Date(Date.now() - 3600000 * 2).toISOString(),
    ip: "192.168.1.55",
  },
  {
    id: "۱۰۳",
    action: "ایجاد توکن API جدید",
    user: "مریم حسینی (توسعه‌دهنده)",
    date: new Date(Date.now() - 86400000).toISOString(),
    ip: "192.168.2.11",
  },
];

const columns: ColumnDef<AuditLog>[] = [
  {
    accessorKey: "id",
    header: "شناسه",
  },
  {
    accessorKey: "action",
    header: "عملیات امنیتی",
  },
  {
    accessorKey: "user",
    header: "کاربر عامل",
  },
  {
    accessorKey: "date",
    header: "تاریخ و زمان وقوع",
    cell: ({ getValue }) => toJalaliDate(getValue<string>(), {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
  },
  {
    accessorKey: "ip",
    header: "نشانی IP",
  },
];

export default function OrganizationDashboardPage() {
  const params = useParams();
  const slug = params.organizationSlug as string;

  return (
    <div className="space-y-6">
      {/* Banner Title */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight break-words">داشبورد سازمان ({slug})</h2>
          <p className="text-sm text-muted-foreground">
            به سامانه پایش و کنترل معماری تروفلو خوش آمدید.
          </p>
        </div>

        {/* Jalali Utility Demo */}
        <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-xs sm:text-sm font-medium text-muted-foreground shadow-sm whitespace-nowrap">
          <Calendar className="h-4 w-4 text-blue-500 shrink-0" />
          <span className="truncate">امروز شمسی: {toJalaliDate(new Date())}</span>
        </div>
      </div>

      {/* Summary Info Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Toman format demo */}
        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">سقف اعتبار تراکنش روزانه</CardTitle>
            <CreditCard className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight">{formatToman(50000000)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              پشتیبانی از اعداد فارسی و واحد پول تومان
            </p>
          </CardContent>
        </Card>

        {/* RBAC user demo */}
        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">نقش دسترسی فعلی</CardTitle>
            <ShieldCheck className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight">مدیر ارشد سازمان</div>
            <p className="text-xs text-muted-foreground mt-1">
              دارای مجوزهای مدیریت و دسترسی به اطلاعات کل
            </p>
          </CardContent>
        </Card>

        {/* Permission Guard demo */}
        <PermissionGuard permission={Permission.USERS_MANAGE}>
          <Card className="border-blue-500/20 bg-blue-500/5 dark:bg-blue-950/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-bold text-blue-600 dark:text-blue-400">
                سیستم اعتبارسنجی سطح دسترسی
              </CardTitle>
              <UserCheck className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-xs text-blue-600 dark:text-blue-400 leading-relaxed">
                این باکس فقط برای کاربرانی رندر می‌شود که مجوز <code className="bg-blue-600/10 px-1 py-0.5 rounded text-[10px]">users:manage</code> دارند.
              </div>
            </CardContent>
          </Card>
        </PermissionGuard>
      </div>

      {/* Generic DataTable demo */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg">مانیتورینگ فعالیت‌های امنیتی</CardTitle>
          <CardDescription>
            آخرین رکوردهای امنیتی به صورت موک در بستر جدول DataTable
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={auditLogsData} />
        </CardContent>
      </Card>
    </div>
  );
}
