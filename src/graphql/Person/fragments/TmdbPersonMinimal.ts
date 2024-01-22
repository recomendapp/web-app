import { gql } from '@apollo/client';
import SUBSCRIPTION_FRAGMENT from '@/graphql/User/Subscriptions/fragments/subscriptionFragment';

export default gql`
  fragment TmdbPersonMinimal on tmdb_person {
    id
    name
    profile_path
    known_for_department
  }
`;
