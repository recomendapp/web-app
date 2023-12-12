import { gql } from "@apollo/client";
import USER_FRAGMENT from "@/context/AuthContext/fragments/userFragment";

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
    }
	${USER_FRAGMENT}
`