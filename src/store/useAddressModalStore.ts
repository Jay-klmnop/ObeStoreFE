import { create } from 'zustand';
import type { Address } from '@/features/mypage/api/useAddressQuery';

interface AddressModalState {
  isOpen: boolean;
  mode: 'add' | 'edit' | 'delete';
  editingAddress: Address | null;
  openModal: (mode: 'add' | 'edit' | 'delete', address?: Address) => void;
  closeModal: () => void;
}

export const useAddressModalStore = create<AddressModalState>((set) => ({
  isOpen: false,
  mode: 'add',
  editingAddress: null,
  openModal: (mode, address) => set({ isOpen: true, mode, editingAddress: address ?? null }),

  closeModal: () => set({ isOpen: false, mode: 'add', editingAddress: null }),
}));
