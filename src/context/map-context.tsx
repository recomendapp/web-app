'use client';

import { CheckedState } from "@radix-ui/react-checkbox";
import { MutableRefObject, createContext, useContext, useMemo, useRef, useState } from "react";
// import moviesDataset from "@/components/Map/Data/movies.json"
import moviesDataset from "@/components/Map/Data/movies.json"
import genresDataset from "@/components/Map/Data/genres.json"
// import biomesDataset from "@/components/Map/Data/biomes.json"
import { useLocale } from "next-intl";

interface ModalContextProps {
	mapInitialized: boolean;
	setMapInitialized: (value: boolean) => void;
	movieId: number | null;
	setMovieId: (movieId: number | null) => void;
	filters: {
		date: {
			defaultValue: number[];
			value: number[];
			setValue: (value: number[]) => void;
		},
		genres: {
			value: number[];
			setValue: (value: number[]) => void;
		},
		runtime: {
			defaultValue: number[];
			value: number[];
			setValue: (value: number[]) => void;
		},
		activity: {
			hideWatched: {
				value: CheckedState;
				setValue: (value: CheckedState) => void;
			}
		}
	};
	data?: {
		moviesDataset: typeof moviesDataset;
		movies: {
			id: number;
			title: string;
			poster_path: string;
			genres: number[];
			directors: {
				id: number;
				name: string;
			}[];
			release_date: string;
			original_title: string;
			position: number[];
			// coord_x: number;
			// coord_y: number;
			runtime: number;
		}[];
		genres: {
			id: number;
			name: string;
		}[];
	};
	user: {
		position: number[];
		setPosition: (position: number[]) => void;
	}
	debug?: boolean;
}

const MapProvider = createContext<ModalContextProps | undefined>(undefined);

export const MapContext = ({
	children
} : {
	children: React.ReactNode
}) => {
	const locale = useLocale();
	/* Map */
	const [mapInitialized, setMapInitialized] = useState(false);
	/* Data */
	const data = useMemo(() => {
		const movies = moviesDataset.features.map(({ properties: movie, geometry }) => {
			return {
				id: movie.id,
				title: locale === 'fr' ? movie["fr"].title : movie["en"].title,
				poster_path: locale === 'fr' ? movie["fr"].poster_path : movie["en"].poster_path,
				genres: movie.genres,
				directors: movie.directors,
				release_date: movie.release_date,
				original_title: movie.original_title,
				// position: movie.position,
				position: geometry.coordinates,
				// coord_x: movie.coord_x ?? 0,
				// coord_y: movie.coord_y ?? 0,
				runtime: movie.runtime,
			}
		});
		// show duplicate movies
		// const duplicateMovies = movies.filter((movie, index, self) => self.findIndex(m => m.id === movie.id) !== index);
		// console.log('duplicateMovies', duplicateMovies);
		const genres = genresDataset.map((genre) => {
			return {
				id: genre.id,
				name: locale === 'fr' ? genre["fr"] : genre["en"],
			}
		});
		return {
			moviesDataset,
			movies,
			genres,
		}
	}, [locale]);
	const [movieId, setMovieId] = useState<number | null>(null);
	/* Filters */
	const defaultFilterDate = [data.movies.reduce((acc, movie) => Math.min(acc, new Date(movie.release_date).getFullYear()), Infinity), data.movies.reduce((acc, movie) => Math.max(acc, new Date(movie.release_date).getFullYear()), 0)];
	const [filterDate, setFilterDate] = useState<number[]>(defaultFilterDate);
	const [filterGenres, setFilterGenres] = useState<number[]>([]);
	const defaultFilterRuntime = [data.movies.reduce((acc, movie) => Math.min(acc, movie.runtime), Infinity), data.movies.reduce((acc, movie) => Math.max(acc, movie.runtime), 0)];
	const [filterRuntime, setFilterRuntime] = useState<number[]>(defaultFilterRuntime);
	const [filterActivityHideWatched, setFilterActivityHideWatched] = useState<CheckedState>(false);
	/* User */
	const [userPosition, setUserPosition] = useState<number[]>([-80, 70, 0]);
	/* Debug */
	const debug = process.env.NODE_ENV === 'development';
	return (
		<MapProvider.Provider value={{
			mapInitialized,
			setMapInitialized,
			movieId,
			setMovieId,
			filters: {
				date: {
					defaultValue: defaultFilterDate,
					value: filterDate,
					setValue: setFilterDate
				},
				genres: {
					value: filterGenres,
					setValue: setFilterGenres
				},
				runtime: {
					defaultValue: defaultFilterRuntime,
					value: filterRuntime,
					setValue: setFilterRuntime
				},
				activity: {
					hideWatched: {
						value: filterActivityHideWatched,
						setValue: setFilterActivityHideWatched
					}
				}
			},
			data: data,
			user: {
				position: userPosition,
				setPosition: setUserPosition,
			},
			debug: debug,
		}}>
			{children}
		</MapProvider.Provider>
	);
};

export const useMap = () => {
	const context = useContext(MapProvider);
	if (context === undefined) {
		throw new Error('useMap must be used within a MapProvider');
	}
	return context;
}
