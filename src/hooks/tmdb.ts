export async function getMovieDetails(movie: any, language: any) {
    const movieDetails = await fetch(`${process.env.NEXT_PUBLIC_TMDB_API_URL}/movie/${movie}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=${language}`);
    const movieCredits = await fetch(`${process.env.NEXT_PUBLIC_TMDB_API_URL}/movie/${movie}/credits?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=${language}`);
    const movieLogo = await fetch(`${process.env.NEXT_PUBLIC_TMDB_API_URL}/movie/${movie}/images?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&include_image_language=${language.split("-")[0]}`);
    const dataDetails = await movieDetails.json();
    const dataCredits = await movieCredits.json();
    const dataLogo = await movieLogo.json();
    console.log('dataLogo',dataLogo)
    return {
        ...dataDetails,
        ...dataCredits,
        logo: dataLogo.logos[0] ? dataLogo.logos[0] : null,
    }
};

export async function getGenreList(language: any) {
    const genreList: any[] = [];
    const response = await fetch(`${process.env.NEXT_PUBLIC_TMDB_API_URL}/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=${language}`);
    const data = await response.json();
    await data.genres.map((genre: { name: any; }) => {
        genreList.push({
            name:genre.name
        })
    })
    return genreList;
} 