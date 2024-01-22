import { gql } from "@apollo/client";
import USER_MOVIE_REVIEW_FRAGMENT from "@/graphql/User/Movie/Review/fragments/UserMovieReview";

export default gql`
	query GetUserMovieReview(
		$filter: user_movie_reviewFilter!
	) {
		user_movie_reviewCollection {
			edges {
				node {
					...UserMovieReview
				}
			}
		}
	}
	${USER_MOVIE_REVIEW_FRAGMENT}
`;