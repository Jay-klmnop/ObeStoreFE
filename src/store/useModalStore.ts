import { create } from 'zustand';
import type { ProductCardType, ProductDetailType } from '@/types';

export type ModalType = 'login' | 'signup' | 'review' | null;

interface ModalState {
  modalType: ModalType;
  modalData?: { product?: ProductCardType | ProductDetailType };
  openModal: (type: ModalType, data?: { product?: ProductCardType | ProductDetailType }) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  modalType: null,
  modalData: undefined,
  openModal: (type, data) => set({ modalType: type, modalData: data }),
  closeModal: () => set({ modalType: null, modalData: undefined }),
}));
