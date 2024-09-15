import { useAuth } from '@/context/auth-context';
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from 'react';
import UserCard from '@/components/User/UserCard/UserCard';
import { useInView } from 'react-intersection-observer';
import toast from 'react-hot-toast';

// UI
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Checkbox } from '@/components/ui/checkbox';

// ICONS
import { PlusIcon, Search, TrashIcon, XIcon } from 'lucide-react';
import type { Playlist, PlaylistGuest, UserFriend } from '@/types/type.db';
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase/client';
import useDebounce from '@/hooks/use-debounce';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
// COMPONENTS
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getInitiales } from '@/lib/utils';
import Loader from '@/components/Loader/Loader';
import { Badge } from '@/components/ui/badge';

const addUserFormSchema = z.object({
	friends: z.array(
		z.object({
			friend: z.any(),
		})
	)
});
  
type AddUserFormValues = z.infer<typeof addUserFormSchema>;

export default function PlaylistGuest({
  playlist,
}: {
  playlist: Playlist;
}) {
  const { user } = useAuth();
  const [view, setView] = useState('manage');

  if (user?.id != playlist?.user_id) return null;

  if (view == 'add-user')
    return <AddUser playlist={playlist} setView={setView} />;

  return (
    <div className="flex flex-col gap-4">
      <Table className=''>
        <TableHeader>
          <TableRow>
            <TableHead className="flex items-center gap-4">
              Utilisateurs
              <Button
                variant={'ghost'}
                size={'icon'}
                className="rounded-full p-0"
                onClick={() => setView('add-user')}
              >
                <PlusIcon size={20} />
              </Button>
            </TableHead>
            <TableHead className="text-right">
              Éditeur
              {/* <sup>
								<SparklesIcon size={15} className="inline text-accent-1" />
							</sup> */}
            </TableHead>
            <TableHead className="text-center w-20">
              <TrashIcon size={20} className="inline" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>

            {playlist?.guests.length > 0 ? (
              playlist?.guests?.map((guest : PlaylistGuest) => (
                <GuestManageAccess
                  key={guest?.id}
                  guest={guest}
                  playlist={playlist}
                />
              ))) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center">
                    Aucun invité
                  </TableCell>
                </TableRow>
              )
            }
        </TableBody>
      </Table>
    </div>
  );
}

const AddUser = ({
  playlist,
  setView,
}: {
  playlist: Playlist;
  setView: Dispatch<SetStateAction<string>>;
}) => {
  const { user } = useAuth();

  const queryClient = useQueryClient();

  const [ search, setSearch ] = useState<null | string>(null);

  const { ref, inView } = useInView();

  const numberOfResult = 20;

  const invitedUserIds =
    playlist?.guests?.map((guest: PlaylistGuest ) => guest?.user_id) || [];

  const debouncedSearch = useDebounce(search);

  const {
    data: friends,
    isLoading: loading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: debouncedSearch ? ['user', user?.id, 'friends', { search: debouncedSearch }] : ['user', user?.id, 'friends'],
    queryFn: async ({ pageParam = 1 }) => {
      let from = (pageParam - 1) * numberOfResult;
      let to = from - 1 + numberOfResult;

      let query = supabase
        .from('user_friend')
        .select('id, friend:friend_id!inner(*)')
        .eq('user_id', user?.id ?? '')
        .range(from, to)

      if (debouncedSearch) {
        query = query
          .ilike(`friend.username`, `${debouncedSearch}%`)
      }
      const { data } = await query
        .returns<UserFriend[]>();
      return data;
    },
    initialPageParam: 1,
    getNextPageParam: (data, pages) => {
      return data?.length == numberOfResult ? pages.length + 1 : undefined;
    },
    enabled: !!user?.id,
  });

  const { mutateAsync: insertPlaylistGuestMutation } = useMutation({
    mutationFn: async ({ guest_ids } : { guest_ids: string[] }) => {
      if (!playlist?.id) throw new Error('No playlist id');
      const { data, error } = await supabase
        .from('playlist_guest')
        .insert(guest_ids.map((user_id) => ({
          user_id: user_id,
          playlist_id: playlist?.id,
        })))
        .select('*, user(*)')
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['playlist', playlist?.id], (oldData: Playlist) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          guests: [
            ...oldData.guests,
            ...data,
          ],
        };
      })
    },
  })

  useEffect(() => {
		if (inView && hasNextPage) {
			fetchNextPage();
		}
	}, [inView, hasNextPage, friends, fetchNextPage]);

  const defaultValues: Partial<AddUserFormValues> = {
		friends: [],
	};

	const form = useForm<AddUserFormValues>({
		resolver: zodResolver(addUserFormSchema),
		defaultValues,
	});

  async function onSubmit(data: AddUserFormValues) {
		if (!user?.id) return null;

		if (!data.friends.length) {
			toast.error('Vous devez sélectionner au moins un ami');
			return;
		}

		try {
			await insertPlaylistGuestMutation({
        guest_ids: data.friends.map(({ friend }) => friend.id),
      });
			form.reset();
			toast.success('Ajouté');
		} catch (error: any) {
			toast.error("Une erreur s'est produite");
		} finally {
			setView('manage');
		}
	}

  return (
    <>
      <div className='flex justify-between gap-2'>
        <div className="w-full relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            value={search ?? ''}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Rechercher un ami...'
            autoFocus={false}
            className="pl-8"
          />
        </div>
        <Button
            variant={'ghost'}
            size={'icon'}
            className="rounded-full p-0"
            onClick={() => setView('manage')}
          >
            <XIcon size={20} />
          </Button>

      </div>
      <Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col space-y-2"
				>
					<FormField
					control={form.control}
					name="friends"
					render={() => (
						<ScrollArea className="border-2 rounded-md h-[40vh]">
						{friends?.pages[0]?.length ? (
							friends?.pages.map((page, i) => (
								<Fragment key={i}>
									{page?.map(({ friend }, index) => (
										<FormField
										key={friend?.id}
										control={form.control}
										name="friends"
										render={({ field }) => {
											return (
											<FormItem
												key={friend?.id}
												{...(i === friends.pages.length - 1 &&
												index === page.length - 1
													? { ref: ref }
													: {})}
											>
												<FormLabel className="flex flex-row w-full justify-between items-center space-x-3 space-y-0 hover:bg-muted p-2">
													<div className='flex items-center w-full justify-between gap-4'>
                            <div className="font-normal flex gap-2 items-center">
                              <Avatar className="h-[40px] w-[4	0px] shadow-2xl">
                                <AvatarImage
                                  src={friend?.avatar_url ?? ''}
                                  alt={friend?.username}
                                />
                                <AvatarFallback className="text-primary-foreground bg-muted text-[20px]">
                                  {getInitiales(friend?.username ?? '')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="line-clamp-1">{friend?.full_name}</p>
                                <p className="text-muted-foreground line-clamp-1">
                                  @{friend?.username}
                                </p>
                              </div>
                            </div>
                            {invitedUserIds.includes(friend?.id) && <Badge variant={'destructive'}>Déjà ajouté</Badge>}
                          </div>
													<FormControl>
														<Checkbox
                              disabled={invitedUserIds.includes(friend?.id)}
															checked={field.value?.some(
															(friendSelected) =>
																friendSelected.friend.id === friend?.id
															)}
															onCheckedChange={(checked) => {
															if (checked) {
																field.onChange([
																...(field.value || []),
																{ friend: { ...friend } },
																]);
															} else {
																field.onChange(
																field.value?.filter(
																	(friendSelected) =>
																	friendSelected.friend.id !== friend?.id
																)
																);
															}
															}}
															className="rounded-full"
														/>
													</FormControl>
												</FormLabel>
											</FormItem>
											);
										}}
										/>
									))}
								</Fragment>
							))
						) : (debouncedSearch && !loading && !isFetchingNextPage) ? (
							<p className="text-center p-2">Aucun résultat</p>
						) : friends != null ? (
							<p className="text-center p-2">Aucun ami</p>
						) : (
							<></>
						)}
						{(loading || isFetchingNextPage) && <Loader />}
						</ScrollArea>
					)}
					/>
					<Button
						disabled={!form.getValues('friends').length}
						type="submit"
					>
						Ajouter
					</Button>
				</form>
			</Form>
    </>
  )
};

