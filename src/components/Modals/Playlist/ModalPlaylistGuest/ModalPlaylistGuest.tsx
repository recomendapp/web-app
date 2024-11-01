'use client';

import { useAuth } from '@/context/auth-context';
import { useModal } from '@/context/modal-context';
import { PlaylistGuest, User } from '@/types/type.db';
import { Modal, ModalBody, ModalDescription, ModalFooter, ModalHeader, ModalTitle, ModalType } from '../../Modal';
import { usePlaylistGuests, usePlaylistGuestsSearchInfinite } from '@/features/playlist/playlistQueries';
import { useEffect, useState } from 'react';
import { PlaylistGuestTable } from './components/table/table';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon, Check } from 'lucide-react';
import { UserAvatar } from '@/components/User/UserAvatar/UserAvatar';
import { Icons } from '@/config/icons';
import { useAddPlaylistGuests } from '@/features/playlist/playlistMutations';
import { InputSearch } from '@/components/ui/input-search';
import useDebounce from '@/hooks/use-debounce';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useInView } from 'react-intersection-observer';
import toast from 'react-hot-toast';


export const PlaylistGuestView = ({
  playlistGuest,
  playlistId,
  setView
} : {
  playlistGuest: PlaylistGuest[],
  playlistId: number,
  setView: (view: 'guests' | 'add') => void
}) => {
  return (
    <>
      <ModalHeader className='px-4 pb-4 pt-5'>
        <ModalTitle>
          Membres de la playlist
        </ModalTitle>
        <ModalDescription>
          Gerez les droits d&apos;accès à votre playlist.
        </ModalDescription>
      </ModalHeader>
      <ModalBody>
        {playlistGuest ? (
          <PlaylistGuestTable playlistId={playlistId} guests={playlistGuest} setView={setView} />
        ) : null}
      </ModalBody>
    </>
  )
}

