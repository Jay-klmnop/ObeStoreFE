import { authLogin, authSignup, authLogout, authRefreshToken } from '@/features/auth';
import type { SignupFormData } from '@/features/auth';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: any | null;
  setToken: (accessToken: string) => void;
  setUser: (user: any) => void;
  signup: (data: SignupFormData) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refresh: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      setToken: (accessToken) => set({ accessToken }),
      setUser: (user) => set({ user }),
      signup: async (data) => {
        await authSignup({
          email: data.email,
          password: data.password,
          username: data.username,
          nickname: data.nickname,
          phone_number: data.phone,
        });
        await get().login(data.email, data.password);
      },
      login: async (email, password) => {
        const res = await authLogin({ email, password });
        const { accessToken, refreshToken, user } = res.data;
        set({ accessToken, refreshToken, user });
      },
      logout: async () => {
        await authLogout();
        set({ accessToken: null, refreshToken: null, user: null });
      },
      refresh: async () => {
        const { refreshToken } = get();
        if (!refreshToken) return;
        const res = await authRefreshToken({ refreshToken });
        set({ accessToken: res.data.accessToken });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        user: state.user,
      }),
    }
  )
);
