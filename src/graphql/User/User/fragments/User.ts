import { gql } from '@apollo/client';
import SUBSCRIPTION_FRAGMENT from '@/graphql/User/Subscriptions/fragments/subscriptionFragment';

export default gql`
  fragment User on user {
    id
    created_at
    username
    username_updated_at
    full_name
    bio
    avatar_url
    background_url
    website
    language
    favorite_color
    followers_count
    following_count
    premium
    private
  }
  ${SUBSCRIPTION_FRAGMENT}
`;
