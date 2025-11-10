import { create } from 'zustand';
import type { Address } from '@/features/mypage/api/useAddressQuery';

interface AddressModalState {
  isOpen: boolean;
  editingAddress: Address | null;
  openModal: (address?: Address) => void;
  closeModal: () => void;
}

export const useAddressModalStore = create<AddressModalState>((set) => ({
  isOpen: false,
  editingAddress: null,
  openModal: (address) => set({ isOpen: true, editingAddress: address ?? null }),
  closeModal: () => set({ isOpen: false, editingAddress: null }),
}));
