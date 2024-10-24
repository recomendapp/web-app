
import { WidgetMoviesMostRecommended } from '@/components/Widget/WidgetMoviesMostRecommended';
import { WidgetUserMovieGuidelist } from '@/components/Widget/WidgetUserMovieGuidelist';
import { createServerClient } from '@/lib/supabase/server';
import { WidgetUserMovieWatchlist } from '@/components/Widget/WidgetUserMovieWatchlist';
import { Hello } from '@/components/Dashboard/Hello';

export default async function Home() {
  const supabase = createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <div className='p-4 gap-4 grid grid-cols-1 @4xl/main:grid-cols-2'>
      {user ? <Hello /> : null}
      <WidgetMoviesMostRecommended isLogged={!!user} className='col-span-full' />
      {user ? <WidgetUserMovieGuidelist /> : null}
      {user ? <WidgetUserMovieWatchlist /> : null}

    </div>
  );
}
