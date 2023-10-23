import { Friend, User } from "@/types/type.user"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getInitiales } from "@/lib/utils/utils"
import { Textarea } from "@/components/ui/textarea"
import { Dispatch, SetStateAction } from "react"
import { toast } from "react-toastify"
import { useMutation } from "@apollo/client"

import INSERT_GUIDELIST_MUTATION from '@/components/Film/FilmAction/components/MovieSendAction/mutations/insertGuidelistMutation'

const sendFormSchema = z.object({
    friends: z.array(z.object({
        friend: z.any()
    })),
        // .refine((value) => value.some((item) => item),{
        //     message: "You have to select at least one item.",
        // }),
    comment: z.string()
        .optional()
})

type SendFormValues = z.infer<typeof sendFormSchema>

export default function SendForm({
    user,
    filmId,
    friends,
    setOpen
} : {
    user: User;
    filmId: string;
    friends: [{ friend: Friend }];
    setOpen: Dispatch<SetStateAction<boolean>>;
}) {

    const [ insertGuidelistMutation, { error: errorInsertGuidelist} ] = useMutation(INSERT_GUIDELIST_MUTATION)

    const defaultValues: Partial<SendFormValues> = {
        friends: [],
        comment: ""
    }

    const form = useForm<SendFormValues>({
        resolver: zodResolver(sendFormSchema),
        defaultValues,
    })

    async function onSubmit(data: SendFormValues) {
        if (!data.friends.length)
        {
            toast.error("Vous devez sélectionner au moins un ami");
            return ;
        }

        let successSend = 0;

        data.friends.map(async ({ friend }) => {
            try {
                await insertGuidelistMutation({
                  variables: {
                    film_id: filmId,
                    receiver_user_id: friend.id,
                    sender_user_id: user?.id,
                    comment: data.comment,
                  }
                });
                successSend++;
                // toast.success(`Envoyé à ${friend.full_name}`);
            } catch (error) {
                console.error(error);
                // toast.error('Une erreur s\'est produite');
            }
            if (successSend == data.friends.length)
                toast.success(`Envoyé à ${successSend}/${data.friends.length} amis`);
            else
                toast.error(`Envoyé à ${successSend}/${data.friends.length} amis`);
        })
        setOpen(false);
    }

    return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-8">
            <FormField
              control={form.control}
              name="friends"
              render={() => (
                <ScrollArea className="border-2 p-4 rounded-md min-h-[20vh]">
                    {friends?.map(({ friend: item } : { friend: Friend}) => (
                        <FormField
                            key={item.id}
                            control={form.control}
                            name="friends"
                            render={({ field }) => {
                            return (
                                <FormItem
                                key={item.id}
                                className="flex flex-row items-center space-x-3 space-y-0"
                                >
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value?.some(friend => friend.friend.id === item.friend.id)}
                                            onCheckedChange={(checked) => {
                                                if (checked) {
                                                    field.onChange([...(field.value || []), { friend: { id: item.friend.id } }]);
                                                } else {
                                                    field.onChange(field.value?.filter(friend => friend.friend.id !== item.friend.id));
                                                }
                                            }}
                                            className="rounded-full"
                                        />
                                    </FormControl>
                                    <FormLabel className="font-normal flex gap-2 items-center">
                                        <Avatar className="h-[50px] w-[50px] shadow-2xl">
                                            <AvatarImage
                                                src={item.friend.avatar_url}
                                                alt={item.friend.username}
                                            />
                                            <AvatarFallback className="text-primary bg-muted text-[10px]">
                                                {getInitiales(item.friend.username)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-semibold">{item.friend.full_name}</p>
                                            <p className="text-muted-foreground">@{item.friend.username}</p>
                                        </div>
                                    </FormLabel>
                                </FormItem>
                            )
                            }}
                        />
                    ))}
                    <FormMessage />
                </ScrollArea>
            )}/>
            <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className='sr-only'>
                        Bio
                    </FormLabel>
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
      )
}