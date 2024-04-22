'use client';

import { CheckedState } from "@radix-ui/react-checkbox";
import { MutableRefObject, createContext, useContext, useMemo, useRef, useState } from "react";
import moviesDataset from "@/components/Map/Data/movies.json"
import biomesDataset from "@/components/Map/Data/biomes.json"
import { useLocale } from "next-intl";

interface ModalContextProps {
	map: MutableRefObject<any>;
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
		movies: {
			id: number;
			title: string;
			poster_path: string;
			genres: {
				id: number;
				name: string;
			}[];
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
		biomes: {
			id: number;
			name: string;
			position: number[];
			rotationX: number;
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
	const map = useRef<any>(null);
	/* Data */
	const data = useMemo(() => {
		const movies = moviesDataset.map(movie => {
			return {
				id: movie.id,
				title: locale === 'fr' ? movie.fr.title : movie.en.title,
				poster_path: locale === 'fr' ? movie.fr.poster_path : movie.en.poster_path,
				genres: movie.genres.map(genre => {
					return {
						id: genre.id,
						name: genre.fr,
					}
				}),
				directors: movie.directors,
				release_date: movie.release_date,
				original_title: movie.original_title,
				position: movie.position,
				// coord_x: movie.coord_x ?? 0,
				// coord_y: movie.coord_y ?? 0,
				runtime: movie.runtime,
			}
		});
		// show duplicate movies
		// const duplicateMovies = movies.filter((movie, index, self) => self.findIndex(m => m.id === movie.id) !== index);
		// console.log('duplicateMovies', duplicateMovies);
		const biomes = biomesDataset;
		const genres = moviesDataset.reduce((acc: { id: number; name: string; }[], movie) => {
			movie.genres.forEach(genre => {
			  if (!acc.find(g => g.id === genre.id)) {
				acc.push({
				  id: genre.id,
				  name: genre.fr,
				});
			  }
			});
			return acc;
		}, []);
		return {
			movies,
			biomes,
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
			map,
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
