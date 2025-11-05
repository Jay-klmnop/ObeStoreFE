import { API_ENDPOINTS, backendAPI } from '@/api';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthModalType = 'login' | 'signup' | null;

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: any | null;
  authModalType: AuthModalType;
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
      openAuthModal: (type) => set({ authModalType: type }),
      closeAuthModal: () => set({ authModalType: null }),
      signup: async (email, password) => {
        (await backendAPI.post(API_ENDPOINTS.SIGNUP), { email, password });
        await get().login(email, password);
      },
      login: async (email, password) => {
        const res = await backendAPI.post(API_ENDPOINTS.LOGIN, { email, password });
        const { accessToken, refreshToken, user } = res.data;
        set({ accessToken, refreshToken, user });
      },
      logout: async () => {
        await backendAPI.post(API_ENDPOINTS.LOGOUT);
        set({ accessToken: null, refreshToken: null, user: null });
      },
      refresh: async () => {
        const { refreshToken } = get();
        if (!refreshToken) return;
        const res = await backendAPI.post(API_ENDPOINTS.REFRESH_TOKEN, { refreshToken });
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
