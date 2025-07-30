'use client';

import { useAuth } from '@/context/auth-context';
import { useModal } from '@/context/modal-context';
import { PlaylistGuest, User } from '@/types/type.db';
import { Modal, ModalBody, ModalDescription, ModalFooter, ModalHeader, ModalTitle, ModalType } from '../../Modal';
import { usePlaylistGuestsQuery, usePlaylistGuestsSearchInfiniteQuery } from '@/features/client/playlist/playlistQueries';
import { useEffect, useState } from 'react';
import { PlaylistGuestTable } from './components/table/table';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon, Check } from 'lucide-react';
import { UserAvatar } from '@/components/User/UserAvatar';
import { Icons } from '@/config/icons';
import { usePlaylistGuestsInsertMutation } from '@/features/client/playlist/playlistMutations';
import { InputSearch } from '@/components/ui/input-search';
import useDebounce from '@/hooks/use-debounce';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useInView } from 'react-intersection-observer';
import toast from 'react-hot-toast';
import { useTranslations } from 'next-intl';
import { upperFirst } from 'lodash';


export const PlaylistGuestView = ({
  playlistGuest,
  playlistId,
  setView
} : {
  playlistGuest: PlaylistGuest[],
  playlistId: number,
  setView: (view: 'guests' | 'add') => void
}) => {
  const t = useTranslations();
  return (
    <>
      <ModalHeader className='px-4 pb-4 pt-5'>
        <ModalTitle>
          {upperFirst(t('common.messages.guests_playlist'))}
        </ModalTitle>
        <ModalDescription>
          {upperFirst(t('common.messages.manage_playlist_access_rights'))}
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
  const t = useTranslations();
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
	} = usePlaylistGuestsSearchInfiniteQuery({
    playlistId,
    filters: {
      search: searchQuery,
      alreadyAdded: playlistGuest.map((guest) => guest?.user_id as string).concat(authUser?.id as string)
    }
  });
  const addUsers = usePlaylistGuestsInsertMutation();
  
  const handleAddGuest = () => {
    addUsers.mutate({
      playlistId,
      userIds: selectedUsers.map((user) => user?.id as string)
    }, {
      onSuccess: () => {
        toast.success(upperFirst(t('common.messages.added', { gender: 'male', count: selectedUsers.length })));
        setSelectedUsers([]);
        setView('guests');
      },
      onError: () => {
        toast.error(upperFirst(t('common.errors.an_error_occurred')));
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
            <span className='sr-only'>{upperFirst(t('common.messages.back'))}</span>
          </Button>
          {upperFirst(t('common.messages.add_guest', { count: 2 }))}
        </ModalTitle>
        <ModalDescription className='text-left'>
          {upperFirst(t('common.messages.add_guests_to_your_playlist'))}
        </ModalDescription>
      </ModalHeader>
      <ModalBody className='!p-0 border-t bg-popover text-popover-foreground'>
        <InputSearch
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={upperFirst(t('common.messages.search_user'))}
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
										<UserAvatar avatarUrl={user.avatar_url} username={user.username} />
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
						{upperFirst(t('common.errors.an_error_occurred'))}
						</div>
					) : (searchQuery && !isLoading) ? (
						<div className='p-4 text-center text-muted-foreground'>
						{upperFirst(t('common.errors.no_user_found'))}
						</div>
					) : !isLoading ? (
						<div className='p-4 text-center text-muted-foreground'>
						{upperFirst(t('common.messages.search_user'))}
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
						avatarUrl={friend?.avatar_url}
            username={friend?.username}
						className='cursor-not-allowed'
						onClick={() => setSelectedUsers((prev) => prev.filter(
							(selectedUser) => selectedUser?.id !== friend?.id
						))}
					/>
					))}
				</div>
				) : (
				<p className="text-sm text-muted-foreground">
					{upperFirst(t('common.messages.select_users_to_add_to_playlist'))}
				</p>
				)}
				<Button
				disabled={!selectedUsers.length || addUsers.isPending}
				onClick={handleAddGuest}
				>
				{addUsers.isPending && <Icons.loader className="mr-2" />}	
				{upperFirst(t('common.messages.send'))}
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
  const t = useTranslations();
  const { data: playlistGuest, isError } = usePlaylistGuestsQuery(playlistId);
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
        <p>{upperFirst(t('common.errors.an_error_occurred'))}</p>
      ) : null}
    </Modal>
  )
}
