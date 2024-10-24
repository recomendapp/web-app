import { gql } from '@apollo/client';
import SUBSCRIPTION_FRAGMENT from '@/graphql/User/Subscriptions/fragments/subscriptionFragment';

export const PersonFragment = gql`
  fragment PersonFragment on person {
    id
    name
    profile_path
    known_for_department
  }
`;
