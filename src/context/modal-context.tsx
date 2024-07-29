'use client';

import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { useMediaQuery } from 'react-responsive';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

interface ModalInfo {
  id: string;
  header?: {
    title?: ReactNode;
    description?: ReactNode;
  }
  content: ReactNode;
  isOpen: boolean;
  autoClose?: boolean; // Ajouter autoClose ici
  className?: string;
}

interface ModalContextProps {
  modals: ModalInfo[];
  openModal: (args: Omit<ModalInfo, 'isOpen'>) => void; // Exclure isOpen ici
  closeModal: (id: string) => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modals, setModals] = useState<ModalInfo[]>([]);
  const pathname = usePathname();
  const isMobile = useMediaQuery({ maxWidth: 1024 });

  const openModal = (modal: Omit<ModalInfo, 'isOpen'>) => {
    setModals((prevModals) => {
      // Vérifier si une modal avec le même id existe déjà
      const modalIndex = prevModals.findIndex((m) => m.id === modal.id);

      if (modalIndex !== -1) {
        // Remplacer la modal existante
        const updatedModals = [...prevModals];
        updatedModals[modalIndex] = { ...modal, isOpen: true, autoClose: modal.autoClose ?? true };
        return updatedModals;
      } else {
        // Ajouter une nouvelle modal
        return [...prevModals, { ...modal, isOpen: true, autoClose: modal.autoClose ?? true }];
      }
    });
  };

  const closeModal = (id: string) => {
    setModals((prevModals) => {
      const updatedModals = prevModals.map((modal) =>
        modal.id === id ? { ...modal, isOpen: false } : modal
      );
      return updatedModals;
    });
  };

  // auto close modals on route change only if autoClose is true
  useEffect(() => {
    setModals((prevModals) => {
      const updatedModals = prevModals.map((modal) =>
        modal.autoClose ? { ...modal, isOpen: false } : modal
      );
      return updatedModals;
    });
  }, [pathname]);

  return (
    <ModalContext.Provider value={{ modals, openModal, closeModal }}>
      {children}
      {modals.map((modal) => (
        <Dialog key={modal.id} open={modal.isOpen} onOpenChange={() => closeModal(modal.id)}>
          <DialogContent className={cn("", modal.className)}>
            {modal.header && <DialogHeader>
              {modal.header.title && <DialogTitle>
                {modal.header.title}
              </DialogTitle>}
              {modal.header.description && <DialogDescription>
                {modal.header.description}
              </DialogDescription>}
            </DialogHeader>}
            {modal.content}
          </DialogContent>
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
