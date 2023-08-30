import { useUser } from '@/context/user';
import { databases } from '@/utils/appwrite';
import { Query } from 'appwrite';
import { useEffect } from 'react';

import { Novu } from '@novu/node';
import { Button } from './ui/button';

export default function TMP() {
  async function TMDB() {
    const novu = new Novu(String(process.env.NEXT_PUBLIC_NOVU_API_KEY));
    const upcomingMovie = (
      await (
        await fetch(
          `${process.env.NEXT_PUBLIC_TMDB_API_URL}movie/upcoming?api_key=${
            process.env.NEXT_PUBLIC_TMDB_API_KEY
          }&language=${'fr-FR'}&region=${'FR'}&append_to_response=credits`
        )
      ).json()
    ).results;
    console.log('upcomingMovie', upcomingMovie);
    upcomingMovie.map(async (movie: any) => {
      const tmp = await (
        await fetch(
          `${process.env.NEXT_PUBLIC_TMDB_API_URL}movie/${movie.id}/credits?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        )
      ).json();
      const tmp2 = await tmp.cast.concat(tmp.crew);
      const credits = new Map();
      await tmp2.forEach((credit: any) => {
        credits.set(credit.id, credit);
      });
      credits.forEach(async (person: any, id: number) => {
        const { total, documents } = await databases.listDocuments(
          String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
          String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_PERSON_FOLLOWER),
          [Query.equal('personId', id)]
        );
        if (total) {
          documents.map(async (user) => {
            try {
              // await databases.createDocument(
              //     String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
              //     "64c52aad4f6ea9a59212",
              //     "unique()",
              //     {
              //         "movieId": movie.id,
              //         "personId": person.id,
              //         "userId": user.userId

              //     }
              // )
              await novu.trigger('person_upcoming_movie', {
                to: {
                  subscriberId: user.userId,
                },
                payload: {
                  message: `${person.name} sort un film prochainement nommé ${movie.title}`,
                },
              });
              console.log('NOTIFICATION SENT');
            } catch (error) {
              console.log('NOTIFICATION ALREADY SENT', error);
            }
            // console.log("Salut " + user.userId + ", " + person.name + " sort un film prochainement nommé " + movie.title)
          });
        }
      });
    });
  }

  return (
    <Button onClick={TMDB} variant={'destructive'}>
      CHECK
    </Button>
  );
}
