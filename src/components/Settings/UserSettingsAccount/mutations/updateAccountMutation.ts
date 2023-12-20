import USER_FRAGMENT from "@/context/AuthContext/fragments/userFragment";
import { gql } from "@apollo/client";

export default gql `
  mutation updateUserAccount(
    $id: UUID!,
    $username: String!,
    $username_updated_at: timestamptz!
  ) {
    updateuserCollection(filter: { id: {eq: $id}}, set: {
      username: $username,
      username_updated_at: $username_updated_at
    }) {
      records {
        ...User
      }
    }
  }
  ${USER_FRAGMENT}
`