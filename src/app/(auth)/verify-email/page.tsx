"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { authService } from "@/features/auth/services/auth.service";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AlertCircle, CheckCircle2 } from "lucide-react";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "mock-verify-token"; // Default fallback to mock verification

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState<string>("در حال تایید و راستی‌آزمایی نشانی ایمیل شما...");

  useEffect(() => {
    async function verify() {
      try {
        const response = await authService.verifyEmail(token);
        setStatus("success");
        setMessage(response.message || "نشانی ایمیل شما تایید شد. حساب کاربری فعال گردید!");
        toast.success("ایمیل با موفقیت تایید شد.");
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      } catch (error) {
        setStatus("error");
        const msg = error instanceof Error ? error.message : "خطایی در تایید نشانی ایمیل رخ داد.";
        setMessage(msg);
      }
    }

    verify();
  }, [token, router]);

  return (
    <div className="flex flex-col gap-8 text-center">
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">فعال‌سازی ایمیل</h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          تایید آدرس پست الکترونیکی در سامانه مدیریت سازمانی TrueFlow
        </p>
      </div>

      <div className="flex flex-col items-center justify-center p-8 border border-border/50 rounded-2xl bg-card/50 backdrop-blur-sm min-h-[180px] shadow-lg shadow-black/5 dark:shadow-black/10">
        {status === "loading" && (
          <div className="flex flex-col items-center gap-4">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
            <p className="text-sm font-medium text-muted-foreground">{message}</p>
          </div>
        )}

        {status === "success" && (
          <div className="flex flex-col items-center gap-3 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="h-12 w-12 shrink-0" />
            <p className="text-sm font-semibold">{message}</p>
            <p className="text-xs text-muted-foreground">
              در حال انتقال خودکار به صفحه ورود...
            </p>
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center gap-3 text-destructive">
            <AlertCircle className="h-12 w-12 shrink-0" />
            <p className="text-sm font-semibold">{message}</p>
            <Link href="/login" className="mt-2">
              <Button variant="outline" className="border-destructive/20 hover:bg-destructive/10 hover:text-destructive transition-colors">
                صفحه ورود
              </Button>
            </Link>
          </div>
        )}
      </div>

      {status !== "loading" && (
        <div className="text-center text-sm text-muted-foreground">
          بازگشت به{" "}
          <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
            صفحه ورود
          </Link>
        </div>
      )}
    </div>
  );
}
