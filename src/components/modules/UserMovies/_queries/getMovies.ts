import { databases } from "@/db/appwrite";
import { getMovieDetails } from "@/hooks/tmdb";
import { Query } from "appwrite";

export default async function getMovies(userId: string, page: number, numberOfResult: number, language: string = 'en') {
    try {
        const { total, documents } = await databases.listDocuments(
            String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
            String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_WATCHED),
            [
                Query.limit(numberOfResult),
                Query.offset(numberOfResult * (page - 1)),
                Query.equal('userId', userId)
            ]
        );

        const movies = await Promise.all(
            documents.map(async (movie: any) => {
                const movieDetails = await getMovieDetails(movie.movieId, language)
                const { total: isLiked } = await databases.listDocuments(
                    String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
                    String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_LIKED),
                    [
                        Query.equal('userId', userId),
                        Query.equal('movieId', movie.movieId)
                    ]
                );
                const { total: isRated, documents: rating } = await databases.listDocuments(
                    String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
                    String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_RATED),
                    [
                        Query.equal('userId', userId),
                        Query.equal('movieId', movie.movieId)
                    ]
                );
                const { total: isReviewed, documents: review} = await databases.listDocuments(
                    String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
                    String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_REVIEW),
                    [
                        Query.equal('userId', userId),
                        Query.equal('movieId', movie.movieId),
                    ]
                );
                const movieWithDetails = {
                    ...movie,
                    details: movieDetails,
                    isLiked: isLiked ? true : false,
                    isRated: isRated ? true : false,
                    rating: isRated ? rating[0].rating : null,
                    isReviewed: isReviewed ? true : false,
                    review: isReviewed ? review[0].$id : null,
            };
            return movieWithDetails;
            })
        );
        return movies;
    } catch (error) {
      console.error(error);
    }
  }
  