"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { loginSchema, LoginCredentials } from "@/features/auth/types";
import { authService } from "@/features/auth/services/auth.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { AlertCircle, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginCredentials) => {
    setIsLoading(true);
    setError(null);
    try {
      await authService.login(data);
      toast.success("ورود با موفقیت انجام شد. خوش آمدید!");
      const callbackUrl = searchParams.get("callbackUrl") || "/org/acme-corp";
      router.push(callbackUrl);
    } catch (err) {
      const message = err instanceof Error ? err.message : "خطایی در هنگام ورود رخ داده است.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3 text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">ورود به حساب کاربری</h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          جهت ورود به پنل سازمانی اطلاعات خود را وارد نمایید
        </p>
      </div>

      {error && (
        <div className="flex items-center gap-3 rounded-lg bg-destructive/10 p-4 text-sm text-destructive font-medium border border-destructive/20">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">ایمیل سازمانی</label>
          <Input
            id="email"
            type="email"
            placeholder="admin@example.com"
            disabled={isLoading}
            className={errors.email ? "border-destructive focus-visible:ring-destructive" : "transition-colors focus-visible:ring-offset-0"}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs font-medium text-destructive mt-1.5">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">رمز عبور</label>
            <Link
              href="/forgot-password"
              className="text-xs font-medium text-blue-600 hover:text-blue-500 transition-colors"
            >
              رمز عبور را فراموش کرده‌اید؟
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              disabled={isLoading}
              className={errors.password ? "border-destructive focus-visible:ring-destructive" : "transition-colors focus-visible:ring-offset-0"}
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-2 flex items-center text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs font-medium text-destructive mt-1.5">{errors.password.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30" disabled={isLoading}>
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              <span>در حال برقراری ارتباط...</span>
            </div>
          ) : (
            "ورود به سیستم"
          )}
        </Button>
      </form>

      <div className="text-center text-sm text-muted-foreground">
        حسابی ندارید؟{" "}
        <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
          ثبت‌نام کنید
        </Link>
      </div>
    </div>
  );
}
