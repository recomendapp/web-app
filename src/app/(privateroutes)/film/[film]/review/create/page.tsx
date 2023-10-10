import { redirect } from "next/navigation";
import CreateReviewForm from "../../../../../../components/Review/form/CreateReviewFrom";
import { createServerClient } from "@/lib/supabase/supabase-server";
import { getMovieDetails } from "@/lib/tmdb";

export async function generateMetadata({
    params,
}: {
    params: { film: string };
}) {
    const film = await getMovieDetails(params.film, 'fr-FR');
    if (!film) {
        return {
        title: 'Oups, film introuvable !',
        };
    }

    return {
        title: `Ajouter une critique pour ${film.title}`,
    };
}

export default async function CreateReview({ params }: { params: { film: string } }) {

    const supabaseServer = createServerClient()

    const { data: { session } } = await supabaseServer.auth.getSession();

    const { data: review } = await supabaseServer.from('review').select('*').eq('user_id', session?.user.id).eq('film_id', params.film).single();
    
    const { data: user } = await supabaseServer.from('user').select('*').eq('id', session?.user.id).single();

    if(review)
        redirect(`/@${user.username}/film/${params.film}`);
    
    return (
        <div className="p-4">
            <CreateReviewForm filmId={params.film} user={user}/>
        </div>
    )
}