import MovieCard from '@/components/Movie/Card/MovieCard';
import { User } from '@/types/type.user';

export default function ProfileFavoriteFilms({ profile }: { profile: User }) {
  if (!profile?.favorite_films?.length) return null;

  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-semibold text-xl text-accent-1">Films favoris</h3>
      <div className="grid grid-cols-4 md:grid-cols-8 2xl:grid-cols-12 gap-2">
        {profile?.favorite_films?.map((filmId: number) => (
          <>
          {/* <MovieCard key={filmId} filmId={filmId} displayMode={'grid'} /> */}
          </>
        ))}
      </div>
    </div>
  );
}
