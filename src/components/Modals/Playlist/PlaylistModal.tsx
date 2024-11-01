'use client';

import { PlaylistForm } from '@/components/modules/MoviePlaylist/form/PlaylistForm';
import { useAuth } from '@/context/auth-context';
import { useModal } from '@/context/modal-context';
import { Playlist } from '@/types/type.db';
import { Modal, ModalBody, ModalHeader, ModalTitle, ModalType } from '../Modal';
import { Button } from '@/components/ui/button';
import { UserCogIcon } from 'lucide-react';
import { TooltipBox } from '@/components/Box/TooltipBox';
import { ModalPlaylistGuest } from './ModalPlaylistGuest/ModalPlaylistGuest';

interface PlaylistModalProps extends ModalType {
  playlist?: Playlist;
  filmId?: string;
}

export function PlaylistModal({
  filmId,
  playlist,
  ...props
} : PlaylistModalProps) {
  const { user } = useAuth();
  const { openModal, closeModal } = useModal();

  if (!user) return null;

  return (
    <Modal open={props.open} onOpenChange={(open) => !open && closeModal(props.id)}>
      <ModalHeader>
        <ModalTitle className='flex gap-4 items-center'>
          {playlist ? 'Edit playlist' : 'Create playlist'}
          {playlist && (
            <TooltipBox tooltip='Members'>
              <Button
                variant={'muted'}
                size={'icon'}
                onClick={() => openModal(ModalPlaylistGuest, { playlistId: playlist.id })}
              >
                <UserCogIcon size={20}/>
              </Button>
            </TooltipBox>
          )}
        </ModalTitle>
      </ModalHeader>
      <ModalBody>
        <PlaylistForm
          success={() => closeModal(props.id)}
          filmId={filmId}
          playlist={playlist}
        />
      </ModalBody>
    </Modal>
  )
}
