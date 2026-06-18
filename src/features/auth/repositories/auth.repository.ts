import {
  LoginCredentials,
  AuthResponse,
  RegisterData,
  RegisterResponse,
  ForgotPasswordResponse,
  ResetPasswordData,
  ResetPasswordResponse,
  VerifyEmailResponse,
} from "../types";
import { User } from "@/shared/types/auth.types";

export interface AuthRepository {
  login(credentials: LoginCredentials): Promise<AuthResponse>;
  register(data: RegisterData): Promise<RegisterResponse>;
  forgotPassword(email: string): Promise<ForgotPasswordResponse>;
  resetPassword(data: ResetPasswordData): Promise<ResetPasswordResponse>;
  verifyEmail(token: string): Promise<VerifyEmailResponse>;
  getCurrentUser(): Promise<User>;
  logout(): Promise<void>;
}
