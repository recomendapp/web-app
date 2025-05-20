'use client';

import { createContext, ReactNode, useState, useEffect, use } from 'react';
import { usePathname } from '@/lib/i18n/routing';
import { ModalTemplate, ModalTemplateProps } from '@/components/Modals/templates/ModalTemplate';
import { ConfirmModalTemplate, ConfirmModalTemplateProps } from '@/components/Modals/templates/ConfirmModalTemplate';

interface Modal<T = any> {
  id: string;
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  component: React.ComponentType<T>;
  props?: T;
}

interface ModalContextProps {
  modals: Modal[];
  openModal: <T>(component: React.ComponentType<T>, props: Omit<T, 'id' | 'open' | 'onOpenChange'>) => void;
  createModal: (props: Omit<ModalTemplateProps, 'id' | 'open' | 'onOpenChange'>) => void;
  createConfirmModal: (props: Omit<ConfirmModalTemplateProps, 'id' | 'open' | 'onOpenChange'>) => void;
  closeModal: (id: string) => void;
  closeAllModals: () => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modals, setModals] = useState<Modal[]>([]);
  const pathname = usePathname();

  /**
   * Open a modal
   * @param modal - The modal to open
   * @returns void
   */
  const openModal = <T,>(component: React.ComponentType<T>, props: Omit<T, 'id' | 'open' | 'onOpenChange'>) => {
    setModals((prevModals) => {
        const newModalId = Math.random().toString(36).substring(7);
        const newModal = {
          id: newModalId,
          open: true,
          component,
          props
        }
        return [...prevModals, newModal];
    });
  };

  /**
   * Create a new modal
   */
  const createModal = ({
    ...props
  } : Omit<ModalTemplateProps, 'id' | 'open' | 'onOpenChange'>) => {
    openModal(ModalTemplate, {
      ...props
    });
  }

  const createConfirmModal = ({
    ...props
  } : Omit<ConfirmModalTemplateProps, 'id' | 'open' | 'onOpenChange'>) => {
    openModal(ConfirmModalTemplate, {
      ...props
    });
  }

  /**
   * Delete a modal
   * @param id - The id of the modal to delete
   * @returns void
   */
  const deleteModal = (id: string) => {
    setModals((prevModals) => prevModals.filter((modal) => modal.id !== id));
  }

  /**
   * Close a modal
   * @param id - The id of the modal to close
   * @returns void
   */
  const closeModal = (id: string) => {
    setModals((prevModals) =>
      prevModals.map((modal) =>
        modal.id === id ? { ...modal, open: false } : modal
      )
    );

    setTimeout(() => {
      deleteModal(id);
    }, 300);
  };

  /**
   * Close all modals
   * @returns void
   */
  const closeAllModals = () => {
    setModals([]);
  }

  // Close all modals when navigating to a new page
  useEffect(() => {
    closeAllModals();
  }, [pathname]);

  return (
    <ModalContext.Provider value={{
      modals,
      openModal,
      createModal,
      createConfirmModal,
      closeModal,
      closeAllModals
      }}>
      {children}
      {modals.map((modal) => (
        <modal.component
          id={modal.id}
          open={modal.open}
          key={modal.id}
          {...modal.props}
        />
      ))}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = use(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}
