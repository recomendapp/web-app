'use client';
import { AlertCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Query } from 'appwrite';
import { Models } from 'appwrite/types/models';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn, getInitiales } from '@/lib/utils/utils';
import { toast } from 'react-toastify';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Icons } from '@/components/icons';
import { useAuth } from '@/context/AuthContext/AuthProvider';
import { useMutation, useQuery } from '@apollo/client';
import USER_FRIENDS_QUERY from './queries/userFriendsQuery';
import { Friend, User } from '@/types/type.user';
import { Skeleton } from '@/components/ui/skeleton';

import INSERT_GUIDELIST_MUTATION from '@/components/modules/MovieAction/_components/MovieSendAction/mutations/insertGuidelistMutation'

interface MovieSendActionProps {
  filmId: string;
}

export function MovieSendAction({ filmId }: MovieSendActionProps) {

  const { user, loading: userLoading } = useAuth();

  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const { data: userFriendsQuery, loading, error } = useQuery(USER_FRIENDS_QUERY, {
    variables: {
        user_id: user?.id
    },
    skip: !user
  });
  const friends: [ { friend: Friend } ] = userFriendsQuery?.friendCollection?.edges;

  const [ insertGuidelistMutation, { error: errorInsertGuidelist} ] = useMutation(INSERT_GUIDELIST_MUTATION)

  const handleSendToFriend = async (friend: User) => {
    try {
      await insertGuidelistMutation({
        variables: {
          film_id: filmId,
          receiver_user_id: friend.id,
          sender_user_id: user?.id,
          comment: null,
        }
      });
      toast.success(`Envoyé à ${friend.full_name}`);
    } catch (error) {
      console.log(error)
      toast.error('Une erreur s\'est produite');
    }
  }

  if (!user) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => router.push('/login')}
              disabled={(loading || error) && true}
              size="icon"
              variant={'action'}
              className="rounded-full"
            >
              {loading ? (
                <Icons.spinner className="animate-spin" />
              ) : error ? (
                <AlertCircle />
              ) : (
                <Send />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            Connectez-vous
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              <Button
                disabled={(loading || error) && true}
                size="icon"
                variant={'action'}
                className="rounded-full"
              >
                <Send />
              </Button>
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom">Envoyer à un(e) ami</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <PopoverContent className="w-[300px] p-0" align="end">
        <Command>
          <CommandInput
            value={search}
            onValueChange={setSearch}
            placeholder="Rechercher un(e) ami(e)..."
            className="h-9"
          />
          <CommandList>
            <CommandGroup>
              {friends?.map(({ friend } : { friend: Friend}) => (
                <CommandItem
                  key={friend.friend_id}
                  onSelect={() => {
                    handleSendToFriend(friend.friend);
                    setOpen(false);
                  }}
                  className="flex items-center gap-2"
                >
                  {/* AVATAR */}
                  <Avatar className="h-[30px] w-[30px] shadow-2xl">
                    <AvatarImage
                      src={friend.friend.avatar_url}
                      alt={friend.friend.username}
                    />
                    <AvatarFallback className="text-primary bg-background text-[10px]">
                      {getInitiales(friend.friend.username)}
                    </AvatarFallback>
                  </Avatar>
                  {friend.friend.username}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandEmpty>Aucun ami(e) trouvé(e).</CommandEmpty>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
