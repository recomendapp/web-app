import { gql } from "@apollo/client";
import PRICE_FRAGMENT from "./priceFragment";

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
`