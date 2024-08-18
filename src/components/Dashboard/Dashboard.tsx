'use client';

import { useAuth } from '@/context/auth-context';
import Loader from '@/components/Loader/Loader';
import { useTranslations } from 'next-intl';

// WIDGETS
import { UserMovieGuidelistWidget } from '@/components/Widget/UserMovieGuidelistWidget';
import { UserMovieWatchlistWidget } from '@/components/Widget/UserMovieWatchlistWidget';
import { MovieNowPlayingWidget } from '../Widget/MovieNowPlayingWidget/MovieNowPlayingWidget';
import { MovieUpcomingWidget } from '../Widget/MovieUpcomingWidget/MovieUpcomingWidget';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const t = useTranslations('word');

  if (!user || loading) return <Loader />;
  return (
    <main className="flex flex-col gap-2 p-4">
      <div className="text-4xl font-bold">
        {t('hello')} {user.full_name}
      </div>
      <UserMovieGuidelistWidget />
      <UserMovieWatchlistWidget />
      {/* <MovieNowPlayingWidget /> */}
      {/* <MovieUpcomingWidget /> */}
    </main>
  );
}
