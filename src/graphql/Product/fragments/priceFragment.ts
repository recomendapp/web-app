import { gql } from '@apollo/client';
import PRODUCT_FRAGMENT from './productFragment';

export default gql`
  fragment Price on prices {
    id
    product_id
    active
    description
    unit_amount
    currency
    type
    interval
    interval_count
    trial_period_days
    metadata
    products {
      ...Product
    }
  }
  ${PRODUCT_FRAGMENT}
`;
