import { gql } from "@apollo/client";
import GUIDELIST_FRAGMENT from "@/components/modules/MovieGuidelist/fragments/guidelistFragment";

export default gql `
  mutation insertGuidelist(
    $film_id: BigInt!
    $receiver_user_id: UUID!
    $sender_user_id: UUI!
    $comment: String
  ) {
    insertIntoguidelistCollection(
      objects: {
        film_id: $film_id
        receiver_user_id: $receiver_user_id
        sender_user_id: $sender_user_id
        comment: $comment
      }
    ) {
      records {
        ...Guidelist
      }
    }
  }
  ${GUIDELIST_FRAGMENT}
`