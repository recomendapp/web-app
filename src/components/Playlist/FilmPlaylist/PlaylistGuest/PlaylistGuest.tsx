import { useAuth } from '@/context/auth-context';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
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
import { PlusIcon, SparklesIcon, TrashIcon, X, XIcon } from 'lucide-react';

// GRAPHQL
import { useMutation, useQuery } from '@apollo/client';
import SEARCH_USERS_QUERY from '@/graphql/Search/SearchUsers';
import GET_PLAYLIST_BY_ID from '@/graphql/Playlist/Playlist/queries/GetPlaylistById';
import UPDATE_PLAYLIST_GUEST_MUTATION from '@/graphql/Playlist/PlaylistGuest/mutations/UpdatePlaylistGuest';
import INSERT_PLAYLIST_GUEST_MUTATION from '@/graphql/Playlist/PlaylistGuest/mutations/InsertPlaylistGuest';
import DELETE_PLAYLIST_GUEST_MUTATION from '@/graphql/Playlist/PlaylistGuest/mutations/DeletePlaylistGuest';
import { DeletePlaylistGuestMutation, GetPlaylistByIdQuery, InsertPlaylistGuestMutation, PlaylistFragment, PlaylistGuestFragment, SearchUsersQuery, UpdatePlaylistGuestMutation } from '@/graphql/__generated__/graphql';
import { useLocale } from 'next-intl';

