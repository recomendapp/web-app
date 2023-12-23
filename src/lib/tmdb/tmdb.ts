export async function getMovieDetails(movie: number, language: string) {
  try {
    const movieDetails = await (await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_API_URL}movie/${movie}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=${language}&append_to_response=credits,videos`
    )).json();
    const directors = movieDetails.credits.crew.filter(
      (member: any) => member.job === 'Director'
    );
    const dataDetails = {
      ...movieDetails,
      directors
    };
    return dataDetails;
  } catch (error) {
    console.error(error)
  }
}

export async function getPersonDetails(person: string, language: string) {
  return await (
    await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_API_URL}person/${person}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=${language}&append_to_response=movie_credits`
    )
  ).json();
}

export async function getGenreList(language: any) {
  const genreList: any[] = [];
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_API_URL}genre/movie/list?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=${language}`
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
      `${process.env.NEXT_PUBLIC_TMDB_API_URL}search/movie?query=${query}&include_adult=false&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=${language}&page=${page}&append_to_response=credits`
    )
  ).json();
  const moviesWithCredits = await Promise.all(
    results.results.map(async (movie: any) => {
      const credits = await (
        await fetch(
          `${process.env.NEXT_PUBLIC_TMDB_API_URL}movie/${movie.id}/credits?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
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
      `${process.env.NEXT_PUBLIC_TMDB_API_URL}search/person?query=${query}&include_adult=false&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=${language}&page=${page}`
    )
  ).json();
  return [...results.results];
}

export async function handleMoviesNowPlaying(
  language: any,
  region: any,
  page: number
) {
  const {results} = await (
    await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_API_URL}movie/now_playing?include_adult=false&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=${language}&page=${page}&region=${region}`
    )
  ).json();
  return [...results];
}

export async function handleMoviesUpcoming(
  language: any,
  region: any,
  page: number
) {
  const {results} = await (
    await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_API_URL}movie/upcoming?include_adult=false&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=${language}&page=${page}&region=${region}`
    )
  ).json();
  return [...results];
}
