import { databases } from "@/db/appwrite";
import { Query } from "appwrite";
import { QueryClient } from "react-query";
import { toast } from "react-toastify";

export const getReview = async (reviewId: string) => {
  try {
    return await databases.getDocument(
      String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
      String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_REVIEW),
      reviewId
    );
  } catch (error) {
    return ;
  }
};

export const getReviews = async (movieId: string, order: string) => {
  try {
    const payload = [
      Query.equal("movieId", movieId),
      Query.limit(10),
      // Query.offset(offset)
    ]
    switch (order) {
      case "recommended":
        payload.push(Query.orderDesc("views_count"));
        break;
      case "recent":
        payload.push(Query.orderDesc("$updatedAt"));
        break;
      case "rating-desc":
        payload.push(Query.orderDesc("movie_rating"));
        break;
      case "rating-asc":
        payload.push(Query.orderAsc("movie_rating"));
        break;
    }
    const { documents } = await databases.listDocuments(
      String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
      String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_REVIEW),
      payload
    );

    return (documents)
  } catch(error) {
    console.error(error);
}
};

export const handleDeleteReview = async (reviewId: string, userId: string, movieId:number, queryClient: QueryClient) => {
  try {
    await databases.deleteDocument(
      String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
      String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_REVIEW),
      reviewId
    );
    queryClient.setQueryData(['movie', movieId, 'review', userId], null);
    
    queryClient.invalidateQueries(['movie', movieId, 'reviews', 'recommended']);
    queryClient.invalidateQueries(['movie', movieId, 'reviews', 'recent']);
    queryClient.invalidateQueries(['movie', movieId, 'reviews', 'rating-desc']);
    queryClient.invalidateQueries(['movie', movieId, 'reviews', 'rating-asc']);
    toast.success(
      'Votre critique a été supprimé avec succès'
    );
  } catch (error) {
    toast.error(
      'Une erreur s\'est produite'
    );
    return ;
  }
}

export const handleUpdateReview = async (reviewId: string, title: string, body: string) => {
  try {
    await databases.updateDocument(
      String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
      String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_REVIEW),
      reviewId,
      {
        title: title,
        body: body
      }
    );
  } catch (error) {
    console.error(error)
  }
}

export const getReviewFromUser = async (userId: string, movieId: number) => {
  try {
    const { documents } = await databases.listDocuments(
      String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
      String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_REVIEW),
      [
        Query.equal("userId", userId),
        Query.equal("movieId", movieId),
      ]
    );
    return (documents[0]);
  } catch (error) {
    console.error(error);
  }
};