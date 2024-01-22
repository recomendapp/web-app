import { gql } from '@apollo/client';
import PRICE_FRAGMENT from '../../../Product/fragments/priceFragment';

export default gql`
  fragment Subscription on subscriptions {
    id
    user_id
    status
    prices {
      ...Price
    }
  }
  ${PRICE_FRAGMENT}
`;
