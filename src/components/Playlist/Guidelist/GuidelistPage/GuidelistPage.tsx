'use client';

import { TableGuidelist } from '../table/TableGuidelist';
import { GuidelistHeader } from './components/GuidelistHeader';
import { useAuth } from '@/context/AuthContext/auth-context';
import { Guidelist } from '@/types/type.guidelist';
import { useLocale } from 'next-intl';

// GRAPHQL
import { useQuery } from '@apollo/client';
import GET_USER_MOVIE_GUIDELIST_BY_USER_ID from '@/graphql/User/Movie/Guidelist/queries/GetUserMovieGuidelistByUserId';
import { GetUserMovieGuidelistByUserIdQuery } from '@/graphql/__generated__/graphql';

export function GuidelistPage() {
  const { user } = useAuth();
  const locale = useLocale();

  const {
    data: guidelistQuery,
    loading,
    error,
  } = useQuery<GetUserMovieGuidelistByUserIdQuery>(GET_USER_MOVIE_GUIDELIST_BY_USER_ID, {
    variables: {
      user_id: user?.id,
      locale: locale,
    },
    skip: !user || !locale,
  });
  const guidelist = guidelistQuery?.user_movie_guidelistCollection?.edges;

  if (!guidelist) return null;

  return (
    <main className="h-full">
      <GuidelistHeader guidelist={guidelist} />
      <div className="p-4">
        <TableGuidelist guidelist={guidelist} />
      </div>
    </main>
  );
}
