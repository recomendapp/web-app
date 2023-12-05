
import { useAuth } from "@/context/AuthContext/auth-context";
import { Playlist, PlaylistGuest } from "@/types/type.playlist";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { User } from "@/types/type.user";
import UserCard from "@/components/User/UserCard/UserCard";
import { useInView } from "react-intersection-observer";

// UI
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

// ICONS
import { PlusIcon, SparklesIcon, TrashIcon, X, XIcon } from "lucide-react";

import SEARCH_USERS_QUERY from '@/components/Search/SearchUsers/queries/searchUsersQuery'
import UPDATE_PLAYLIST_GUEST_MUTATION from "@/components/Playlist/FilmPlaylist/PlaylistGuest/mutations/updatePlaylistGuestMutation";
import INSERT_PLAYLIST_GUEST_MUTATION from "@/components/Playlist/FilmPlaylist/PlaylistGuest/mutations/insertPlaylistGuestMutation";
import DELETE_PLAYLIST_GUEST_MUTATION from "@/components/Playlist/FilmPlaylist/PlaylistGuest/mutations/deletePlaylistGuestMutation";
import PLAYLIST_DETAILS_QUERY from '@/components/Playlist/FilmPlaylist/PlaylistDetails/queries/playlistDetailsQuery';
import { Checkbox } from "@/components/ui/checkbox";
import toast from "react-hot-toast";

export default function PlaylistGuest({
	playlist,
	setPlaylist,
} : {
	playlist: Playlist;
	setPlaylist?: Dispatch<SetStateAction<Playlist>>;
}) {
	const { user } = useAuth();
	const [ view, setView ] = useState('manage');

	if (user?.id != playlist?.user_id)
    	return (null);

	if (view == 'add-user')
		return <AddUser playlist={playlist} setView={setView} />

	return (
		<div className="flex flex-col gap-4">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="flex items-center gap-4">
							Members
							<Button
								variant={"ghost"}
								size={"icon"}
								className="rounded-full p-0"
								onClick={() => setView("add-user")}
							>
								<PlusIcon size={20}  />
							</Button>
						</TableHead>
						<TableHead className="text-right">
							Editer
							{/* <sup>
								<SparklesIcon size={15} className="inline text-accent-1" />
							</sup> */}
						</TableHead>
						<TableHead className="text-center w-20">
							<TrashIcon size={20} className="inline"/>
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{playlist?.guests?.edges?.map(({ guest }) => (
						<GuestManageAccess
							key={guest.user_id}
							guest={guest}
							playlist={playlist}
						/>
					))}
				</TableBody>
			</Table>
		</div>
	)
}