const GuestManageAccess = ({
  guest,
  playlist,
}: {
  guest: PlaylistGuest;
  playlist: Playlist;
}) => {
  const { user } = useAuth();

  const queryClient = useQueryClient();

  const [editChecked, setEditChecked] = useState(guest?.edit);

  const { mutateAsync: updatePlaylistGuestMutation } = useMutation({
    mutationFn: async ({ edit } : { edit: boolean }) => {
      if (!guest?.id) throw new Error('No guest id');
      const { data, error } = await supabase
        .from('playlist_guest')
        .update({
          edit: edit,
        })
        .eq('id', guest?.id)
        .select('*')
      if (error) throw error;
      return data;
    }
  })

  const { mutateAsync: deletePlaylistGuestMutation } = useMutation({
    mutationFn: async () => {
      if (!guest?.id) throw new Error('No guest id');
      const { error } = await supabase
        .from('playlist_guest')
        .delete()
        .eq('id', guest?.id)
      if (error) throw error;
      return null;
    },
    onSuccess: () => {
      queryClient.setQueryData(['playlist', playlist?.id], (oldData: Playlist) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          guests: oldData.guests.filter((guestOldData: PlaylistGuest) => guestOldData?.id !== guest?.id)
        }
      })
    },
  })

  const handleDeleteUser = async (userId?: string) => {;
    try {
      if (!guest?.id) throw new Error('No guest id');
      await deletePlaylistGuestMutation();
      toast.success('Supprimé');
    } catch (error) {
      toast.error("Une erreur s'est produite");
    }
  };

  const handleSwitch = async (checked: boolean) => {
    try {
      if (!guest?.id) throw new Error('No guest id');
      await updatePlaylistGuestMutation({
        edit: checked,
      })
        setEditChecked(checked);
    } catch (error) {
      toast.error("Une erreur s'est produite");
    }
  };

  return (
    <TableRow className="group">
      <TableCell className="text-muted-foreground font-medium">
        <UserCard user={guest?.user} />
      </TableCell>
      <TableCell className="text-right">
        <Switch
          id="airplane-mode"
          checked={editChecked}
          onCheckedChange={handleSwitch}
          disabled={!user || !(user.premium)}
        />
      </TableCell>
      <TableCell className="text-center">
        <Button
          variant={'ghost'}
          size={'icon'}
          className="rounded-full"
          onClick={() => handleDeleteUser(guest?.user_id)}
        >
          <XIcon size={20} />
        </Button>
      </TableCell>
    </TableRow>
  );
};
