"use client";

import React from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import Image from "next/image";
import Logo from "../../../public/logo.png";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden" dir="rtl">
      {/* Subtle background effects */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Top-left glow */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        {/* Bottom-right glow */}
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/3 dark:bg-blue-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-[420px]">
          {/* Logo and theme toggle */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div>
                <Image src={Logo} alt="Logo" width={42} height={42} />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight">تروفلو</span>
                <span className="text-xs text-muted-foreground">سامانه مدیریت سازمانی</span>
              </div>
            </div>
            <ThemeToggle />
          </div>

          {/* Auth card */}
          <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 sm:p-8 shadow-xl shadow-black/5 dark:shadow-black/20">
            {children}
          </div>

          {/* Footer */}
          <div className="text-center mt-6 text-xs text-muted-foreground/70">
            © {new Date().getFullYear()} تروفلو. تمامی حقوق محفوظ است.
          </div>
        </div>
      </div>
    </div>
  );
}
