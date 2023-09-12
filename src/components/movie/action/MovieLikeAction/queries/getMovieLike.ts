import { gql } from "@apollo/client";

export const GET_MOVIE_LIKE = gql`
query GetLikeState($queries: [String!]!) {
  like: databasesListDocuments(
    databaseId: "${String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS)}",
    collectionId: "${String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_LIKED)}",
    queries: $queries
  ) {
    documents {
      _id
    }
  }
}
`;