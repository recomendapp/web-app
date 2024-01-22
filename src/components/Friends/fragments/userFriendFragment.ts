import { gql } from '@apollo/client';

import USER_FRAGMENT from '@/graphql/User/User/fragments/User';

export default gql`
  fragment UserFriend on user_friend {
    friend_id
    friend: user {
      ...User
    }
    user_id
  }
  ${USER_FRAGMENT}
`;
