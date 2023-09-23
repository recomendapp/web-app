import { databases } from '@/lib/appwrite';
import { Query } from 'appwrite';

export async function handleIsMovieLiked(userId: string, movieId: number) {
  try {
    const { documents } = await await databases.listDocuments(
      String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
      String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_LIKED),
      [Query.equal('userId', userId), Query.equal('movieId', movieId)]
    );
    if (documents.length > 0) {
      return {
        status: true,
        id: documents[0].$id,
      };
    } else {
      return {
        status: false,
        id: null,
      };
    }
  } catch (error) {
    return {
      status: false,
      id: null,
    };
  }
}

export async function handleIsMovieWatched(userId: string, movieId: number) {
  try {
    const { documents } = await await databases.listDocuments(
      String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
      String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_WATCHED),
      [Query.equal('userId', userId), Query.equal('movieId', movieId)]
    );
    if (documents.length > 0) {
      return {
        id: documents[0].$id,
        status: true,
        date: documents[0].date,
      };
    } else {
      return {
        id: '',
        status: false,
        date: null,
      };
    }
  } catch (error) {
    return {
      id: '',
      status: false,
      date: null,
    };
  }
}

export async function handleIsMovieRated(userId: string, movieId: number) {
  try {
    const { documents } = await await databases.listDocuments(
      String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
      String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_RATED),
      [Query.equal('userId', userId), Query.equal('movieId', movieId)]
    );
    if (documents.length > 0) {
      return {
        id: documents[0].$id,
        status: true,
        rating: documents[0].rating,
      };
    } else {
      return {
        id: '',
        status: false,
        rating: null,
      };
    }
  } catch (error) {
    return {
      id: '',
      status: false,
      rating: null,
    };
  }
}

export async function handleIsMovieWatchlisted(
  userId: string,
  movieId: number
) {
  try {
    const { documents } = await await databases.listDocuments(
      String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
      String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_WATCHLISTED),
      [Query.equal('userId', userId), Query.equal('movieId', movieId)]
    );
    if (documents.length > 0) {
      return {
        status: true,
        id: documents[0].$id,
      };
    } else {
      return {
        status: false,
        id: null,
      };
    }
  } catch (error) {
    return {
      status: false,
      id: null,
    };
  }
}
