"use server"

import { MediaMovie, MediaPerson, MediaTvSeries } from "@recomendapp/types";
import { createClient } from "../supabase/server-no-cookie";

export type MultiResult =
  | { type: "movie"; media: MediaMovie }
  | { type: "tv_series"; media: MediaTvSeries }
  | { type: "person"; media: MediaPerson };

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
      `${process.env.TMDB_API_URL}/search/multi?query=${query}&include_adult=false&api_key=${process.env.TMDB_API_KEY}&language=${language}&page=${page}`
    )
  ).json();

  if (!tmdbResults || tmdbResults.total_results === 0 || tmdbResults.success === false) return {
    best_result: null,
    movies: [],
    tv_series: [],
    persons: [],
    total_results: 0,
    error: tmdbResults.status_message || 'No results found',
  };

  const { data: moviesResults, error: moviesResultsError } = await supabase.from('media_movie').select('*').in('id', tmdbResults.results.filter((result: any) => result.media_type === 'movie').map((result: any) => result.id));
	const { data: tvSeriesResults, error: tvSeriesResultsError } = await supabase.from('media_tv_series').select('*').in('id', tmdbResults.results.filter((result: any) => result.media_type === 'tv').map((result: any) => result.id));
	const { data: personsResults, error: personsResultsError } = await supabase.from('media_person').select('*').in('id', tmdbResults.results.filter((result: any) => result.media_type === 'person').map((result: any) => result.id));
	if (moviesResultsError || tvSeriesResultsError || personsResultsError) {
		throw new Error(moviesResultsError?.message || tvSeriesResultsError?.message || personsResultsError?.message);
	}
	const moviesMap = new Map(moviesResults?.map(m => [m.id, m]));
	const tvMap = new Map(tvSeriesResults?.map(t => [t.id, t]));
	const personsMap = new Map(personsResults?.map(p => [p.id, p]));

	const orderedData = tmdbResults.results
		.map((r: any): MultiResult | null => {
      if (r.media_type === "movie") {
        const media = moviesMap.get(r.id);
        return media ? { type: "movie", media } : null;
      }
      if (r.media_type === "tv") {
        const media = tvMap.get(r.id);
        return media ? { type: "tv_series", media } : null;
      }
      if (r.media_type === "person") {
        const media = personsMap.get(r.id);
        return media ? { type: "person", media } : null;
      }
      return null;
		})
		.filter((x: any): x is MultiResult => Boolean(x)) as MultiResult[];

  const best_result = orderedData[0];
	const movies = orderedData.filter((result) => result.type === 'movie').map((result) => result.media);
	const tv_series = orderedData.filter((result) => result.type === 'tv_series').map((result) => result.media);
	const persons = orderedData.filter((result) => result.type === 'person').map((result) => result.media);

	return {
		best_result: best_result,
		movies: movies,
		tv_series: tv_series,
		persons: persons,
		total_results: tmdbResults.total_results,
	};
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
      `${process.env.TMDB_API_URL}/search/movie?query=${query}&include_adult=false&api_key=${process.env.TMDB_API_KEY}&language=${language}&page=${page}`
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
    results: orderedData as MediaMovie[],
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
      `${process.env.TMDB_API_URL}/search/tv?query=${query}&include_adult=false&api_key=${process.env.TMDB_API_KEY}&language=${language}&page=${page}`
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
    results: orderedData as MediaTvSeries[],
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
      `${process.env.TMDB_API_URL}/search/person?query=${query}&include_adult=false&api_key=${process.env.TMDB_API_KEY}&language=${language}&page=${page}`
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
    results: orderedData as MediaPerson[],
    total_results: tmdbResults.total_results,
  }
};
