'use client';

import { useAuth } from '@/context/auth-context';
import PlaylistGuest from '@/app/[lang]/(app)/playlist/[playlist]/_components/guest/PlaylistGuest';
import { useModal } from '@/context/modal-context';
import { Playlist } from '@/types/type.db';
import { Modal, ModalBody, ModalHeader, ModalTitle, ModalType } from '../Modal';

interface PlaylistGuestModalProps extends ModalType {
  playlist?: Playlist;
  filmId?: string;
}

export function PlaylistGuestModal({
  filmId,
  playlist,
  ...props
} : PlaylistGuestModalProps) {
  const { user } = useAuth();
  const { closeModal } = useModal();

  if (!user) return null;

  return (
    <Modal open={props.open} onOpenChange={(open) => !open && closeModal(props.id)}>
      <ModalHeader>
        <ModalTitle>Membres de la playlist</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <PlaylistGuest playlist={playlist} />
      </ModalBody>
    </Modal>
  )
}
