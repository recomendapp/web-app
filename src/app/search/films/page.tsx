import SearchFilmsFull from "@/components/Search/SearchFilms/SearchFilmsFull";
import { redirect } from "next/navigation";

export async function generateMetadata({
    searchParams,
  }: {
    searchParams: {
      q: string | undefined,
    };
  }) {
    return {
      title: `${searchParams.q} - Films`,
    };
}

export default function SearchFilms({
    searchParams
} : {
    searchParams?: {
        q: string,
    }
}) {
  console.log('yooooo')
    if (!searchParams?.q)
        redirect('/search')
    return (
        <SearchFilmsFull
            query={searchParams?.q}
        />
    )
}