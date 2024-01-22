import { gql } from '@apollo/client';
import TMDB_MOVIE_CREDIT_FRAGMENT from '@/graphql/Movie/fragments/tmdb_movie/tmdbMovieCreditFragment';

export default gql`
  query GetMovieCasting($movieId: BigInt!, $first: Int!, $after: Cursor!, $locale: String!) {
    tmdb_movie_creditsCollection(
		filter: {
			movie_id: { eq: $movieId }
			job: { eq: "Actor" }
		}
		first: $first,
		after: $after
	) {
		pageInfo {
			hasNextPage
			hasPreviousPage
			endCursor
		}
      	edges {
			node {
				...TmdbMovieCredit
			}
      	}
    }
  }
  ${TMDB_MOVIE_CREDIT_FRAGMENT}
`;
