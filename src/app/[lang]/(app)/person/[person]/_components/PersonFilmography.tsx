'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import MovieCard from '@/components/Movie/Card/MovieCard';
import { LayoutGrid, List } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Person } from '@/types/type.db';
import { useQuery } from '@tanstack/react-query';
import { useLocale } from 'next-intl';
import { Skeleton } from '@/components/ui/skeleton';
import { useSupabaseClient } from '@/context/supabase-context';

export default function PersonFilmography({
  person,
  departments,
  mainDepartment,
} : {
  person: Person,
  departments: string[] | null,
  mainDepartment: string | undefined,
}) {
  const supabase = useSupabaseClient();
  const locale = useLocale();
  const [ selectedDepartment, setSelectedDepartment ] = useState<string | undefined>(mainDepartment);
  const [ selectedFilter, setSelectedFilter ] = useState({
    date: null,
    genre: null,
  });
  const [ selectedOrder, setSelectedOrder ] = useState<string>('date-desc');
  const [displayMode, setDisplayMode] = useState<'grid' | 'row'>('grid');

  const {
    data: movies,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['person', person?.id, 'movies', {
      department: selectedDepartment,
      filter: selectedFilter,
      locale: locale,
      order: selectedOrder
    }],
    queryFn: async () => {
      if (!person?.id) throw new Error('No person id');
      let query = supabase
        .from('tmdb_movie_credits')
        .select(`
          *,
          movie(*)
        `)
        .eq('person_id', person.id);
        
      if (selectedDepartment) {
        query = query.eq('department', selectedDepartment)
      }

      // Order
      if (selectedOrder === 'date-desc') query = query.order('movie(release_date)', { ascending: false, nullsFirst: false });
      if (selectedOrder === 'date-asc') query = query.order('movie(release_date)', { ascending: true, nullsFirst: false });
      if (selectedOrder === 'popularity-desc') query = query.order('movie(vote_count)', { ascending: false, nullsFirst: false });
      if (selectedOrder === 'popularity-asc') query = query.order('movie(vote_count)', { ascending: true, nullsFirst: false });

      const { data, error } = await query;
      if (error) throw error;
      return (data);
    },
    enabled: !!person?.id && !!selectedDepartment && !!locale,
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <Select onValueChange={setSelectedDepartment} defaultValue={selectedDepartment}>
            <SelectTrigger className="w-fit">
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectGroup>
                <SelectLabel>Department</SelectLabel>
                {departments?.map((department) => (
                  <SelectItem key={department} value={department!}>
                    {department}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2">
          <Select onValueChange={setSelectedOrder} defaultValue={selectedOrder}>
            <SelectTrigger className="w-fit">
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectGroup>
                <SelectLabel>Date de sortie</SelectLabel>
                <SelectItem value={'date-desc'}>Plus récentes</SelectItem>
                <SelectItem value={'date-asc'}>Plus anciennes</SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>Popularite</SelectLabel>
                <SelectItem value={'popularity-desc'}>
                  Plus populaires
                </SelectItem>
                <SelectItem value={'popularity-asc'}>Plus meconnus</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button
            variant={'ghost'}
            onClick={() =>
              setDisplayMode(displayMode == 'grid' ? 'row' : 'grid')
            }
          >
            {displayMode == 'grid' ? <LayoutGrid /> : <List />}
          </Button>
        </div>
      </div>
      {movies?.length === 0 ? (
        <p className="text-center font-semibold">Aucun film.</p>
      ) : (
        <div
          className={` gap-2
              ${
                displayMode == 'row'
                  ? 'flex flex-col'
                  : 'grid grid-cols-3 sm:grid-cols-4 md:grid-cols-8 2xl:grid-cols-10'
              }
          `}
        >
          {(movies === undefined || isLoading) ? (
            Array.from({ length: 10 }).map((_, index) => (
              <Skeleton key={index} className="w-full aspect-[2/3] shrink-0" />
            ))
          ) : (
            movies.map((credits, index) => (
              <MovieCard
                key={index}
                movie={credits.movie!}
                displayMode={displayMode}
                job={credits.job}
                fill
                sizes={`
                  (max-width: 640px) 96px,
                  (max-width: 1024px) 120px,
                  150px
                `}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}

export function PersonMovies({ person }: { person: any }) {
  const extractRoles = (movies: any[]): string[] => {
    const roles = movies
      .filter((movie) => movie.job) // Filtrer les films avec un rôle défini
      .map((movie) => movie.job); // Assurer une correspondance insensible à la casse
    if (person.movie_credits.cast?.length > 0) {
      roles.push('Actor');
    }
    return Array.from(new Set(roles)).sort(); // Renvoyer une liste unique de rôles
  };

  const allMovies = [
    ...person.movie_credits.cast,
    ...person.movie_credits.crew,
  ];
  const roles = extractRoles(allMovies);
  const [displayMode, setDisplayMode] = useState<'grid' | 'row'>('grid');
  const [roleFilter, setRoleFilter] = useState<string | undefined>(roles[0]);
  const [order, setOrder] = useState('date-desc');
  const [sortedMovies, setSortedMovies] = useState<any[]>([]);

  const sortMovies = (movies: any[]): any[] => {
    switch (order) {
      case 'date-desc':
        return movies.sort(
          (a, b) =>
            new Date(b.release_date).getTime() -
            new Date(a.release_date).getTime()
        );
      case 'date-asc':
        return movies.sort(
          (a, b) =>
            new Date(a.release_date).getTime() -
            new Date(b.release_date).getTime()
        );
      case 'popularity-desc':
        return movies.sort((a, b) => b.vote_average - a.vote_average);
      case 'popularity-asc':
        return movies.sort((a, b) => a.vote_average - b.vote_average);
      default:
        return movies;
    }
  };

  useEffect(() => {
    const filteredMovies = roleFilter
      ? roleFilter.toLowerCase() === 'actor'
        ? person.movie_credits.cast
        : allMovies.filter(
            (movie) =>
              movie.job && movie.job.toLowerCase() === roleFilter.toLowerCase()
          )
      : allMovies;
    const sorted = sortMovies(filteredMovies);
    setSortedMovies(sorted);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order, roleFilter]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-3xl font-bold">Films</h2>
        <div className="flex gap-2">
          <Select onValueChange={setRoleFilter} defaultValue={roleFilter}>
            <SelectTrigger className="w-fit">
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectGroup>
                <SelectLabel>Role</SelectLabel>
                {extractRoles(allMovies).map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select onValueChange={setOrder} defaultValue={order}>
            <SelectTrigger className="w-fit">
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectGroup>
                <SelectLabel>Date de sortie</SelectLabel>
                <SelectItem value={'date-desc'}>Plus récentes</SelectItem>
                <SelectItem value={'date-asc'}>Plus anciennes</SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>Popularite</SelectLabel>
                <SelectItem value={'popularity-desc'}>
                  Plus populaires
                </SelectItem>
                <SelectItem value={'popularity-asc'}>Plus meconnus</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button
            variant={'ghost'}
            onClick={() =>
              setDisplayMode(displayMode == 'grid' ? 'row' : 'grid')
            }
          >
            {displayMode == 'grid' ? <LayoutGrid /> : <List />}
          </Button>
        </div>
      </div>
      <div
        className={` gap-2
            ${
              displayMode == 'row'
                ? 'flex flex-col'
                : 'grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 2xl:grid-cols-8'
            }
        `}
      >
        {sortedMovies.map((film: any, index) => (
          <>
          {/* <MovieCard key={index} filmId={film.id} displayMode={displayMode} /> */}
          </>
        ))}
      </div>
    </div>
  );
}
