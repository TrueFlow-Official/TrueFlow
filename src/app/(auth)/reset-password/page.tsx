"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { resetPasswordSchema, ResetPasswordData } from "@/features/auth/types";
import { authService } from "@/features/auth/services/auth.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { AlertCircle, CheckCircle2 } from "lucide-react";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "mock-reset-token";

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
      token: token,
    },
  });

  const onSubmit = async (data: ResetPasswordData) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await authService.resetPassword(data);
      setSuccess("رمز عبور شما با موفقیت تغییر کرد. در حال انتقال به صفحه ورود...");
      toast.success("تغییر رمز عبور با موفقیت ثبت شد.");
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (err) {
      const message = err instanceof Error ? err.message : "خطایی در تغییر رمز عبور رخ داده است.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3 text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">تغییر رمز عبور</h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          رمز عبور جدید و تاییدیه آن را جهت بازنشانی وارد نمایید
        </p>
      </div>

      {error && (
        <div className="flex items-center gap-3 rounded-lg bg-destructive/10 p-4 text-sm text-destructive font-medium border border-destructive/20">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="flex items-start gap-3 rounded-lg bg-emerald-500/10 p-4 text-sm text-emerald-600 font-medium border border-emerald-500/20 dark:text-emerald-400">
          <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
          <span>{success}</span>
        </div>
      )}

      {!success && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Pass token in form data */}
          <input type="hidden" {...register("token")} />

          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">رمز عبور جدید</label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              disabled={isLoading}
              className={errors.password ? "border-destructive focus-visible:ring-destructive" : "transition-colors focus-visible:ring-offset-0"}
              {...register("password")}
            />
            {errors.password && (
              <p className="text-xs font-medium text-destructive mt-1.5">{errors.password.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">تایید رمز عبور جدید</label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              disabled={isLoading}
              className={errors.confirmPassword ? "border-destructive focus-visible:ring-destructive" : "transition-colors focus-visible:ring-offset-0"}
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-xs font-medium text-destructive mt-1.5">{errors.confirmPassword.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30" disabled={isLoading}>
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                <span>در حال ذخیره رمز عبور جدید...</span>
              </div>
            ) : (
              "بروزرسانی رمز عبور"
            )}
          </Button>
        </form>
      )}

      <div className="text-center text-sm text-muted-foreground">
        بازگشت به{" "}
        <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
          صفحه ورود
        </Link>
      </div>
    </div>
  );
}
