import { create } from 'zustand';

type Mode = 'select' | 'add' | 'edit' | 'delete';

interface AddressModalState {
  isOpen: boolean;
  mode: Mode;
  editingAddress: any | null;

  openModal: (mode: Mode, address?: any | null) => void;
  closeModal: () => void;
}

export const useAddressModalStore = create<AddressModalState>((set) => ({
  isOpen: false,
  mode: 'select',
  editingAddress: null,

  openModal: (mode, address = null) =>
    set({
      isOpen: true,
      mode,
      editingAddress: address,
    }),

  closeModal: () =>
    set({
      isOpen: false,
      editingAddress: null,
    }),
}));