const AddUser = ({
	playlist,
	setView,
} : {
	playlist: Playlist;
	setView: Dispatch<SetStateAction<string>>;
}) => {
	const { user } = useAuth();

	const [ query, setQuery ] = useState('');

	const { ref, inView } = useInView();

	const numberOfResult = 20;

	const invitedUserIds = playlist?.guests?.edges?.map(({ guest }) => guest.user_id) || [];

	const { data: searchUsersQuery, loading, error, fetchMore, networkStatus } = useQuery(SEARCH_USERS_QUERY, {
        variables: {
            filter: {
				"username": {
					"iregex": query,
				},
				"id": {
					"neq": user?.id,
				}
			},
            first: numberOfResult,
        },
        skip: !query || !user?.id
    })
    const users: [ { user: User }] = searchUsersQuery?.userCollection?.edges;
    const pageInfo: { hasNextPage: boolean, endCursor: string,} = searchUsersQuery?.userCollection?.pageInfo;

	const [ insertPlaylistGuestMutation ] = useMutation(INSERT_PLAYLIST_GUEST_MUTATION, {
		update: (cache, { data }) => {
			const playlistData = cache.readQuery<any>({
				query: PLAYLIST_DETAILS_QUERY,
				variables: {
					id: playlist.id,
				},
			});
			cache.writeQuery({
				query: PLAYLIST_DETAILS_QUERY,
				variables: {
					id: playlist.id,
				},
				data: {
					playlistCollection: {
					  edges: [
						{
						  playlist: {
							...playlistData.playlistCollection.edges[0].playlist,
							guests: {
							  edges: [
								...playlistData.playlistCollection.edges[0].playlist.guests.edges,
								{
									__typename: 'playlist_guestEdge',
									guest: data.insertIntoplaylist_guestCollection.records[0]
								},
							  ],
							},
						  },
						},
					  ],
					},
				},
			});
		}
	});

	useEffect(() => {
        if (inView && pageInfo?.hasNextPage) {
            fetchMore({
                variables: {
                    filter: {
						"username": {
							"iregex": query,
						},
						"id": {
							"neq": user?.id,
						}
					},
                    first: numberOfResult,
                    after: pageInfo?.endCursor
                },
                updateQuery: (previousResult, { fetchMoreResult }) => {
                    return {
                      userCollection: {
                        edges: [
                            ...previousResult.userCollection.edges,
                            ...fetchMoreResult.userCollection.edges,
                        ],
                        pageInfo: fetchMoreResult.userCollection.pageInfo
                      }
                    };
                  }
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inView, pageInfo]);

	const handleAddUser = async (userId: string) => {
		try {
			const { data, errors } = await insertPlaylistGuestMutation({
				variables: {
					playlist_id: playlist.id,
					user_id: userId
				}
			});
			if (errors) throw errors;
		} catch (error) {
			toast.error('Une erreur s\'est produite');
		}
	}

	return (
		<Table>
			<TableHeader>
				<TableRow className="sticky top-0 bg-background">
					<TableHead>
						<Input
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							placeholder={"Rechercher un utilisateur..."}
							className="h-8 w-full lg:w-[250px] m-0"
						/>
					</TableHead>
					<TableHead className="text-right">
						<Button
							variant={"ghost"}
							size={"icon"}
							className="rounded-full p-0"
							onClick={() => setView("manage")}
						>
							<XIcon size={20} />
						</Button>
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{
					loading ? (
						<>
							{Array.from({ length: 6 }).map((_, index) => (
								<TableRow key={index}>
									<TableCell className="flex gap-4 items-center">
										<Skeleton className="bg-muted h-10 w-10 rounded-full" />
										<Skeleton className="bg-muted h-5 w-20 rounded-full" />
									</TableCell>
									<TableCell className="text-right"/>
								</TableRow>
							))}
						</>
					)
				:
					(!loading && !users?.length) ? (
						<TableRow>
							<TableCell>Aucun résultat.</TableCell>
							<TableCell />
						</TableRow>
					)
				:
					users.map(({ user } : { user: User}, index) => (
						<TableRow key={user.id} className='group'>
							<TableCell className="text-muted-foreground font-medium">
								<UserCard user={user} />
							</TableCell>
							<TableCell className="text-right">
								<Button
									variant={"muted"}
									onClick={() => handleAddUser(user.id)}
								>
									Inviter
								</Button>
							</TableCell>
						</TableRow>
					))
				}
			</TableBody>
		</Table>
	)
}

const GuestManageAccess = ({
	guest,
	playlist,
} : {
	guest: PlaylistGuest;
	playlist: Playlist;
}) => {

	const { user } = useAuth();

	const [ editChecked, setEditChecked ] = useState(guest.edit);

	const [ updatePlaylistGuestMutation ] = useMutation(UPDATE_PLAYLIST_GUEST_MUTATION);

	const [deletePlaylistGuestMutation] = useMutation(DELETE_PLAYLIST_GUEST_MUTATION, {
		update: (cache, { data }) => {
			const playlistData = cache.readQuery<any>({
				query: PLAYLIST_DETAILS_QUERY,
				variables: {
					id: playlist.id,
				},
			});
			cache.writeQuery({
				query: PLAYLIST_DETAILS_QUERY,
				variables: {
					id: playlist.id,
			},
			data: {
				playlistCollection: {
					edges: [
						{
						playlist: {
							...playlistData.playlistCollection.edges[0].playlist,
							guests: {
								edges: playlistData!.playlistCollection.edges[0].playlist.guests.edges.filter((edge: any) =>
									edge.guest.user_id != data?.deleteFromplaylist_guestCollection?.records[0]?.user_id
								)
							},
						},
						},
					],
				},
			},
			});
		},
	});

	const handleDeleteUser = async (userId: string) => {
		try {
			const { data, errors } = await deletePlaylistGuestMutation({
				variables: {
					playlist_id: playlist.id,
					user_id: userId
				}
			});
			if (errors) throw errors;
		} catch (error) {
			toast.error('Une erreur s\'est produite');
		}
	};

	const handleSwitch = async (checked: boolean) => {
		try {
			const { data, errors } = await updatePlaylistGuestMutation({
				variables: {
					playlist_id: playlist.id,
					user_id: guest.user_id,
					edit: checked,
				}
			});
			if (errors) throw errors;
			if (data.updateplaylist_guestCollection.records.length)
				setEditChecked(checked);
		} catch (error) {
			toast.error('Une erreur s\'est produite');
		}
	}

	return (
		<TableRow className='group'>
			<TableCell className="text-muted-foreground font-medium">
				<UserCard user={guest.user} />
			</TableCell>
			<TableCell className="text-right">
				<Switch
					id="airplane-mode"
					checked={editChecked}
					onCheckedChange={handleSwitch}
					disabled={!user || !(user.subscriptions?.edges?.length > 0)}				/>
			</TableCell>
			<TableCell className="text-center">
				<Button
					variant={"ghost"}
					size={"icon"}
					className="rounded-full"
					onClick={() => handleDeleteUser(guest.user_id)}
				>
					<XIcon size={20} />
				</Button>
			</TableCell>
		</TableRow>
	);
}