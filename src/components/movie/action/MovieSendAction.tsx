"use client"
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { databases } from "@/utils/appwrite";
import { Query } from "appwrite";
import { Models } from "appwrite/types/models";

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
  } from "@/components/ui/command"
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { cn, getInitiales } from "@/lib/utils";
import { toast } from "react-toastify";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface MovieSendActionProps extends React.HTMLAttributes<HTMLDivElement> {
    userId: string,
    movieId: number,
}

export function MovieSendAction ({ userId, movieId } : MovieSendActionProps) {
    const router = useRouter()

    const [ friends, setFriends ] = useState<Models.Document[]>()

    const [ isLoading, setIsLoading ] = useState(false)
    const [ isError, setIsError ] = useState(false)

    const [ open, setOpen ] = useState(false)
    const [ search, setSearch ] = useState("")

    useEffect(() => {
        userId && movieId && databases.listDocuments(
                String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS), 
                String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_FRIENDS), 
                [
                    Query.equal('userId', userId)
                ]
            )
            .then((response) => {
                setFriends(response.documents)
            })
            .catch((error) => {
            })
    }, [userId,movieId])


    console.log('SEARCH', search)

    const handleSendToFriend = async (friend: any, title: string) => {
        console.log('USERID', userId, friend.$id)
        try {
            await databases.createDocument(
                String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS), 
                String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_GUIDELISTED), 
                'unique()', 
                {
                    "movieId" : movieId,
                    "userId": friend.$id,
                    "by": userId
                }
            )
            toast.success("Envoyé à "+ friend.username)
            return
        } catch (error: any) {
            if (error.response.code === 409) {
                toast.error(friend.username + " a déjà cet élément dans sa guidelist");
            } else {
                toast.error("Une erreur s\'est produite");
            }
        }
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
                                variant={"accent-1-enabled"}
                                className='rounded-full'
                            >
                                <Send />
                            </Button>
                        </PopoverTrigger>
                    </TooltipTrigger>
                    <TooltipContent side='bottom'>
                     Envoyer à un(e) ami
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <PopoverContent className="w-[300px] p-0" align="start">
                <Command >
                    <CommandInput value={search} onValueChange={setSearch} placeholder="Rechercher un(e) ami(e)..." className="h-9" />
                    <CommandList>
                        <CommandGroup>
                            {friends?.map((item) => (
                                <CommandItem
                                    key={item.friend.$i}
                                    onSelect={() => {
                                        handleSendToFriend(item.friend, item.title)
                                        setOpen(false)
                                    }}
                                    className="flex items-center gap-2"
                                >
                                    {/* AVATAR */}
                                    <Avatar className="h-[30px] w-[30px] shadow-2xl">
                                        <AvatarImage src={item.avatar} alt={item.username} />
                                        <AvatarFallback className="text-primary bg-background text-[10px]">{getInitiales(item.friend.username)}</AvatarFallback>
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
    )
}