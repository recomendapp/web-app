import { databases } from "@/utils/appwrite";
import { Query } from "appwrite";
import { NextResponse } from "next/server";

export const GET = async (req: Request, { params }: { params: { userId: string, movieId: number } }) => {
  const { userId, movieId } = params
  try {
    await databases.createDocument(
      String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS), 
      String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_LIKED), 
      'unique()', {
          "userId" : userId,
          "movieId" : movieId,
          "user": userId,
      }
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      error: 'Erreur lors du like',
    }, { status: 500 });
  }
};