import { gql } from '@apollo/client';
import SUBSCRIPTION_FRAGMENT from '@/graphql/User/Subscriptions/fragments/subscriptionFragment';

export default gql`
  fragment UserMinimal on user {
    id
    username
    full_name
    bio
    avatar_url
    background_url
    language
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
