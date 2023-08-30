'use client';
import { databases } from '@/utils/appwrite';
import { Query } from 'appwrite';
import { Models } from 'appwrite/types/models';
import { useEffect, useState } from 'react';

export default function PlaylistItems({ playlist }: { playlist: any }) {
  const [playlistItems, setPlaylistItems] = useState<Models.Document[]>();
  console.log('playlistId', playlist);

  useEffect(() => {
    playlist &&
      databases
        .listDocuments(
          String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
          String(
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_PLAYLIST_ITEM
          ),
          [Query.equal('playlistId', playlist.$id)]
        )
        .then((response) => {
          setPlaylistItems(response.documents);
        });
  }, [playlist]);

  return (
    <div className="bg-red-500 p-4">
      {playlistItems &&
        playlistItems.map((movie) => (
          <div key={movie.$id}>{movie.movieId}</div>
        ))}
    </div>
  );
}
