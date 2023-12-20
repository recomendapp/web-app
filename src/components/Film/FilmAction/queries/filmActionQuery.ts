import { gql } from "@apollo/client";
import FILM_WATCH_FRAGMENT from "@/components/Film/FilmAction/fragments/filmWatchFragment";
import FILM_LIKE_FRAGMENT from "@/components/Film/FilmAction/fragments/filmLikeFragment";
import FILM_RATING_FRAGMENT from "@/components/Film/FilmAction/fragments/filmRatingFragment";
import FILM_WATCHLIST_FRAGMENT from "@/components/Film/FilmAction/fragments/filmWatchlistFragment";
import REVIEW_FRAGMENT from "@/components/Review/fragments/reviewFragment";

export default gql`
    query FilmActionQuery($film_id: BigInt!, $user_id: UUID!) {
        watch: film_watchCollection(
            filter: {
                film_id: { eq: $film_id }
                user_id: { eq: $user_id }
            }
        ) {
            edges {
                watch: node {
                    ...FilmWatch
                }
            }
        }
        like: film_likeCollection(
            filter: {
                film_id: { eq: $film_id }
                user_id: { eq: $user_id }
            }
        ) {
            edges {
                like: node {
                    ...FilmLike
                }
            }
        }
        rating: film_ratingCollection(
            filter: {
                film_id: { eq: $film_id }
                user_id: { eq: $user_id }
            }
        ) {
            edges {
                rating: node {
                    ...FilmRating
                }
            }
        }
        watchlist: film_watchlistCollection(
            filter: {
                film_id: { eq: $film_id }
                user_id: { eq: $user_id }
            }
        ) {
            edges {
                watchlist: node {
                    ...FilmWatchlist
                }
            }
        }
        review: reviewCollection(
            filter: {
                film_id: { eq: $film_id }
                user_id: { eq: $user_id }
            }
        ) {
            edges {
                review: node {
                    ...Review
                }
            }
        }
    }
    ${FILM_WATCH_FRAGMENT}
    ${FILM_LIKE_FRAGMENT}
    ${FILM_RATING_FRAGMENT}
    ${FILM_WATCHLIST_FRAGMENT}
    ${REVIEW_FRAGMENT}
`