'use client';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import React, { createContext, useContext, ReactNode, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

interface ModalInfo {
  id: string;
  header?: {
    title?: ReactNode;
    description?: ReactNode;
  }
  content: ReactNode;
  isOpen: boolean;
}

interface OpenModalArgs {
  id: string;
  header?: {
    title?: ReactNode;
    description?: ReactNode;
  }
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

  const isMobile = useMediaQuery({ maxWidth: 1024 });

  const openModal = (modal: OpenModalArgs) => {
    setModals((prevModals) => {
      // Vérifier si une modal avec le même id existe déjà
      const modalIndex = prevModals.findIndex((m) => m.id === modal.id);
  
      if (modalIndex !== -1) {
        // Remplacer la modal existante
        const updatedModals = [...prevModals];
        updatedModals[modalIndex] = { ...modal, isOpen: true };
        return updatedModals;
      } else {
        // Ajouter une nouvelle modal
        return [...prevModals, { ...modal, isOpen: true }];
      }
    });
    // setModals((prevModals) => [...prevModals, { ...modal, isOpen: true }]);
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
        // isMobile ? (
        //   <Drawer key={modal.id} open={modal.isOpen} onOpenChange={() => closeModal(modal.id)}>
        //     <DrawerContent>
        //       {modal.header && <DrawerHeader>
        //         {modal.header.title && <DrawerTitle className='text-left'>
        //           {modal.header.title}
        //         </DrawerTitle>}
        //         {modal.header.description && <DrawerDescription>
        //           {modal.header.description}
        //         </DrawerDescription>}
        //       </DrawerHeader>}
        //       <div className='p-4'>
        //         {modal.content}
        //       </div>
        //     </DrawerContent>
        //   </Drawer>
        // ) : (
        <Dialog key={modal.id} open={modal.isOpen} onOpenChange={() => closeModal(modal.id)}>
          <DialogContent>
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
        // )
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
