import MovieCard from '@/components/Movie/Card/MovieCard';
import { User } from '@/types/type.db';
import { upperFirst } from 'lodash';
import { useTranslations } from 'next-intl';

export default function ProfileFavoriteFilms({ profile }: { profile: User }) {
  const common = useTranslations('common');
  // if (!profile?.favorite_movies?.length) return null;

  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-semibold text-xl text-accent-1">{upperFirst(common('messages.favorite_films'))}</h3>
      <div className="grid grid-cols-4 md:grid-cols-8 2xl:grid-cols-12 gap-2">
        {/* {profile?.favorite_movies?.map(({ movie } : { movie: Movie }) => (
          <MovieCard
            key={movie?.id}
            movie={movie}
            displayMode={'grid'} 
            fill
              sizes={`
                (max-width: 640px) 100px,
                (max-width: 768px) 100px,
                (max-width: 1024px) 120px,
                (max-width: 1280px) 150px,
                (max-width: 1536px) 150px,
                (max-width: 1792px) 150px,
                (max-width: 2048px) 200px,
                (max-width: 2304px) 200px,
                200px
              `}
          />
        ))} */}
      </div>
    </div>
  );
}
