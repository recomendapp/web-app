import { databases } from "@/db/appwrite";
import { Query } from "appwrite";

export default async function getPlaylistsFromUserId(userId: string) {
    try {
      const { documents } = await databases.listDocuments(
        String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
        String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_PLAYLIST),
        [
            Query.equal('is_public', true),
            Query.equal('userId', userId)
        ]
      );
  
      return documents;
    } catch (error) {
      console.error(error);
    }
  }
  