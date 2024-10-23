'use client';

import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { useModal } from '@/context/modal-context';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { User } from '@/types/type.db';
import { Modal, ModalBody, ModalDescription, ModalFooter, ModalHeader, ModalTitle, ModalType } from '../../Modal';
import { useUserSendMovie } from '@/features/user/userQueries';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Icons } from '@/config/icons';
import UserAvatar from '@/components/User/UserAvatar/UserAvatar';
import { useSendMovie } from '@/features/user/userMutations';

interface MovieSendModalProps extends ModalType {
	movieId: number;
}

export function MovieSendModal({
	movieId,
	...props
} : MovieSendModalProps) {
	const { user } = useAuth();
	const { closeModal } = useModal();
	const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
	const [comment, setComment] = useState<string>('');
	const {
		data: friends,
		isLoading,
	} = useUserSendMovie({
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
							if (selectedUsers.length === 1)
								toast.error('Vous avez déjà envoyé ce film à cet ami(e)');
							else
								toast.error('Vous avez déjà envoyé ce film à un ou plusieurs de ces amis');
							break;
						default:
							toast.error("Une erreur s'est produite");
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
				<ModalTitle>Envoyer à un ami</ModalTitle>
				<ModalDescription>
					Recomendé ce film à un ami pour lui faire découvrir.
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
									className="flex items-center justify-between px-2"
									onSelect={() => {
										if (selectedUsers.includes(friend)) {
											return setSelectedUsers((prev) => prev.filter(
												(selectedUser) => selectedUser !== friend
											))
										}
										return setSelectedUsers((prev) => [...prev, friend]);
									}}
								>
									<div className="flex items-center">
										<UserAvatar user={friend} />
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
										<Check size={20} className={`text-primary ${!selectedUsers.includes(friend) && 'opacity-0'}`} />
									</div>
								</CommandItem>
							))}
						</CommandGroup>
						</CommandList>
				</Command>
			</ModalBody>
			<Input value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Écrire un commentaire..." className='border-x-0 rounded-none' />
			<ModalFooter className="flex items-center p-4 sm:justify-between">
				{selectedUsers.length > 0 ? (
				<div className="flex -space-x-2 overflow-hidden">
					{selectedUsers.map((friend) => (
					<UserAvatar
						key={friend?.id}
						user={friend}
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
