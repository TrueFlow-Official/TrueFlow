import { User } from "@/shared/types/auth.types";
import { z } from "zod";

// Zod Validation Schemas
export const loginSchema = z.object({
  email: z.string().email("ایمیل وارد شده نامعتبر است").min(1, "لطفا ایمیل خود را وارد کنید"),
  password: z.string().min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),
});

export const registerSchema = z
  .object({
    name: z.string().min(3, "نام باید حداقل ۳ کاراکتر باشد"),
    email: z.string().email("ایمیل وارد شده نامعتبر است").min(1, "لطفا ایمیل خود را وارد کنید"),
    password: z.string().min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),
    confirmPassword: z.string().min(6, "تایید رمز عبور الزامی است"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "رمز عبور و تایید آن با هم مطابقت ندارند",
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema = z.object({
  email: z.string().email("ایمیل وارد شده نامعتبر است").min(1, "لطفا ایمیل خود را وارد کنید"),
});

export const resetPasswordSchema = z
  .object({
    password: z.string().min(6, "رمز عبور جدید باید حداقل ۶ کاراکتر باشد"),
    confirmPassword: z.string().min(6, "تایید رمز عبور الزامی است"),
    token: z.string().min(1, "توکن بازیابی الزامی است"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "رمز عبور و تایید آن با هم مطابقت ندارند",
    path: ["confirmPassword"],
  });

export const verifyEmailSchema = z.object({
  token: z.string().min(1, "توکن تایید الزامی است"),
});

// TypeScript Types Derived from Schemas
export type LoginCredentials = z.infer<typeof loginSchema>;
export type RegisterData = z.infer<typeof registerSchema>;
export type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordData = z.infer<typeof resetPasswordSchema>;
export type VerifyEmailData = z.infer<typeof verifyEmailSchema>;

export interface AuthResponse {
  token: string;
  user: User;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

export interface ForgotPasswordResponse {
  message: string;
}

export interface ResetPasswordResponse {
  message: string;
}

export interface VerifyEmailResponse {
  message: string;
}
