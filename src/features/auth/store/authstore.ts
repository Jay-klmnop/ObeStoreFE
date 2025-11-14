import { authLogin, authSignup, authLogout, authRefreshToken } from '@/features/auth';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthModalType = 'login' | 'signup' | null;

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: any | null;
  authModalType: AuthModalType;
  setToken: (accessToken: string) => void;
  setUser: (user: any) => void;
  openAuthModal: (type: AuthModalType) => void;
  closeAuthModal: () => void;
  signup: (email: string, password: string) => Promise<void>;
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
      authModalType: null,
      setToken: (accessToken) => set({ accessToken }),
      setUser: (user) => set({ user }),
      openAuthModal: (type) => set({ authModalType: type }),
      closeAuthModal: () => set({ authModalType: null }),
      signup: async (email, password) => {
        await authSignup({ email, password });
        await get().login(email, password);
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
