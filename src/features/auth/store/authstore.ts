import { authLogin, authSignup, authLogout, authRefreshToken } from '@/features/auth';
import type { SignupFormData } from '@/features/auth';
import { useFavoriteStore } from '@/features/favorite';
import { useRewardStore } from '@/features/reward/store';
import type { NavigateFunction } from 'react-router-dom';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface AuthState {
  access: string | null;
  refresh: string | null;
  user: any | null;
  setToken: (accessToken: string) => void;
  setUser: (user: any) => void;
  signup: (data: SignupFormData) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: (navigate: NavigateFunction) => void;
  refreshToken: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        access: null,
        refresh: null,
        user: null,
        setToken: (access) => set({ access }),
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
          const { access, refresh, user } = res.data;
          console.log('로그인 성공, 새로운 상태 설정:', { access, user });
          set({ access, refresh, user });
        },
        logout: async (navigate) => {
          try {
            await authLogout();
          } catch (error) {
            console.error('로그아웃 API 호출 실패:', error);
          } finally {
            set({ access: null, refresh: null, user: null });
            useFavoriteStore.getState().reset();
            useRewardStore.getState().resetReward();
            navigate('/');
          }
        },
        refreshToken: async () => {
          const { refresh } = get();
          if (!refresh) return;
          const res = await authRefreshToken({ refreshToken: refresh });
          set({ access: res.data.access });
        },
      }),
      {
        name: 'auth-storage',
        partialize: (state) => ({
          access: state.access,
          refresh: state.refresh,
          user: state.user,
        }),
      }
    )
  )
);
