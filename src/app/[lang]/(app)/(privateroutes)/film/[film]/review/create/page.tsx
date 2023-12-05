import { notFound, redirect } from "next/navigation";
// import { createServerClient } from "@/lib/supabase/server";
import { getMovieDetails } from "@/lib/tmdb/tmdb";
import CreateReviewForm from "@/components/Review/form/CreateReviewFrom";
import { createServerClient } from "@/lib/supabase/server";

export async function generateMetadata({
    params,
}: {
    params: {
        lang: string;
        film: number;
    };
}) {
    const film = await getMovieDetails(params.film, params.lang);
    if (!film) {
        return {
        title: 'Oups, film introuvable !',
        };
    }

    return {
        title: `Ajouter une critique pour ${film.title}`,
    };
}

export default async function CreateReview({
    params
}: {
    params: {
        lang: string;
        film: number;
    }
}) {

    const supabase = createServerClient()

    const { data: { session } } = await supabase.auth.getSession();

    const { data: review } = await supabase.from('review').select('*, user(*)').eq('user_id', session?.user.id).eq('film_id', params.film).single();
    
    const { data: user } = await supabase.from('user').select('*').eq('id', session?.user.id).single();

    const film = await getMovieDetails(params.film, params.lang);

    if (!film) notFound();

    if(review)
        redirect(`/@${user.username}/film/${params.film}`);
    
    return (
        <CreateReviewForm film={film} user={user}/>
    )
}