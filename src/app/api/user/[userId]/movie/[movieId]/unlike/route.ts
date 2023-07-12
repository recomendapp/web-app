import { databases } from "@/utils/appwrite";
import { Query } from "appwrite";
import { NextResponse } from "next/server";

export const GET = async (req: Request, { params }: { params: { userId: string, movieId: number } }) => {
  const { userId, movieId } = params
  try {
    const { documents } = await databases.listDocuments(
      String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
      String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_LIKED),
      [
        Query.equal('userId', userId),
        Query.equal('movieId', Number(movieId)),
      ]
    );
    if(documents.length > 0) { 
      await databases.deleteDocument(
        String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS), 
        String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_LIKED), 
        documents[0].$id
      )
      return
    } else {
      return
    }
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      error: 'Erreur lors de l\'unlike',
    }, { status: 500 });
  }
};
  
  
  
  
  