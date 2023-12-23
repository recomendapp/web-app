import { gql } from "@apollo/client";
import USER_FRAGMENT from "@/context/AuthContext/fragments/userFragment";
import USER_MOVIE_REVIEW_FRAGMENT from "@/components/Review/fragments/reviewFragment";
export default gql`
    fragment UserMovieActivity on user_movie_activity {
        id
        created_at
		updated_at
        film_id
        user_id
		user {
			...User
		}
		is_liked
		rating
		date
		review: user_movie_review {
			...UserMovieReview
		}
    }
	${USER_FRAGMENT}
	${USER_MOVIE_REVIEW_FRAGMENT}
`