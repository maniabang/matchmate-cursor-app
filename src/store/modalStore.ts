import { create } from 'zustand';
import { ReactNode } from 'react';

interface ModalProps {
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  // 기타 필요한 props 추가 가능
}

interface ModalState {
  open: boolean;
  content: ReactNode | null;
  props?: ModalProps;
  openModal: (content: ReactNode, props?: ModalProps) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  open: false,
  content: null,
  props: undefined,
  openModal: (content, props) => set({ open: true, content, props }),
  closeModal: () => set({ open: false, content: null, props: undefined }),
})); 