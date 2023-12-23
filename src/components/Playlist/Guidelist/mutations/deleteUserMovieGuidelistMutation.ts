import { gql } from "@apollo/client";
import USER_MOVIE_GUIDELIST_FRAGMENT from "@/components/Playlist/Guidelist/fragments/userMovieGuidelistFragment";

export default gql `
  mutation deleteUserMovieGuidelist(
    $id: BigInt!,
  ) {
    deleteFromuser_movie_guidelistCollection(
      filter: {
        id: { eq: $id }
      }
    ) {
      records {
        ...UserMovieGuidelist
      }
    }
  }
  ${USER_MOVIE_GUIDELIST_FRAGMENT}
`