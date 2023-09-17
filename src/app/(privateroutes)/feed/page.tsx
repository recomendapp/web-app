'use client';
import { Button } from '@/components/ui/button';
import { useUser } from '@/context/UserProvider';
import { databases } from '@/db/appwrite';
import { Models, Query } from 'appwrite';
import React, { useEffect, useState } from 'react';

export default function Feed() {
  const { user } = useUser();

  const [following, setFollowing] = useState<Models.Document[]>();

  const [feed, setFeed] = useState<any>();
  const [loading, setLoading] = useState(false);

  async function init() {
    getFollowing()
      .then(async (res) => {
        setFollowing(res);
        getFeed(res);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    user && init();
  }, [user]);

  async function getFeed(followingList: Models.Document[], offset?: string) {
    const { documents: lastLikes } = await databases.listDocuments(
      String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
      String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_LIKED),
      [
        Query.equal(
          'userId',
          followingList.map((user) => user.followeeId)
        ),
        Query.limit(2),
      ]
    );
    const playloadWatch = [
      Query.equal(
        'userId',
        followingList.map((user) => user.followeeId)
      ),
      Query.limit(2),
    ];
    if (offset) {
      playloadWatch.push(Query.lessThan('$createdAt', String(offset)));
    }
    const { documents: lastWatch } = await databases.listDocuments(
      String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
      String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_WATCHED),
      playloadWatch
    );

    const merge = [...lastLikes, ...lastWatch];

    merge.sort((a, b) => {
      const dateA = new Date(a.$createdAt).getTime();
      const dateB = new Date(b.$createdAt).getTime();
      return dateB - dateA;
    });

    console.log(merge);
    feed
      ? setFeed([...feed, ...merge.slice(0, 2)])
      : setFeed(merge.slice(0, 2));

    return;
  }

  async function getFollowing() {
    const { documents } = await databases.listDocuments(
      String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
      String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_FOLLOWER),
      [Query.equal('userId', user.$id)]
    );
    return documents;
  }

  // const loadNextActivities = async () => {
  //   setLoading(true);
  //   const lastNews = feed[feed.length - 1];

  //   // Remplacez fetchNextActivities par votre fonction pour charger les activités suivantes depuis le backend en utilisant une pagination
  //   const newFeed = await getFeed(lastNews.$createdAt);

  //   // Fusionnez les nouvelles activités avec celles déjà affichées dans le feed et triez-les par date
  //   const mergedActivities = [...feed, ...newFeed].sort(
  //     (a, b) => b.$createdAt - a.$createdAt
  //   );

  //   setFeed(mergedActivities);
  //   setLoading(false);
  // };

  return (
    <main className="flex flex-col items-center h-full">
      {feed ? (
        feed.map((item: any) => (
          <div key={item.label}>NEW : {item.$createdAt}</div>
        ))
      ) : (
        <div>PAS DE FEED</div>
      )}

      {following && (
        <Button
          onClick={() => getFeed(following, feed[feed.length - 1].$createdAt)}
        >
          Charger
        </Button>
      )}
      {/* ICI PROCHAINEMENT : FEED */}
    </main>
  );
}
