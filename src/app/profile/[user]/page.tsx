"use client"
import Loader from '@/components/loader'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { checkUsernameExist } from '@/utils/appwrite'
import { PlusCircle } from 'lucide-react'
import { useState, useEffect } from 'react'



export default function User({ params }: { params: { user: string } }) {
    
    const [userAvailability, setUserAvailability] = useState<null | boolean>(null)

    const [userInitiales, setUserInitiales] = useState('');

    useEffect(() => {
        if(params.user) {
            const words = params.user.normalize('NFKC').toUpperCase().split(' ');
            let initials = '';
            if (words.length === 1) {
                initials = words[0].charAt(0);
            } else if (words.length >= 2) {
                for (let i = 0; i < 2; i++) {
                    initials += words[i].charAt(0);
                }
            }
            setUserInitiales(initials);
        }
      }, [params]);


    useEffect(() => {
        params.user && checkUsernameExist(params.user)
            .then((response) => {
                setUserAvailability(response)
            })
            .catch(() => {
                setUserAvailability(false)
            })
    }, [params])

    if (userAvailability === null) {
        return (
            <Loader />
        )
    }

    if (userAvailability === false) {
        return (
            <div className='container h-full relative flex flex-col items-center justify-center'>L&apos;utilisateur n&apos;existe pas</div>
        )
    }

    return (
        <div className='container h-full relative flex flex-col items-center gap-4'>
            <div className='flex flex-col gap-y-4'>
                <Avatar className="w-[200px] h-[200px]">
                    <AvatarImage src={params.user} alt={params.user} />
                    <AvatarFallback className='text-[100px]'>{userInitiales}</AvatarFallback>
                </Avatar>
                <div className='text-center'>
                    <div className='text-2xl font-semibold'>
                        {params.user}
                    </div>
                    <div className=''>
                        @{params.user}
                    </div>
                </div>
            </div>
            <Tabs defaultValue="music" className="space-y-6 w-full">
                <div className="space-between flex justify-center items-center">
                    <TabsList>
                    <TabsTrigger value="profile" className="relative">
                        Profil
                    </TabsTrigger>
                    <TabsTrigger value="activity">
                        Activité
                    </TabsTrigger>
                    <TabsTrigger value="podcasts">
                        Podcasts
                    </TabsTrigger>
                    <TabsTrigger value="statistics">
                        Statistiques
                    </TabsTrigger>
                    </TabsList>
                </div>
                <TabsContent
                    value="profile"
                    className="border-none p-0 outline-none"
                >
                    <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h2 className="text-2xl font-semibold tracking-tight">
                        Listen Now
                        </h2>
                        <p className="text-sm text-muted-foreground">
                        Top picks for you. Updated daily.
                        </p>
                    </div>
                    </div>
                    <Separator className="my-4" />
                    <div className="relative">
                    <ScrollArea>
                        <div className="flex space-x-4 pb-4">
                        {/* {listenNowAlbums.map((album) => (
                            <AlbumArtwork
                            key={album.name}
                            album={album}
                            className="w-[250px]"
                            aspectRatio="portrait"
                            width={250}
                            height={330}
                            />
                        ))} */}
                        </div>
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                    </div>
                    <div className="mt-6 space-y-1">
                    <h2 className="text-2xl font-semibold tracking-tight">
                        Made for You
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Your personal playlists. Updated daily.
                    </p>
                    </div>
                    <Separator className="my-4" />
                    <div className="relative">
                    <ScrollArea>
                        <div className="flex space-x-4 pb-4">
                        {/* {madeForYouAlbums.map((album) => (
                            <AlbumArtwork
                            key={album.name}
                            album={album}
                            className="w-[150px]"
                            aspectRatio="square"
                            width={150}
                            height={150}
                            />
                        ))} */}
                        </div>
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                    </div>
                </TabsContent>
                <TabsContent
                    value="podcasts"
                    className="h-full flex-col border-none p-0 data-[state=active]:flex"
                >
                    <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h2 className="text-2xl font-semibold tracking-tight">
                        New Episodes
                        </h2>
                        <p className="text-sm text-muted-foreground">
                        Your favorite podcasts. Updated daily.
                        </p>
                    </div>
                    </div>
                    <Separator className="my-4" />
                    {/* <PodcastEmptyPlaceholder /> */}
                </TabsContent>
            </Tabs>
        </div>
    )



    // return (
    //     <>
    //         {userAvailability !== null ? (
    //             <>
    //                 {userAvailability ? (
    //                     <div className='container h-full relative flex flex-col items-center justify-center'>Username : {params.user}</div>
    //                 ) : (
    //                     <div className='container h-full relative flex flex-col items-center justify-center'>L&apos;utilisateur n&apos;existe pas</div>
    //                 )}

    //             </>
    //         )   : (
    //             <Loader/>
    //         )}
    //     </>
    // )
}