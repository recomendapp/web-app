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
import { databases } from '@/lib/appwrite';
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
import { useUser } from '@/context/UserProvider';
import { Icons } from '@/components/icons';

interface MovieSendActionProps extends React.HTMLAttributes<HTMLDivElement> {
  movieId: number;
}

export function MovieSendAction({ movieId }: MovieSendActionProps) {

  const { user } = useUser();

  const router = useRouter();

  const [friends, setFriends] = useState<Models.Document[]>();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    user?.$id &&
      movieId &&
      databases
        .listDocuments(
          String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
          String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_FRIENDS),
          [Query.equal('userId', user.$id)]
        )
        .then((response) => {
          setFriends(response.documents);
        })
        .catch((error) => {});
  }, [user?.$id, movieId]);

  const handleSendToFriend = async (friend: any, title: string) => {
    try {
      await databases.createDocument(
        String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
        String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_GUIDELISTED),
        'unique()',
        {
          movieId: movieId,
          userId: friend.$id,
          by: user.$id,
        }
      );
      toast.success('Envoyé à ' + friend.username);
      return;
    } catch (error: any) {
      if (error.response.code === 409) {
        toast.error(friend.username + ' a déjà cet élément dans sa guidelist');
      } else {
        toast.error("Une erreur s'est produite");
      }
    }
  };

  if (!user) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => router.push('/login')}
              disabled={(isLoading || isError) && true}
              size="icon"
              variant={'action'}
              className="rounded-full"
            >
              {isLoading ? (
                <Icons.spinner className="animate-spin" />
              ) : isError ? (
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
                disabled={(isLoading || isError) && true}
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
              {friends?.map((item) => (
                <CommandItem
                  key={item.friend.$i}
                  onSelect={() => {
                    handleSendToFriend(item.friend, item.title);
                    setOpen(false);
                  }}
                  className="flex items-center gap-2"
                >
                  {/* AVATAR */}
                  <Avatar className="h-[30px] w-[30px] shadow-2xl">
                    <AvatarImage
                      src={item.friend.avatar}
                      alt={item.friend.username}
                    />
                    <AvatarFallback className="text-primary bg-background text-[10px]">
                      {getInitiales(item.friend.username)}
                    </AvatarFallback>
                  </Avatar>
                  {item.friend.username}
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
