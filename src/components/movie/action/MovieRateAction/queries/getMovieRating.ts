import { gql } from "@apollo/client";

export const GET_RATING_STATE = gql`
  query GetRatingState($queries: [String!]!) {
    rating: databasesListDocuments(
      databaseId: "${process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS}",
      collectionId: "${process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_RATED}",
      queries: $queries
      ) {
      documents {
        _id
      }
    }
  }
`;