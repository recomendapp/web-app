import { redirect } from "next/navigation";
import SearchUsersFull from "@/components/Search/SearchUsers/SearchUsersFull";

export async function generateMetadata({
    searchParams,
  }: {
    searchParams: {
      q: string | undefined,
    };
  }) {
    return {
      title: `${searchParams.q} - Utilisateurs`,
    };
}

export default function SearchFilms({
    searchParams
} : {
    searchParams?: {
        q: string,
    }
}) {
    if (!searchParams?.q)
        redirect('/search')
    return (
        <SearchUsersFull
            query={searchParams?.q}
        />
    )
}