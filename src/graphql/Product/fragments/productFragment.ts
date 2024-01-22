import { gql } from '@apollo/client';

export default gql`
  fragment Product on products {
    id
    active
    name
    description
    image
    metadata
  }
`;
