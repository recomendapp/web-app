import USER_FRAGMENT from "@/context/AuthContext/fragments/userFragment";
import { gql } from "@apollo/client";

export default gql `
  mutation updateUserProfile(
    $id: UUID!,
    $full_name: String!,
    $bio: String!,
    $favorite_films: String!,
    $website: String!
    $avatar_url: String!
  ) {
    updateuserCollection(filter: { id: {eq: $id}}, set: {
      full_name: $full_name,
      bio: $bio,
      favorite_films: $favorite_films,
      website: $website,
      avatar_url: $avatar_url
    }) {
      records {
        ...User
      }
    }
  }
  ${USER_FRAGMENT}
`