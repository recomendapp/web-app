import { gql } from '@apollo/client';
import SUBSCRIPTION_FRAGMENT from '@/graphql/User/Subscriptions/fragments/subscriptionFragment';

export default gql`
  fragment User on user {
    id
    updated_at
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
    friends_count
    verified
    subscriptions: subscriptionsCollection(filter: { status: { eq: active } }) {
      edges {
        node {
          ...Subscription
        }
      }
    }
  }
  ${SUBSCRIPTION_FRAGMENT}
`;
