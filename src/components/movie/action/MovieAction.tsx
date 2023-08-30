import { useEffect, useState } from 'react';
import { databases, graphql } from '@/utils/appwrite';

import { MovieLikeAction } from './MovieLikeAction';
import { MovieWatchAction } from './MovieWatchAction';
import { MovieRateAction } from './MovieRateAction';
import { MovieWatchDateAction } from './MovieWatchDateAction';

import {
  handleIsMovieLiked,
  handleIsMovieWatched,
  handleIsMovieRated,
  handleIsMovieWatchlisted,
} from '@/hooks/action/movie';
import { MovieWatchlistAction } from './MovieWatchlistAction';
import { MoviePlaylistAction } from './MoviePlaylistAction';
import { MovieSendAction } from './MovieSendAction';
import { Query } from 'appwrite';

export function MovieAction({
  movieId,
  userId,
}: {
  movieId: number;
  userId: string;
}) {
  const [isLiked, setIsLiked] = useState<boolean | null>(null);
  const [isLikedId, setIsLikedId] = useState<string | null>(null); // APPWRITE DOCUMENT ID
  const [isWatched, setIsWatched] = useState<boolean | null>(null);
  const [isWatchedId, setIsWatchedId] = useState<string | null>(null); // APPWRITE DOCUMENT ID
  const [watchedDate, setWatchedDate] = useState<Date | null>(null);
  const [isRated, setIsRated] = useState<number | null>(null);
  const [isRatedId, setIsRatedId] = useState<string | null>(null); // APPWRITE DOCUMENT ID
  const [isWatchlisted, setIsWatchlisted] = useState<boolean | null>(null);
  const [isWatchlistedId, setIsWatchlistedId] = useState<string | null>(null); // APPWRITE DOCUMENT ID

  useEffect(() => {
    if (userId && movieId) {
      init();
    }
  }, [userId, movieId]);

  const init = async () => {
    try {
      const q = (await graphql.query({
        query: `
                        query GetAction {
                            like: databasesListDocuments(
                                databaseId: "${String(
                                  process.env
                                    .NEXT_PUBLIC_APPWRITE_DATABASE_USERS
                                )}",
                                collectionId: "${String(
                                  process.env
                                    .NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_LIKED
                                )}",
                                queries: ["equal('userId', ${userId})", "equal('movieId', ${movieId})"]
                            ) {
                                documents {
                                    _id
                                }
                            }
                            watch: databasesListDocuments(
                                databaseId: "${String(
                                  process.env
                                    .NEXT_PUBLIC_APPWRITE_DATABASE_USERS
                                )}",
                                collectionId: "${String(
                                  process.env
                                    .NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_WATCHED
                                )}",
                                queries: ["equal('userId', ${userId})", "equal('movieId', ${movieId})"]
                            ) {
                                documents {
                                    _id
                                    data
                                }
                            }
                            rating: databasesListDocuments(
                                databaseId: "${String(
                                  process.env
                                    .NEXT_PUBLIC_APPWRITE_DATABASE_USERS
                                )}",
                                collectionId: "${String(
                                  process.env
                                    .NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_RATED
                                )}",
                                queries: ["equal('userId', ${userId})", "equal('movieId', ${movieId})"]
                            ) {
                                documents {
                                    _id
                                    data
                                }
                            }
                            watchlist: databasesListDocuments(
                                databaseId: "${String(
                                  process.env
                                    .NEXT_PUBLIC_APPWRITE_DATABASE_USERS
                                )}",
                                collectionId: "${String(
                                  process.env
                                    .NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_WATCHLISTED
                                )}",
                                queries: ["equal('userId', ${userId})", "equal('movieId', ${movieId})"]
                            ) {
                                documents {
                                    _id
                                    
                                }
                            }
                        }
                    `,
      })) as { data: any };

      // LIKE
      if (q.data.like.documents.length) {
        setIsLiked(true);
        setIsLikedId(q.data.like.documents[0]._id);
      } else {
        setIsLiked(false);
        setIsLikedId(null);
      }
      // WATCH
      if (q.data.watch.documents.length) {
        setIsWatched(true);
        setWatchedDate(
          new Date(JSON.parse(q.data.watch.documents[0].data).date)
        );
        setIsWatchedId(q.data.watch.documents[0]._id);
      } else {
        setIsWatched(false);
        setWatchedDate(null);
        setIsWatchedId(null);
      }
      // RATING
      if (q.data.rating.documents.length) {
        setIsRated(JSON.parse(q.data.rating.documents[0].data).rating);
        setIsRatedId(q.data.rating.documents[0]._id);
      } else {
        setIsRated(null);
        setIsRatedId(null);
      }
      // WATCHLIST
      if (q.data.watchlist.documents.length) {
        setIsWatchlisted(true);
        setIsWatchlistedId(q.data.watchlist.documents[0]._id);
      } else {
        setIsWatchlisted(false);
        setIsWatchlistedId(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const reset = async () => {
    isLiked && (await handleUnlike());
    isRated && (await handleUnrate());
    return;
  };

  const handleLike = async () => {
    const { $id } = await databases.createDocument(
      String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
      String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_LIKED),
      'unique()',
      {
        userId: userId,
        movieId: movieId,
        user: userId,
      }
    );
    setIsLiked((current) => !current);
    setIsLikedId($id);

    !isWatched && (await handleWatch());

    return;
  };

  const handleUnlike = async () => {
    isLikedId &&
      (await databases.deleteDocument(
        String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
        String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_LIKED),
        isLikedId
      ));
    setIsLiked((current) => !current);
    setIsLikedId(null);

    return;
  };

  const handleWatch = async () => {
    const { $id, date } = await databases.createDocument(
      String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
      String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_WATCHED),
      'unique()',
      {
        userId: userId,
        movieId: movieId,
        user: userId,
        date: new Date(),
      }
    );
    setIsWatched((current) => !current);
    setIsWatchedId($id);
    setWatchedDate(new Date(date));

    isWatchlisted && (await handleUnwatchlist());
    await handleDeleteGuidelist();

    return;
  };

  const handleUnwatch = async () => {
    isWatchedId &&
      (await databases.deleteDocument(
        String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
        String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_WATCHED),
        isWatchedId
      ));
    setIsWatched((current) => !current);
    setIsWatchedId(null);
    setWatchedDate(null);

    await reset();
    return;
  };

  const handleUpdateDate = async (date: Date) => {
    isWatchedId &&
      (await databases.updateDocument(
        String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
        String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_WATCHED),
        isWatchedId,
        {
          date: date,
        }
      ));
    setWatchedDate(date);

    return;
  };

  const handleRate = async (ratingTMP: Number) => {
    if (isRated && isRatedId) {
      await handleUpdateRate(ratingTMP);
      return;
    } else {
      const { $id, rating } = await databases.createDocument(
        String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
        String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_RATED),
        'unique()',
        {
          userId: userId,
          movieId: movieId,
          user: userId,
          rating: ratingTMP,
        }
      );
      setIsRated(rating);
      setIsRatedId($id);

      !isWatched && (await handleWatch());

      return;
    }
  };

  const handleUpdateRate = async (ratingTMP: Number) => {
    isRatedId &&
      (await databases.deleteDocument(
        String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
        String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_RATED),
        isRatedId
      ));
    const { $id, rating } = await databases.createDocument(
      String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
      String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_RATED),
      'unique()',
      {
        userId: userId,
        movieId: movieId,
        user: userId,
        rating: ratingTMP,
      }
    );
    setIsRated(rating);
    setIsRatedId($id);
    return;
  };

  const handleUnrate = async () => {
    isRatedId &&
      (await databases.deleteDocument(
        String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
        String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_RATED),
        isRatedId
      ));
    setIsRated(null);
    setIsRatedId(null);
    return;
  };

  const handleWatchlist = async () => {
    const { $id } = await databases.createDocument(
      String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
      String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_WATCHLISTED),
      'unique()',
      {
        userId: userId,
        movieId: movieId,
        user: userId,
      }
    );
    setIsWatchlisted((current) => !current);
    setIsWatchlistedId($id);

    return;
  };

  const handleUnwatchlist = async () => {
    isWatchlistedId &&
      (await databases.deleteDocument(
        String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
        String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_WATCHLISTED),
        isWatchlistedId
      ));
    setIsWatchlisted((current) => !current);
    setIsWatchlistedId(null);

    return;
  };

  const handleDeleteGuidelist = async () => {
    const { documents } = await databases.listDocuments(
      String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
      String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_GUIDELISTED),
      [Query.equal('movieId', movieId), Query.equal('userId', userId)]
    );
    if (documents.length > 0) {
      await databases.deleteDocument(
        String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
        String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_GUIDELISTED),
        documents[0].$id
      );
      return;
    } else {
      return;
    }
  };

  return (
    <div className="flex justify-between gap-4">
      <div className='flex gap-4'>
        <MovieRateAction
          userId={userId}
          movieId={movieId}
          isRated={isRated}
          handleRate={handleRate}
          handleUnrate={handleUnrate}
        />
        <MovieLikeAction
          userId={userId}
          movieId={movieId}
          isLiked={isLiked}
          handleLike={handleLike}
          handleUnlike={handleUnlike}
        />
        <MovieWatchAction
          userId={userId}
          movieId={movieId}
          isWatched={isWatched}
          handleWatch={handleWatch}
          handleUnwatch={handleUnwatch}
        />
        <MovieWatchlistAction
          userId={userId}
          movieId={movieId}
          isWatchlisted={isWatchlisted}
          handleWatchlist={handleWatchlist}
          handleUnwatchlist={handleUnwatchlist}
          isWatched={isWatched}
        />
        {isWatched && watchedDate && (
          <MovieWatchDateAction
            userId={userId}
            movieId={movieId}
            date={watchedDate}
            handleUpdateDate={handleUpdateDate}
          />
        )}
      </div>
      <div className='flex gap-4'>
        <MoviePlaylistAction userId={userId} movieId={movieId} />
        <MovieSendAction userId={userId} movieId={movieId} />
      </div>
    </div>
  );
}
