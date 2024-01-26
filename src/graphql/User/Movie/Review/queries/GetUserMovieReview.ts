import { gql } from "@apollo/client";
import USER_MOVIE_REVIEW_FRAGMENT from "@/graphql/User/Movie/Review/fragments/UserMovieReview";
import USER_MOVIE_ACTIVITY_FRAGMENT from "@/graphql/User/Movie/Activity/fragments/UserMovieActivity";

export default gql`
	query GetUserMovieReview(
		$filter: user_movie_reviewFilter!
		$locale: String!
	) {
		user_movie_reviewCollection(
			filter: $filter
		) {
			edges {
				node {
					...UserMovieReview
					activity: user_movie_activity {
						...UserMovieActivity
					}
				}
			}
		}
	}
	${USER_MOVIE_REVIEW_FRAGMENT}
	${USER_MOVIE_ACTIVITY_FRAGMENT}
`;