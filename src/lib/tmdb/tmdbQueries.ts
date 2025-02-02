"use server"

import { Media } from "@/types/type.db";
import { createClient } from "../supabase/server-no-cookie";

export const getTmdbSearchMulti = async ({
  query,
  language,
  page,
}: {
  query: string;
  language: string;
  page: number;
}) => {
  const supabase = await createClient(language);
  const tmdbResults = await (
    await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_API_URL}/search/multi?query=${query}&include_adult=false&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=${language}&page=${page}`
    )
  ).json();

  if (!tmdbResults || tmdbResults.total_results === 0 || tmdbResults.success === false) return {
    results: [],
    total_results: 0,
    error: tmdbResults.status_message || 'No results found',
  }

  const { data, error } = await supabase
    .from('medias')
    .select('*, media_movie(*), media_tv_series(*), media_person(*)')
    .or(
      tmdbResults.results
        .filter((result: any) => ['movie', 'tv', 'person'].includes(result.media_type))
        .map((result: any) => {
          return `${result.media_type === 'tv' ? 'tv_series' : result.media_type}_id.eq.${result.id}`;
        })
        .join(',')
    );

  if (!data || error) throw error;

  const orderedData = tmdbResults.results.map((tmdbResult: any) => {
    return data.find((result) => {
      if (tmdbResult.media_type === 'movie') {
        return result.movie_id === tmdbResult.id;
      } else if (tmdbResult.media_type === 'tv') {
        return result.tv_series_id === tmdbResult.id;
      } else if (tmdbResult.media_type === 'person') {
        return result.person_id === tmdbResult.id;
      }
      return false;
    });
  }).filter(Boolean) as typeof data;

  return {
    results: orderedData.map((result) => {
      return {
        ...result.media_movie,
        ...result.media_tv_series,
        ...result.media_person,
      } as Media;
    }),
    total_results: tmdbResults.total_results,
  }
};

export const getTmdbSearchMovies = async ({
  query,
  language,
  page,
}: {
  query: string;
  language: string;
  page: number;
}) => {
  const supabase = await createClient(language);
  const tmdbResults = await (
    await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_API_URL}/search/movie?query=${query}&include_adult=false&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=${language}&page=${page}`
    )
  ).json();

  if (!tmdbResults || tmdbResults.total_results === 0 || tmdbResults.success === false) return {
    results: [],
    total_results: 0,
    error: tmdbResults.status_message || 'No results found',
  }

  const { data, error } = await supabase
    .from('media_movie')
    .select('*')
    .in('id', tmdbResults.results.map((result: any) => result.id));

  if (!data || error) throw error;

  const orderedData = tmdbResults.results.map((tmdbResult: any) => {
    return data.find((result) => result.id === tmdbResult.id);
  }).filter(Boolean) as typeof data;

  return {
    results: orderedData as Media[],
    total_results: tmdbResults.total_results,
  }
};

export const getTmdbSearchTvSeries = async ({
  query,
  language,
  page,
}: {
  query: string;
  language: string;
  page: number;
}) => {
  const supabase = await createClient(language);
  const tmdbResults = await (
    await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_API_URL}/search/tv?query=${query}&include_adult=false&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=${language}&page=${page}`
    )
  ).json();

  if (!tmdbResults || tmdbResults.total_results === 0) return {
    results: [],
    total_results: 0,
  }

  const { data, error } = await supabase
    .from('media_tv_series')
    .select('*')
    .in('id', tmdbResults.results.map((result: any) => result.id));

  if (!data || error) throw error;

  const orderedData = tmdbResults.results.map((tmdbResult: any) => {
    return data.find((result) => result.id === tmdbResult.id);
  }).filter(Boolean) as typeof data;

  return {
    results: orderedData as Media[],
    total_results: tmdbResults.total_results,
  }
};

export const getTmdbSearchPersons = async ({
  query,
  language,
  page,
}: {
  query: string;
  language: string;
  page: number;
}) => {
  const supabase = await createClient(language);
  const tmdbResults = await (
    await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_API_URL}/search/person?query=${query}&include_adult=false&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=${language}&page=${page}`
    )
  ).json();

  if (!tmdbResults || tmdbResults.total_results === 0 || tmdbResults.success === false) return {
    results: [],
    total_results: 0,
    error: tmdbResults.status_message || 'No results found',
  }

  const { data, error } = await supabase
    .from('media_person')
    .select('*')
    .in('id', tmdbResults.results.map((result: any) => result.id));

  if (!data || error) throw error;

  const orderedData = tmdbResults.results.map((tmdbResult: any) => {
    return data.find((result) => result.id === tmdbResult.id);
  }).filter(Boolean) as typeof data;

  return {
    results: orderedData as Media[],
    total_results: tmdbResults.total_results,
  }
};

/* -------------------------------------------------------------------------- */
/*                                     OLD                                    */
/* -------------------------------------------------------------------------- */

export async function getMovieDetails(movie: number, language: string) {
  try {
    const movieDetails = await (
      await fetch(
        `${process.env.NEXT_PUBLIC_TMDB_API_URL}/movie/${movie}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=${language}&append_to_response=credits,videos`
      )
    ).json();
    const directors = movieDetails.credits.crew.filter(
      (member: any) => member.job === 'Director'
    );
    const dataDetails = {
      ...movieDetails,
      directors,
    };
    return dataDetails;
  } catch (error) {
    console.error(error);
  }
}

export async function getPersonDetails(person: string, language: string) {
  return await (
    await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_API_URL}/person/${person}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=${language}&append_to_response=movie_credits`
    )
  ).json();
}

export async function getGenreList(language: any) {
  const genreList: any[] = [];
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_API_URL}/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=${language}`
  );
  const data = await response.json();
  await data.genres.map((genre: { name: any }) => {
    genreList.push({
      name: genre.name,
    });
  });
  return genreList;
}

export async function handleSearchMovies(
  query: string,
  language: any,
  page: number
) {
  const results = await (
    await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_API_URL}/search/movie?query=${query}&include_adult=false&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=${language}&page=${page}&append_to_response=credits`
    )
  ).json();
  const moviesWithCredits = await Promise.all(
    results.results.map(async (movie: any) => {
      const credits = await (
        await fetch(
          `${process.env.NEXT_PUBLIC_TMDB_API_URL}/movie/${movie.id}/credits?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        )
      ).json();
      const directors = credits.crew.filter(
        (member: any) => member.job === 'Director'
      );
      const movieWithCredits = {
        ...movie,
        credits: {
          directors,
        },
      };
      return movieWithCredits;
    })
  );
  return moviesWithCredits;
}

export async function handleSearchPersons(
  query: string,
  language: any,
  page: number
) {
  const results = await (
    await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_API_URL}/search/person?query=${query}&include_adult=false&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=${language}&page=${page}`
    )
  ).json();
  return [...results.results];
}

export async function handleMoviesNowPlaying(
  language: any,
  region: any,
  page: number
) {
  const { results } = await (
    await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_API_URL}/movie/now_playing?include_adult=false&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=${language}&page=${page}&region=${region}`
    )
  ).json();
  return [...results];
}

export async function handleMoviesUpcoming(
  language: any,
  region: any,
  page: number
) {
  const { results } = await (
    await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_API_URL}/movie/upcoming?include_adult=false&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=${language}&page=${page}&region=${region}`
    )
  ).json();
  return [...results];
}
