import { gql } from "@apollo/client";
import FILM_ACTION_FRAGMENT from "@/components/modules/MovieAction/fragments/filmActionFragment";

export default gql `
  mutation deleteFilmAction(
    $film_id: BigInt!,
    $user_id: UUID!,
  ) {
    deleteFromfilm_actionCollection(filter: {
      film_id: { eq: $film_id },
      user_id: { eq: $user_id }
    }){
      records {
        ...FilmAction
      }
    }
  }
  ${FILM_ACTION_FRAGMENT}
`