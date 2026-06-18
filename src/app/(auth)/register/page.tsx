"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { registerSchema, RegisterData } from "@/features/auth/types";
import { authService } from "@/features/auth/services/auth.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { AlertCircle, CheckCircle2 } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterData) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await authService.register(data);
      setSuccess("ثبت‌نام با موفقیت انجام شد! ایمیل فعال‌سازی فرضی شبیه‌سازی گردید. در حال انتقال به صفحه ورود...");
      toast.success("عضویت موفقیت‌آمیز بود.");
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (err) {
      const message = err instanceof Error ? err.message : "خطایی در هنگام ثبت‌نام رخ داده است.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3 text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">ایجاد حساب کاربری</h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          برای عضویت در سامانه مدیریت TrueFlow اطلاعات خود را وارد کنید
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
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">نام و نام خانوادگی</label>
            <Input
              id="name"
              type="text"
              placeholder="مثال: علی علوی"
              disabled={isLoading}
              className={errors.name ? "border-destructive focus-visible:ring-destructive" : "transition-colors focus-visible:ring-offset-0"}
              {...register("name")}
            />
            {errors.name && (
              <p className="text-xs font-medium text-destructive mt-1.5">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">ایمیل سازمانی</label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              disabled={isLoading}
              className={errors.email ? "border-destructive focus-visible:ring-destructive" : "transition-colors focus-visible:ring-offset-0"}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-xs font-medium text-destructive mt-1.5">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">رمز عبور</label>
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
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">تایید رمز عبور</label>
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
                <span>در حال ثبت اطلاعات...</span>
              </div>
            ) : (
              "ثبت‌نام و عضویت"
            )}
          </Button>
        </form>
      )}

      <div className="text-center text-sm text-muted-foreground">
        قبلاً ثبت‌نام کرده‌اید؟{" "}
        <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
          وارد شوید
        </Link>
      </div>
    </div>
  );
}