export default function PlaylistGuest({
  playlist,
}: {
  playlist: PlaylistFragment;
}) {
  const { user } = useAuth();
  const [view, setView] = useState('manage');

  if (user?.id != playlist?.user_id) return null;

  if (view == 'add-user')
    return <AddUser playlist={playlist} setView={setView} />;

  return (
    <div className="flex flex-col gap-4">
      <Table>
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
              Editer
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
          {playlist?.guests?.edges?.map(({ node }) => (
            <GuestManageAccess
              key={node.user_id}
              guest={node}
              playlist={playlist}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

const AddUser = ({
  playlist,
  setView,
}: {
  playlist: PlaylistFragment;
  setView: Dispatch<SetStateAction<string>>;
}) => {
  const { user } = useAuth();
  const locale = useLocale();

  const [query, setQuery] = useState('');

  const { ref, inView } = useInView();

  const numberOfResult = 20;

  const invitedUserIds =
    playlist?.guests?.edges?.map(({ node }) => node.user_id) || [];

  const {
    data: searchUsersQuery,
    loading,
    error,
    fetchMore,
    networkStatus,
  } = useQuery<SearchUsersQuery>(SEARCH_USERS_QUERY, {
    variables: {
      filter: {
        username: {
          iregex: query,
        },
        id: {
          neq: user?.id,
        },
      },
      first: numberOfResult,
    },
    skip: !query || !user?.id,
  });
  const users = searchUsersQuery?.userCollection?.edges;
  const pageInfo = searchUsersQuery?.userCollection?.pageInfo;

  const [insertPlaylistGuestMutation] = useMutation<InsertPlaylistGuestMutation>(
    INSERT_PLAYLIST_GUEST_MUTATION,
    {
      update: (cache, { data }) => {
        const playlistData = cache.readQuery<GetPlaylistByIdQuery>({
          query: GET_PLAYLIST_BY_ID,
          variables: {
            id: playlist.id,
            locale: locale,
          },
        });
        if (playlistData && playlistData.playlistCollection?.edges[0].node.guests?.edges) {
          cache.writeQuery({
            query: GET_PLAYLIST_BY_ID,
            variables: {
              id: playlist.id,
              locale: locale,
            },
            data: {
              ...playlistData,
              playlistCollection: {
                ...playlistData.playlistCollection,
                edges: [
                  {
                    playlist: {
                      ...playlistData.playlistCollection?.edges[0].node,
                      guests: {
                        ...playlistData.playlistCollection?.edges[0].node.guests,
                        edges: [
                          ...playlistData.playlistCollection?.edges[0].node.guests.edges,
                          {
                            __typename: playlistData.playlistCollection?.edges[0].node.guests.edges,
                            guest:
                              data?.insertIntoplaylist_guestCollection?.records[0],
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
      },
    }
  );

  useEffect(() => {
    if (inView && pageInfo?.hasNextPage) {
      fetchMore({
        variables: {
          filter: {
            username: {
              iregex: query,
            },
            id: {
              neq: user?.id,
            },
          },
          first: numberOfResult,
          after: pageInfo?.endCursor,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) return previousResult;
          return {
            ...previousResult,
            userCollection: {
              ...previousResult.userCollection!,
              edges: [
                ...previousResult.userCollection!.edges,
                ...fetchMoreResult.userCollection!.edges,
              ],
              pageInfo: fetchMoreResult.userCollection!.pageInfo,
            },
          };
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, pageInfo]);

  const handleAddUser = async (userId: string) => {
    try {
      const { data, errors } = await insertPlaylistGuestMutation({
        variables: {
          playlist_id: playlist.id,
          user_id: userId,
        },
      });
      if (errors) throw errors;
      toast.success('Ajouté');
    } catch (error) {
      toast.error("Une erreur s'est produite");
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow className="sticky top-0 bg-background">
          <TableHead>
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={'Rechercher un utilisateur...'}
              className="h-8 w-full lg:w-[250px] m-0"
            />
          </TableHead>
          <TableHead className="text-right">
            <Button
              variant={'ghost'}
              size={'icon'}
              className="rounded-full p-0"
              onClick={() => setView('manage')}
            >
              <XIcon size={20} />
            </Button>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading ? (
          <>
            {Array.from({ length: 6 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell className="flex gap-4 items-center">
                  <Skeleton className="bg-muted h-10 w-10 rounded-full" />
                  <Skeleton className="bg-muted h-5 w-20 rounded-full" />
                </TableCell>
                <TableCell className="text-right" />
              </TableRow>
            ))}
          </>
        ) : !loading && query && !users?.length ? (
          <TableRow>
            <TableCell>Aucun résultat.</TableCell>
            <TableCell />
          </TableRow>
        ) : !loading && query && users?.length ? (
          users.map(({ node }, index) => (
            <TableRow key={node.id} className="group">
              <TableCell className="text-muted-foreground font-medium">
                <UserCard user={node} />
              </TableCell>
              <TableCell className="text-right">
                {!invitedUserIds.includes(node.id) ? (
                  <Button
                    variant={'muted'}
                    onClick={() => handleAddUser(node.id)}
                  >
                    Inviter
                  </Button>
                ) : (
                  <Button variant={'destructive'}>Invité</Button>
                )}
              </TableCell>
            </TableRow>
          ))
        ) : (
          <></>
        )}
      </TableBody>
    </Table>
  );
};

const GuestManageAccess = ({
  guest,
  playlist,
}: {
  guest: PlaylistGuestFragment;
  playlist: PlaylistFragment;
}) => {
  const { user } = useAuth();
  const locale = useLocale();

  const [editChecked, setEditChecked] = useState(guest.edit);

  const [updatePlaylistGuestMutation] = useMutation<UpdatePlaylistGuestMutation>(
    UPDATE_PLAYLIST_GUEST_MUTATION
  );

  const [deletePlaylistGuestMutation] = useMutation<DeletePlaylistGuestMutation>(
    DELETE_PLAYLIST_GUEST_MUTATION,
    {
      update: (cache, { data }) => {
        const playlistData = cache.readQuery<GetPlaylistByIdQuery>({
          query: GET_PLAYLIST_BY_ID,
          variables: {
            id: playlist.id,
            locale: locale,
          },
        });
        if (playlistData && playlistData.playlistCollection?.edges[0].node.guests?.edges) {
          cache.writeQuery({
            query: GET_PLAYLIST_BY_ID,
            variables: {
              id: playlist.id,
              locale: locale,
            },
            data: {
              ...playlistData,
              playlistCollection: {
                ...playlistData.playlistCollection,
                edges: [
                  {
                    playlist: {
                      ...playlistData.playlistCollection?.edges[0].node,
                      guests: {
                        ...playlistData.playlistCollection?.edges[0].node.guests,
                        edges:
                          playlistData!.playlistCollection.edges[0].node.guests.edges.filter(
                            ({node}) =>
                              node.user_id !=
                              data?.deleteFromplaylist_guestCollection?.records[0]
                                ?.user_id
                          ),
                      },
                    },
                  },
                ],
              },
            },
          });
        }
      },
    }
  );

  const handleDeleteUser = async (userId: string) => {
    try {
      const { data, errors } = await deletePlaylistGuestMutation({
        variables: {
          playlist_id: playlist.id,
          user_id: userId,
        },
      });
      if (errors) throw errors;
      toast.success('Supprimé');
    } catch (error) {
      toast.error("Une erreur s'est produite");
    }
  };

  const handleSwitch = async (checked: boolean) => {
    try {
      const { data, errors } = await updatePlaylistGuestMutation({
        variables: {
          playlist_id: playlist.id,
          user_id: guest.user_id,
          edit: checked,
        },
      });
      if (errors) throw errors;
      if (data?.updateplaylist_guestCollection.records.length)
        setEditChecked(checked);
    } catch (error) {
      toast.error("Une erreur s'est produite");
    }
  };

  return (
    <TableRow className="group">
      <TableCell className="text-muted-foreground font-medium">
        <UserCard user={guest.user} />
      </TableCell>
      <TableCell className="text-right">
        <Switch
          id="airplane-mode"
          checked={editChecked}
          onCheckedChange={handleSwitch}
          disabled={!user || !(user.subscriptions?.edges?.length! > 0)}
        />
      </TableCell>
      <TableCell className="text-center">
        <Button
          variant={'ghost'}
          size={'icon'}
          className="rounded-full"
          onClick={() => handleDeleteUser(guest.user_id)}
        >
          <XIcon size={20} />
        </Button>
      </TableCell>
    </TableRow>
  );
};
