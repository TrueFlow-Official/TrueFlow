import { AuthRepository } from "./auth.repository";
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

export class MockAuthRepository implements AuthRepository {
  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "خطایی در سیستم رخ داده است.");
    }
    return response.json() as Promise<T>;
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // Artificial latency to demonstrate loading states
    await new Promise((resolve) => setTimeout(resolve, 800));

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    return this.handleResponse<AuthResponse>(response);
  }

  async register(data: RegisterData): Promise<RegisterResponse> {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return this.handleResponse<RegisterResponse>(response);
  }

  async forgotPassword(email: string): Promise<ForgotPasswordResponse> {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const response = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    return this.handleResponse<ForgotPasswordResponse>(response);
  }

  async resetPassword(data: ResetPasswordData): Promise<ResetPasswordResponse> {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const response = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return this.handleResponse<ResetPasswordResponse>(response);
  }

  async verifyEmail(token: string): Promise<VerifyEmailResponse> {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const response = await fetch("/api/auth/verify-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
    return this.handleResponse<VerifyEmailResponse>(response);
  }

  async getCurrentUser(): Promise<User> {
    const response = await fetch("/api/auth/me", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await this.handleResponse<{ user: User }>(response);
    return data.user;
  }

  async logout(): Promise<void> {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    await this.handleResponse<void>(response);
  }
}
