import { Friend, User } from '@/types/type.user';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getInitiales } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import { Dispatch, SetStateAction, useState } from 'react';
import toast from 'react-hot-toast';

// GRAPHQL
import { useMutation, useQuery } from '@apollo/client';
import USER_FRIENDS_QUERY from '@/graphql/User/Friends/queries/GetUserFriends';
import INSERT_GUIDELIST_MUTATION from '@/graphql/User/Movie/Guidelist/mutations/InsertUserMovieGuidelist';
import {
  GetUserFriendsQuery,
  InsertUserMovieGuidelistMutation,
  UserFragment,
} from '@/graphql/__generated__/graphql';

const sendFormSchema = z.object({
  friends: z.array(
    z.object({
      friend: z.any(),
    })
  ),
  comment: z.string().optional(),
});

type SendFormValues = z.infer<typeof sendFormSchema>;

export default function SendForm({
  user,
  movieId,
  setOpen,
}: {
  user: UserFragment;
  movieId: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [search, setSearch] = useState('');

  const {
    data: userFriendsQuery,
    loading,
    error,
  } = useQuery<GetUserFriendsQuery>(USER_FRIENDS_QUERY, {
    variables: {
      user_id: user?.id,
    },
    skip: !user,
  });
  const friends = userFriendsQuery?.user_friendCollection?.edges;

  const [insertGuidelistMutation, { error: errorInsertGuidelist }] =
    useMutation<InsertUserMovieGuidelistMutation>(INSERT_GUIDELIST_MUTATION);

  const defaultValues: Partial<SendFormValues> = {
    friends: [],
    comment: '',
  };

  const form = useForm<SendFormValues>({
    resolver: zodResolver(sendFormSchema),
    defaultValues,
  });

  async function onSubmit(data: SendFormValues) {
    if (!data.friends.length) {
      toast.error('Vous devez sélectionner au moins un ami');
      return;
    }

    let successSend = 0;

    data.friends.map(async ({ friend }) => {
      try {
        await insertGuidelistMutation({
          variables: {
            movie_id: movieId,
            receiver_user_id: friend.id,
            sender_user_id: user?.id,
            comment: data.comment,
          },
        });
        successSend++;
        // toast.success(`Envoyé à ${friend.full_name}`);
      } catch (error) {
        console.error(error);
        // toast.error('Une erreur s\'est produite');
      }
      if (successSend == data.friends.length)
        toast.success(`Envoyé à ${successSend}/${data.friends.length} amis`);
      else toast.error(`Envoyé à ${successSend}/${data.friends.length} amis`);
    });
    setOpen(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-8"
      >
        <FormField
          control={form.control}
          name="friends"
          render={() => (
            <ScrollArea className="border-2 p-4 rounded-md min-h-[20vh]">
              {friends?.map(({ node: { friend } }) => (
                <FormField
                  key={friend.id}
                  control={form.control}
                  name="friends"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={friend.id}
                        className="flex flex-row items-center space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.some(
                              (friendSelected) =>
                                friendSelected.friend.id === friend.id
                            )}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                field.onChange([
                                  ...(field.value || []),
                                  { friend: { id: friend.id } },
                                ]);
                              } else {
                                field.onChange(
                                  field.value?.filter(
                                    (friendSelected) =>
                                      friendSelected.friend.id !== friend.id
                                  )
                                );
                              }
                            }}
                            className="rounded-full"
                          />
                        </FormControl>
                        <FormLabel className="font-normal flex gap-2 items-center">
                          <Avatar className="h-[50px] w-[50px] shadow-2xl">
                            <AvatarImage
                              src={friend.avatar_url ?? ''}
                              alt={friend.username}
                            />
                            <AvatarFallback className="text-primary bg-muted text-[10px]">
                              {getInitiales(friend.username)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold">{friend.full_name}</p>
                            <p className="text-muted-foreground">
                              @{friend.username}
                            </p>
                          </div>
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </ScrollArea>
          )}
        />
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Écrire un commentaire..."
                  className="resize-none"
                  maxLength={180}
                  {...field}
                />
              </FormControl>
              {/* <FormMessage /> */}
            </FormItem>
          )}
        />
        <Button type="submit">Envoyer</Button>
      </form>
    </Form>
  );
}
