import { AuthRepository } from "../repositories/auth.repository";
import { MockAuthRepository } from "../repositories/mock-auth.repository";
import { useAuthStore } from "@/stores/useAuthStore";
import {
  LoginCredentials,
  RegisterData,
  ForgotPasswordResponse,
  ResetPasswordData,
  VerifyEmailResponse,
} from "../types";

class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  /**
   * Performs authentication and updates Zustand state on success.
   */
  async login(credentials: LoginCredentials): Promise<void> {
    const response = await this.authRepository.login(credentials);
    useAuthStore.getState().setAuth(response.user, response.token);
  }

  /**
   * Registers a new user account.
   */
  async register(data: RegisterData): Promise<void> {
    await this.authRepository.register(data);
  }

  /**
   * Submits a forgot password request.
   */
  async forgotPassword(email: string): Promise<ForgotPasswordResponse> {
    return this.authRepository.forgotPassword(email);
  }

  /**
   * Resets password using token.
   */
  async resetPassword(data: ResetPasswordData): Promise<void> {
    await this.authRepository.resetPassword(data);
  }

  /**
   * Verifies email using verification token.
   */
  async verifyEmail(token: string): Promise<VerifyEmailResponse> {
    return this.authRepository.verifyEmail(token);
  }

  /**
   * Validates existing session (cookie verification) on application mount.
   */
  async checkSession(): Promise<void> {
    try {
      useAuthStore.getState().setLoading(true);
      const user = await this.authRepository.getCurrentUser();
      // Cookie is valid, set session details
      useAuthStore.getState().setAuth(user, "mock-jwt-token-admin");
    } catch (error) {
      console.error("Session restoration check failed:", error);
      useAuthStore.getState().clearAuth();
    } finally {
      useAuthStore.getState().setLoading(false);
    }
  }

  /**
   * Signs the user out, clearing both backend session cookies and client stores.
   */
  async logout(): Promise<void> {
    try {
      await this.authRepository.logout();
    } finally {
      useAuthStore.getState().clearAuth();
    }
  }
}

// Export singleton instance initialized with the mock repository
export const authService = new AuthService(new MockAuthRepository());
export type { AuthService };
