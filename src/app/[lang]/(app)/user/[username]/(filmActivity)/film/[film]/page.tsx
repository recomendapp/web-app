import { notFound } from 'next/navigation';
import { createServerClient } from '@/lib/supabase/server';
import ProfileMovieActivity from '@/components/Profile/ProfileMovieActivity/ProfileMovieActivity';

export default async function Review({
  params,
}: {
  params: {
    lang: string;
    username: string;
    film: string;
  };
}) {

  const supabase = createServerClient();

  const { data: user } = await supabase
    .from('user')
    .select('*')
    .eq('username', params.username)
    .single();

  if (!user) return notFound();

  return (<ProfileMovieActivity movieId={params.film} userId={user.id} />)

  // return (
  //   <div className="flex flex-col lg:flex-row gap-4 p-4">
  //       {/* <div className="bg-muted h-fit w-[500px] p-4 rounded-md">
  //         {activity?.movie && <MovieCard movie={activity?.movie} />}
  //       </div> */}
  //       <div className="w-full bg-muted h-fit p-4 rounded-md">
  //         {activity?.review && <MovieReviewForm review={activity?.review} />}
  //       </div>
  //   </div>
  // );
}
