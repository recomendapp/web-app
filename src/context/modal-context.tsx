'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import React, { createContext, useContext, ReactNode, useState } from 'react';

interface ModalInfo {
  id: string;
  content: ReactNode;
  isOpen: boolean;
}

interface OpenModalArgs {
  id: string;
  content: ReactNode;
}

interface ModalContextProps {
  modals: ModalInfo[];
  openModal: (args: OpenModalArgs) => void;
  closeModal: (id: string) => void;
}
const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modals, setModals] = useState<ModalInfo[]>([]);

  const openModal = ({ id, content }: OpenModalArgs) => {
    setModals((prevModals) => [...prevModals, { id, content, isOpen: true }]);
  };

  const closeModal = (id: string) => {
    setModals((prevModals) => {
      const updatedModals = prevModals.map((modal) =>
        modal.id === id ? { ...modal, isOpen: false } : modal
      );
      return updatedModals;
    });
  };

  return (
    <ModalContext.Provider value={{ modals, openModal, closeModal }}>
      {children}
      {modals.map((modal) => (
        <Dialog key={modal.id} open={modal.isOpen} onOpenChange={() => closeModal(modal.id)}>
          {modal.content}
        </Dialog>
      ))}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
