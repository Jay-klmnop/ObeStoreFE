// src/features/reward/store/useRewardStore.ts
import { create } from 'zustand';

interface RewardState {
  availablePoints: number; // 보유 적립금 (기존 OrderStore의 available 대체)
  usedPoints: number; // 사용자가 입력한 사용 금액
  earnedPoints: number; // 적립 예정 금액 (CartStore 등에서 전달받음)
  totalPoints: number; // 전체 누적 (나중에 MyPage 등에서 확장용)

  // actions
  setAvailablePoints: (value: number) => void;
  setUsedPoints: (value: number) => void;
  setEarnedPoints: (value: number) => void;
  resetReward: () => void;
}

export const useRewardStore = create<RewardState>((set) => ({
  availablePoints: 6000,
  usedPoints: 0,
  earnedPoints: 0,
  totalPoints: 6000, // 누적 적립금 (옵션)

  setAvailablePoints: (value) => set({ availablePoints: value }),
  setUsedPoints: (value) => set({ usedPoints: value }),
  setEarnedPoints: (value) => set({ earnedPoints: value }),
  resetReward: () =>
    set({
      usedPoints: 0,
      earnedPoints: 0,
    }),
}));
