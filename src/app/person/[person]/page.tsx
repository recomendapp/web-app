import React, {useState, useEffect, useContext, Fragment} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
// import HeaderMinimal from '../../src/components/header/HeaderMinimal';
import { getMovieDetails } from '@/hooks/tmdb';
import { Metadata } from 'next';
import { AspectRatio } from '@/components/ui/aspect-ratio';
// import MovieDetails from '../../src/components/movie/MovieDetails';

export async function generateMetadata({ params }: { params: { person: string } }) {
    const movie = await getMovieDetails(params.person, 'fr-FR')
    if (movie.success === false ) {
        return {
            title: "Oups, film introuvable !"
        }
    }
    return {
        title: movie.title,
        description: `This is the page of ${movie.title}`
    }
}


export default async function Profile({ params }: { params: { movie: string } }) {
    const movie = await getMovieDetails(params.movie, 'fr-FR')
    if (movie.success === false ) throw Error
    
    return (
        <div className=' w-full'>
            {/* BACKDROP CONTAINER */}
            <div className=' h-[400px] relative'>
                <Image  
                    src={"https://image.tmdb.org/t/p/original/"+movie.backdrop_path} 
                    alt={movie.title}
                    fill
                    className="object-cover"
                />
            </div>

        </div>
    );
}