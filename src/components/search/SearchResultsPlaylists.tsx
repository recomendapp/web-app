"use client"
import { account, databases } from "@/utils/appwrite"
import { Models, Query } from "appwrite"
import { useEffect, useState } from "react"
import { Skeleton } from "../ui/skeleton"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Button } from "../ui/button"
import { AspectRatio } from "../ui/aspect-ratio"
import { ImageWithFallback } from "../ImageWithFallback"

export default function SearchResultsPlaylists({ query } : { query: string | undefined }) {
  const [ loading, setLoading ] = useState(true)
  const [ results, setResults ] = useState<Models.Document[] | null>(null)

    useEffect(() => {
        if (query) {
            setLoading(true)
            databases.listDocuments(
                String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
                String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_PLAYLIST),
                [
                    Query.search('title', query),
                    Query.equal('is_public', true)
                ]
            ).then((response) => {
                if(response.total > 0) {
                    setLoading(false)
                    setResults(response.documents)
                } else {
                    setLoading(false)  
                    setResults(null)
                }
            }).catch((error) => {
                console.log('error:', error)
            })
        }


    }, [query])


    if (loading) {
        return (
        <div className=" w-full flex flex-col gap-2">
            {/* USERS TITLE */}
            <div className="flex justify-between items-end">
                <Skeleton  className="h-8 w-32"/>
                <Skeleton className="h-8 w-32" />
            </div>
            {/* USERS CONTAINER */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto overflow-y-hidden flex-wrap">
                {Array.from({length: 5}).map((_, index) => (
                    <Skeleton 
                        key={index} 
                        className="flex flex-col items-center bg-secondary h-full rounded-xl p-2 gap-2"
                    
                    >
                        {/* AVATAR */}
                        <Skeleton className="bg-background h-[150px] w-[150px] rounded-xl" />
                        {/* NAME */}
                        <Skeleton  className="bg-background h-5 w-20" />
                        <Skeleton className="bg-background h-5 w-20 rounded-full" />

                    </Skeleton>
                ))}

            </div>
        </div>

        )
    }
    
    if(!loading && !results) {
        return null
    }

    return (
        <div className=" w-full flex flex-col gap-2">
            {/* USERS TITLE */}
            <div className="flex justify-between items-end">
                <div className="text-2xl font-bold">
                    Playlists
                </div>
                <Button variant="link" className="p-0 h-full">
                    Tout afficher
                </Button>
            </div>
            {/* USERS CONTAINER */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto overflow-y-hidden">
                {results?.slice(0,10).map((item) => (
                    <Link 
                        key={item.username} 
                        href={'/playlist/'+item.$id}
                        className="flex flex-col items-center bg-secondary hover:bg-secondary-hover h-full  w-full rounded-xl p-2 gap-2"
                    
                    >
                        {/* AVATAR */}
                        <div className="w-full shadow-2xl">
                          <AspectRatio ratio={1/1}>
                            <ImageWithFallback 
                                src={item.poster_path ? item.poster_path : ""} 
                                alt={item.title}
                                fill
                                className="rounded-md object-cover"
                            />
                          </AspectRatio>
                        </div>
                        {/* NAME */}
                        <div>
                            {item.title}
                        </div>
                        <Badge className="bg-accent-1 shadow-2xl">Playlist</Badge>
                    </Link>
                ))}
            </div>
        </div>
    )
    // try {
    //   const { documents: playlistDocuments } = await databases.listDocuments('playlist', ['*'], [`name=${name}`]);
    //   const playlistIds = playlistDocuments.map((doc) => doc.$id);
  
    //   const { documents: likesDocuments } = await databases.listDocuments('playlist_liked', ['*'], [`playlistId IN ${JSON.stringify(playlistIds)}`]);
  
    //   const likesCountMap = likesDocuments.reduce((map, doc) => {
    //     const playlistId = doc.playlistId;
    //     const count = doc.count;
    //     map[playlistId] = (map[playlistId] || 0) + count;
    //     return map;
    //   }, {});
  
    //   const playlists = playlistDocuments.map((doc) => ({
    //     playlistId: doc.$id,
    //     name: doc.name,
    //     likeCount: likesCountMap[doc.$id] || 0,
    //   }));
  
    //   playlists.sort((a, b) => b.likeCount - a.likeCount); // Sort playlists by like count in descending order
  
    //   return playlists;
    // } catch (error) {
    //   console.log('Error searching playlists by name:', error);
    //   return [];
    // }
  };