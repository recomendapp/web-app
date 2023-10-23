import { gql } from "@apollo/client";
import GUIDELIST_FRAGMENT from "@/components/modules/MovieGuidelist/fragments/guidelistFragment";

export default gql `
  mutation deleteGuidelistItem(
    $id: BigInt!,
  ) {
    deleteFromguidelistCollection(
      filter: {
        id: { eq: $id }
      }
    ) {
      records {
        ...Guidelist
      }
    }
  }
  ${GUIDELIST_FRAGMENT}
`