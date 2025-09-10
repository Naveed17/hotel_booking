"use client";

import {
  getUser as userData,
  signIn,
  signOut,
  forget_password,
} from "@src/actions";
export interface SignInWithPasswordParams {
  email: string;
  password: string;
}

export interface ResetPasswordParams {
  email: string;
}
type User = any;

class AuthClient {
  async signInWithPassword(
    params: SignInWithPasswordParams
  ): Promise<{ error?: string }> {
    const { email, password } = params;
    const response = await signIn({ email, password });
    if (response.error) {
      return { error: response.error };
    }

    return {};
  }

  async resetPassword(
    payload: ResetPasswordParams
  ): Promise<{ error?: string; message?: string }> {
    const response = await forget_password(payload.email);
    if (response.error) {
      return { error: response.error };
    }
    return {};
  }

  async updatePassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: "Update reset not implemented" };
  }

  async getUser(): Promise<{ data?: User | null; error?: string }> {
    const response: any = await userData();
    if (response?.error) {
      return { error: response.error };
    }

    return { data: response };
  }

  async signOut(): Promise<{ error?: string }> {
    await signOut();

    return {};
  }
}

export const authClient = new AuthClient();
