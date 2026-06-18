"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import { authService } from "@/features/auth/services/auth.service";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { LogOut, LayoutDashboard, Settings, User } from "lucide-react";

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuthStore();

  useEffect(() => {
    authService.checkSession();
  }, []);

  const handleLogout = async () => {
    await authService.logout();
    router.push("/login");
  };

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background text-foreground">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          <p className="text-sm font-medium">در حال بررسی نشست فعال...</p>
        </div>
      </div>
    );
  }

  // If session retrieval failed, return null (the middleware redirects to /login)
  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background text-foreground" dir="rtl">
      {/* Sidebar - Positioned on the right for RTL layout */}
      <aside className="hidden w-64 border-l border-border bg-card md:flex md:flex-col">
        {/* Brand Header */}
        <div className="flex h-16 items-center gap-2 border-b border-border px-6 font-bold text-xl">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
            <span className="text-sm font-black">TF</span>
          </div>
          <span>تروفلو</span>
        </div>

        {/* Navigation items */}
        <nav className="flex-1 space-y-1 p-4">
          <Button variant="ghost" className="w-full justify-start gap-3 bg-muted/60 hover:bg-muted/60 font-medium">
            <LayoutDashboard className="h-4 w-4 text-blue-500" />
            <span>داشبورد اصلی</span>
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:bg-muted font-normal" disabled>
            <Settings className="h-4 w-4" />
            <span>تنظیمات سامانه (بزودی)</span>
          </Button>
        </nav>

        {/* Sidebar Profile Card & Logout */}
        <div className="border-t border-border p-4 bg-muted/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500/10 text-blue-500">
              <User className="h-5 w-5" />
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full justify-start gap-2 border-destructive/20 text-destructive hover:bg-destructive/10 hover:text-destructive"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            <span>خروج از حساب</span>
          </Button>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Header */}
        <header className="flex h-16 items-center justify-between border-b border-border bg-card px-6">
          <div className="font-semibold text-lg text-muted-foreground">
            سامانه مدیریت منابع سازمانی TrueFlow
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </header>

        {/* Content Pane */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-muted/10">
          {children}
        </main>
      </div>
    </div>
  );
}
