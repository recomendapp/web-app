'use client';

import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { useModal } from '@/context/modal-context';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Movie, User } from '@/types/type.db';
import { Modal, ModalBody, ModalDescription, ModalFooter, ModalHeader, ModalTitle, ModalType } from '../../Modal';
import { useMeSendMovie } from '@/features/me/meQueries';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Icons } from '@/config/icons';
import { UserAvatar } from '@/components/User/UserAvatar/UserAvatar';
import { useSendMovie } from '@/features/me/meMutations';
import { Label } from '@/components/ui/label';

const COMMENT_MAX_LENGTH = 180;

interface ModalMovieSendProps extends ModalType {
	movieId: number;
	movie?: Movie
}

export function ModalMovieSend({
	movieId,
	movie,
	...props
} : ModalMovieSendProps) {
	const { user } = useAuth();
	const { closeModal } = useModal();
	const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
	const [comment, setComment] = useState<string>('');
	const {
		data: friends,
		isLoading,
	} = useMeSendMovie({
		userId: user?.id,
		movieId,
	});
	const sendMovie = useSendMovie({
		movieId,
		senderId: user?.id,
	});

	function submit() {
		sendMovie.mutate({
			users: selectedUsers,
			comment: comment,
		}, {
			onSuccess: () => {
				toast.success('Envoyé');
				closeModal(props.id);
			},
			onError: (error: any) => {
				if (error instanceof Error) {
					toast.error(error.message);
				} else {
					switch (error.code) {
						case '23505':
							toast.error(`Vous avez déjà envoyé ce film à ${selectedUsers.length === 1 ? 'cet ami(e)' : 'un ou plusieurs de ces amis'}`);
							break;
						case '23514':
							toast.error(`Le commentaire est trop long (max ${COMMENT_MAX_LENGTH} caractère${COMMENT_MAX_LENGTH > 1 ? 's' : ''})`);
							break;
						default:
							toast.error(error.message);
							break;
					}
				}
			}
		});
	}

	return (
		<Modal
			open={props.open}
			onOpenChange={(open) => !open && closeModal(props.id)}
			className='gap-0 p-0 outline-none'
		>
			<ModalHeader className='px-4 pb-4 pt-5'>
				<ModalTitle>Envoyer à un(e) ami(e)</ModalTitle>
				<ModalDescription>
					Recomender {movie?.title ? (<strong>{movie?.title}</strong>) : 'ce film'} à un ami pour lui faire découvrir.
				</ModalDescription>
			</ModalHeader>
			<ModalBody className='!p-0 overflow-hidden'>
				<Command className="overflow-hidden rounded-t-none border-t">
					<CommandInput placeholder="Search user..." />
					<CommandList>
						{isLoading && (
							<div className="flex items-center justify-center p-4">
								<Icons.loader />
							</div>
						)}
						<CommandEmpty>No users found.</CommandEmpty>
						<CommandGroup className="p-2">
							{friends?.map(({friend, as_watched, already_sent}) => (
								<CommandItem
									key={friend.id}
									value={`@${friend.full_name} ${friend.username}`}
									className="flex items-center justify-between px-2"
									onSelect={() => {
										if (selectedUsers.includes(friend)) {
											return setSelectedUsers((prev) => prev.filter(
												(selectedUser) => selectedUser?.id !== friend?.id
											))
										}
										return setSelectedUsers((prev) => [...prev, friend]);
									}}
								>
									<div className="flex items-center">
										<UserAvatar avatar_url={friend.avatar_url} username={friend.username} />
										<div className="ml-2">
										<p className="text-sm font-medium leading-none line-clamp-1">
											{friend.full_name}
										</p>
										<p className="text-sm text-muted-foreground line-clamp-1">
											@{friend.username}
										</p>
										</div>
									</div>
									<div className="flex items-center gap-2 shrink-0">
										{already_sent && (
											<Badge variant="accent-1">
												Déjà envoyé
											</Badge>
										)}
										{as_watched && (
											<Badge variant="destructive">
												Déjà vu
											</Badge>
										)}
										<Check size={20} className={`text-primary ${!selectedUsers.includes(friend) ? 'opacity-0' : ''}`} />
									</div>
								</CommandItem>
							))}
						</CommandGroup>
						</CommandList>
				</Command>
			</ModalBody>
			<div className='px-2 pt-2'>
				<Label htmlFor="comment" className='sr-only'>Commentaire</Label>
				<Input
				value={comment}
				onChange={(e) => setComment(e.target.value)}
				placeholder="Écrire un commentaire..."
				maxLength={COMMENT_MAX_LENGTH}
				/>
			</div>
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
					Select users to send the movie to
				</p>
				)}
				<Button
				disabled={!selectedUsers.length || sendMovie.isPending}
				onClick={submit}
				>
				{sendMovie.isPending && <Icons.loader className="mr-2" />}	
				Envoyer
				</Button>
			</ModalFooter>
		</Modal>
	);
};
