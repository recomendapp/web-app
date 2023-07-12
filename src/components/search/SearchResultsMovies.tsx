"use client"
import { useSearchMovies } from "@/hooks/tmdb"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { Badge } from "../ui/badge"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Skeleton } from "../ui/skeleton"
import { ImageWithFallback } from "../ImageWithFallback"
import { AspectRatio } from "../ui/aspect-ratio"


export default function SearchResultsMovies({ query } : { query: string | undefined }) {
    const [ loading, setLoading ] = useState(true)
    const [ results, setResults ] = useState<any>(null)

    useEffect(() => {
        if (query) {
            setLoading(true)
            useSearchMovies(query, "fr-FR", 1).then((response) => {
                console.log('movie222', response)
                if(response.length) {
                    setLoading(false)
                    setResults(response)
                } else {
                    setLoading(false)  
                    setResults(null)
                }
            }).catch((error) => {
                console.log('error:', error)
            })
        }


    }, [query])

    useEffect(() => {
        console.log('results', results)
    }, [results])

    if (loading) {
        return (
            <div className=" w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* MEILLEUR RESULTAT */}
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-end">
                        <Skeleton className="h-8 w-32" />
                    </div>
                    <div className="flex bg-secondary h-full rounded-xl p-2 gap-2">
                        {/* MOVIE COVER */}
                        <Skeleton className="bg-background w-[200px] h-full rounded-lg" />

                        {/* NAME */}
                        <div className="flex flex-col justify-end">
                            {/* MOVIE TITLE */}
                            <Skeleton className="bg-background h-10 w-40"/>
                        </div>

                    </div>
                </div>
            {/* MOVIE RESULTS */}
            <div className="flex flex-col gap-2 ">
                <div className="flex justify-between items-end">
                    <Skeleton className="h-8 w-32" />
                    <Skeleton className="h-8 w-32" />
                </div>
                <div className="flex flex-col gap-2">
                    {Array.from({length: 4}).map((item: any) => (
                        <div
                            key={item}
                            className="text-sm flex justify-between pr-4 rounded-sm"
                        >
                            <div className="flex items-center gap-2">
                                {/* MOVIE COVER */}
                                <Skeleton className="h-[75px] w-[50px] rounded-sm" />
                                {/* MOVIE DATA */}
                                <div className="flex flex-col gap-2">
                                    <Skeleton className="h-6 w-32" />
                                    <Skeleton className="h-6 w-16" />
                                </div>

                            </div>
                            <div className="flex items-center">
                                <Skeleton className="h-6 w-12" />
                            </div>
                            
                        </div>
                    ))}
                </div>
            </div>
        </div>

        )
    }


    if(!loading && !results) {
        return null
    }


    return (
        <div className=" w-full grid grid-cols-1 lg:grid-cols-2 gap-2">
            {/* MEILLEUR RESULTAT */}
            <div className="flex flex-col gap-2">
                <div className="flex justify-between items-end">
                    <div className="text-2xl font-bold">
                        Meilleur résultat
                    </div>
                </div>
                <Link 
                        key={results[0].title} 
                        href={'/movie/'+results[0].id}
                        className="flex relative bg-secondary h-full hover:bg-secondary-hover rounded-xl p-2 gap-2"
                    
                    >
                        <Badge className="absolute right-2 bg-accent-1 shadow-2xl">Film</Badge>
                        {/* MOVIE COVER */}
                        <div className="w-[200px]">
                            <AspectRatio ratio={2/3}>
                                <ImageWithFallback 
                                    src={"https://image.tmdb.org/t/p/w500/"+results[0].poster_path} 
                                    alt={results[0].title}
                                    fill
                                    className="rounded-md object-cover"
                                />
                            </AspectRatio>
                        </div>

                        {/* NAME */}
                        <div className="flex flex-col justify-end">
                            {/* MOVIE TITLE */}
                            <div className="text-2xl font-bold">
                                {results[0].title}
                            </div>
                            {/* MOVIE DIRECTOR */}
                            <div>
                                {results[0].credits.directors.length ? results[0].credits.directors.map((director: any, index: number) => (
                                    <span key={director.id}>
                                        <Button variant="link" className="w-fit p-0 h-full text-accent-1 font-normal italic" asChild>
                                            <Link href={`/person/${director.id}`}>
                                                {director.name}
                                            </Link>
                                        </Button>
                                        {index !== results[0].credits.directors.length - 1 && (
                                        <span>, </span>
                                        )}
                                    </span>
                                )) : (
                                    <span className="w-fit p-0 h-full text-accent-1 font-normal italic">
                                        Unknown
                                    </span>
                                )}
                            </div>
                        </div>
                    </Link>
            </div>
            {/* MOVIE RESULTS */}
            <div className="flex flex-col gap-2 ">
                <div className="flex justify-between items-end">
                    <div className="text-2xl font-bold">
                        Films
                    </div>
                    {/* <div>
                        Tout afficher
                    </div> */}
                    <Button variant="link" className="p-0 h-full">
                        Tout afficher
                    </Button>
                </div>
                <div className="flex flex-col gap-2">
                    {results.slice(1,5).map((item: any) => (
                        <Link 
                            key={item.id}
                            href={'/movie/'+item.id}
                            className="text-sm flex justify-between pr-4 hover:bg-secondary rounded-sm"
                        >
                            <div className="flex items-center gap-2">
                                {/* MOVIE COVER */}
                                <div className="w-[50px]">
                                    <AspectRatio ratio={2/3}>
                                        <ImageWithFallback 
                                            src={"https://image.tmdb.org/t/p/w500/"+item.poster_path} 
                                            alt={item.title}
                                            fill
                                            className="rounded-md object-cover"
                                        />
                                    </AspectRatio>
                                </div>
                                {/* MOVIE DATA */}
                                <div className="flex flex-col">
                                    <Button variant="link" className="w-fit p-0 h-full text-base">
                                        {item.title}
                                    </Button>
                                    <div>
                                        {item.credits.directors.length ? item.credits.directors.map((director: any, index: number) => (
                                            <span key={director.id}>
                                                <Button variant="link" className="w-fit p-0 h-full text-accent-1 font-normal italic" asChild>
                                                    <Link href={`/person/${director.id}`}>
                                                        {director.name}
                                                    </Link>
                                                </Button>
                                                {index !== item.credits.directors.length - 1 && (
                                                <span>, </span>
                                                )}
                                            </span>
                                        )) : (
                                            <span className="w-fit p-0 h-full text-accent-1 font-normal italic">
                                                Unknown
                                            </span>
                                        )}

                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center">
                                {item.release_date ? item.release_date.split("-")[0] : "n/a"}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}