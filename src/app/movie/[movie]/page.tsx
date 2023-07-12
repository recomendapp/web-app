import React, {useState, useEffect, useContext, Fragment} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
// import HeaderMinimal from '../../src/components/header/HeaderMinimal';
import { getMovieDetails } from '@/hooks/tmdb';
import { Metadata } from 'next';
import { MovieDetails } from '@/components/movie/MovieDetails';
import { databases } from '@/utils/appwrite';
import { Query } from 'appwrite';
// import MovieDetails from '../../src/components/movie/MovieDetails';

export async function generateMetadata({ params }: { params: { movie: string } }) {
    const movie = await getMovieDetails(params.movie, 'fr-FR')
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
    const movieDocumentID = await (await databases.listDocuments(
        String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
        String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE),
        [
            Query.equal('movieId', movie.id)
        ]
    )).documents[0];

    if (movie.success === false ) throw Error
    
    return (
        <MovieDetails movie={movie} movieDocumentID={movieDocumentID}/>
    );
}