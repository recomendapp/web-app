import { gql } from "@apollo/client";
import GUIDELIST_FRAGMENT from "@/components/modules/MovieGuidelist/fragments/guidelistFragment";

export default gql`
    query GuidelistQuery($user_id: UUID!){
        guidelistCollection(filter: { receiver_user_id: { eq: $user_id }}) {
            edges {
                item: node {
                    ...Guidelist
                }
            }
        }
    }
    ${GUIDELIST_FRAGMENT}
`