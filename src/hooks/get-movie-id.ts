export const getMovieId = (movieSlug: string) => {
	const [ movieId, title ] = movieSlug.split('-');
	return {
		movieId: parseInt(movieId),
		isTitle: !!title,
	}
}