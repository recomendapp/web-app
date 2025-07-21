export const searchKeys = {
	all: () => ['search'],

	multi: () => [...searchKeys.all(), 'multi'],


	movies: () => [...searchKeys.all(), 'movies'],

	tvSeries: () => [...searchKeys.all(), 'tvSeries'],

	persons: () => [...searchKeys.all(), 'persons'],
}