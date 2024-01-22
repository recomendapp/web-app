import USER_FRAGMENT from '@/graphql/User/User/fragments/User';
import { gql } from '@apollo/client';

export default gql`
  mutation updateUserProfile(
    $id: UUID!
    $full_name: String!
    $bio: String!
    $favorite_films: [BigInt]
    $website: String!
    $avatar_url: String!
  ) {
    updateuserCollection(
      filter: { id: { eq: $id } }
      set: {
        full_name: $full_name
        bio: $bio
        favorite_films: $favorite_films
        website: $website
        avatar_url: $avatar_url
      }
    ) {
      records {
        ...User
      }
    }
  }
  ${USER_FRAGMENT}
`;
