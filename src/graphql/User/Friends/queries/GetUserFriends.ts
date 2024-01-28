import { gql } from '@apollo/client';
import USER_MINIMAL_FRAGMENT from '@/graphql/User/User/fragments/UserMinimal';

export default gql`
  query GetUserFriends($user_id: UUID!) {
    user_friendCollection(
      filter: {
        user_id: { eq: $user_id }
      }
    ) {
      edges {
        node {
          friend_id
          friend: user {
            ...UserMinimal
          }
        }
      }
    }
  }
  ${USER_MINIMAL_FRAGMENT}
`;
