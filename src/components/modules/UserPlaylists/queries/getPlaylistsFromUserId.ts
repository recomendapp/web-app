import { databases } from "@/db/appwrite";
import { Query } from "appwrite";

export default async function getPlaylistsFromUserId(userId: string, page: number, numberOfResult: number, sort: string) {
    try {
      const payload = [
        Query.equal('userId', userId),
        Query.equal('is_public', true),
        Query.limit(numberOfResult),
        Query.offset(numberOfResult * (page - 1)),
      ]
      switch (sort) {
        case "recent":
          payload.push(Query.orderDesc("$createdAt"));
          break;
        case "popular":
          payload.push(Query.orderDesc("likes_count"));
          break;
      }
      const { documents } = await databases.listDocuments(
        String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
        String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_PLAYLIST),
        payload
      );
  
      return documents;
    } catch (error) {
      console.error(error);
    }
  }
  