export const PlaylistGuestAddView = ({
  playlistId,
  playlistGuest,
  setView
} : {
  playlistId: number,
  playlistGuest: PlaylistGuest[],
  setView: (view: 'guests' | 'add') => void
}) => {
  const { user: authUser } = useAuth();
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [search, setSearch] = useState<string>('');
  const searchQuery = useDebounce(search, 500);
  const { ref, inView } = useInView();

  const {
		data: users,
		isLoading,
		isError,
		fetchNextPage,
		isFetchingNextPage,
		hasNextPage,
	} = usePlaylistGuestsSearchInfinite({
    playlistId,
    filters: {
      search: searchQuery,
      alreadyAdded: playlistGuest.map((guest) => guest?.user_id as string).concat(authUser?.id as string)
    }
  });
  const addUsers = useAddPlaylistGuests();
  
  const handleAddGuest = () => {
    addUsers.mutate({
      playlistId,
      userIds: selectedUsers.map((user) => user?.id as string)
    }, {
      onSuccess: () => {
        toast.success(`Ajouté${selectedUsers.length > 1 ? 's' : ''}`);
        setSelectedUsers([]);
        setView('guests');
      },
      onError: () => {
        toast.error('Une erreur s\'est produite');
      }
    });
  }

  useEffect(() => {
		if (inView && hasNextPage) {
		  fetchNextPage();
		}
	}, [inView, hasNextPage, fetchNextPage]);

  return (
    <>
      <ModalHeader className='px-4 pb-4 pt-5'>
        <ModalTitle className='flex gap-4 items-center'>
          <Button
            variant="ghost"
            size={'icon'}
            onClick={() => setView('guests')}
          >
            <ArrowLeftIcon size={20} />
            <span className='sr-only'>Retour</span>
          </Button>
          Ajouter un membre
        </ModalTitle>
        <ModalDescription className='text-left'>
          Ajoutez un utilisateur à votre playlist.
        </ModalDescription>
      </ModalHeader>
      <ModalBody className='!p-0 border-t bg-popover text-popover-foreground'>
        <InputSearch
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher un utilisateur..."
				/>
        <ScrollArea className={`h-[40vh]`}>
					<div className='p-2 grid justify-items-center'>
					{(users?.pages && users?.pages[0].length > 0) ? (
						users?.pages.map((page, i) => (
							page.map((user, index) => (
								<div
								key={index}
								className='w-full flex cursor-pointer items-center justify-between py-1.5 px-2 hover:bg-accent rounded-sm'
								onClick={() => {
                  // check if user.id is in selectedUsers
									if (selectedUsers.some((selectedUser) => selectedUser?.id === user?.id)) {
										return setSelectedUsers((prev) => prev.filter(
											(selectUser) => selectUser?.id !== user?.id
										))
									}
									return setSelectedUsers((prev) => [...prev, user]);
								}}
								{...(i === users.pages.length - 1 && index === page.length - 1
									? { ref: ref }
									: {})}
								>
									<div className="flex items-center">
										<UserAvatar avatar_url={user.avatar_url} username={user.username} />
										<div className="ml-2">
										<p className="text-sm font-medium leading-none line-clamp-1">
											{user.full_name}
										</p>
										<p className="text-sm text-muted-foreground line-clamp-1">
											@{user.username}
										</p>
										</div>
									</div>
									<Check size={20} className={`text-primary ${!selectedUsers.some((selectedUser) => selectedUser?.id === user?.id) ? 'opacity-0' : ''}`} />
								</div>
							))
						))
					) : isError ? (
						<div className='p-4 text-center text-muted-foreground'>
						Une erreur s&apos;est produite.
						</div>
					) : (searchQuery && !isLoading) ? (
						<div className='p-4 text-center text-muted-foreground'>
						Aucun utilisateur trouvé.
						</div>
					) : !isLoading ? (
						<div className='p-4 text-center text-muted-foreground'>
						Rechercher un utilisateur.
						</div>
					) : null}
					 {(isLoading || isFetchingNextPage) ? <Icons.loader /> : null}
					</div>
				</ScrollArea>
      </ModalBody>
      <ModalFooter className="flex items-center p-4 sm:justify-between">
				{selectedUsers.length > 0 ? (
				<div className="flex -space-x-2 overflow-hidden">
					{selectedUsers.map((friend) => (
					<UserAvatar
						key={friend?.id}
						{...friend}
						className='cursor-not-allowed'
						onClick={() => setSelectedUsers((prev) => prev.filter(
							(selectedUser) => selectedUser?.id !== friend?.id
						))}
					/>
					))}
				</div>
				) : (
				<p className="text-sm text-muted-foreground">
					Select users to add to the playlist
				</p>
				)}
				<Button
				disabled={!selectedUsers.length || addUsers.isPending}
				onClick={handleAddGuest}
				>
				{addUsers.isPending && <Icons.loader className="mr-2" />}	
				Envoyer
				</Button>
			</ModalFooter>
    </>
  )
}

interface PlaylistGuestModalProps extends ModalType {
  playlistId: number;
}

export function ModalPlaylistGuest({
  playlistId,
  ...props
} : PlaylistGuestModalProps) {
  const { data: playlistGuest, isError } = usePlaylistGuests(playlistId);
  const { user } = useAuth();
  const { closeModal } = useModal();
  const [view, setView] = useState<'guests' | 'add'>('guests');

  if (!user) return null;
  return (
    <Modal
    open={props.open}
    onOpenChange={(open) => !open && closeModal(props.id)}
    className={`
      gap-0 p-0 outline-none
    `}
    >
      {playlistGuest ? (
        view === 'guests' ? (
          <PlaylistGuestView playlistId={playlistId} playlistGuest={playlistGuest} setView={setView} />
        ) : (
          <PlaylistGuestAddView playlistId={playlistId} playlistGuest={playlistGuest} setView={setView} />
        )
      ) : isError ? (
        <div>Erreur</div>
      ) : null}
    </Modal>
  )
}
