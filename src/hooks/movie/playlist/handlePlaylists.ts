import { databases } from "@/utils/appwrite"
import { Query } from "appwrite"

export default async function handlePlaylists(userId: string) {
    try {
      const { documents } = await databases.listDocuments(
        String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
        String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_PLAYLIST),
        [
          Query.limit(25),
          Query.equal('userId', userId)
        ]
      )
      
      return documents

    } catch (error) {
      console.error(error)
    }
  }