import { FaMapMarkerAlt } from "react-icons/fa";
import Marker from "./Marker";
import { MovieMarker } from "./MovieMarker";
import { random } from "lodash";
import { useMap } from "../../../context/map-context";
import { useMemo } from "react";
import { Html } from "@react-three/drei";

export function Movies() {
	const {
		data,
		filters,
		movieId,
		setMovieId,
	} = useMap();

	const movies = useMemo(() => {
		// Apply filters
		const filteredMovies = data?.movies.filter(movie => {
			const dateYear = new Date(movie.release_date).getFullYear();

			// Filter by release date
			const isDateInRange = dateYear >= filters.date.value[0] && dateYear <= filters.date.value[1];

			// Filter by runtime
			const isRuntimeInRange = movie.runtime >= filters.runtime.value[0] && movie.runtime <= filters.runtime.value[1];

			// Filter by genres
			const isGenreMatch = filters.genres.value.length === 0 || movie.genres.some(genre => filters.genres.value.includes(genre.id));
			
			return isDateInRange && isRuntimeInRange && isGenreMatch;
		});
		return filteredMovies;
	}, [data?.movies, filters.date.value, filters.genres.value, filters.runtime.value]);

	return (
		<>
		{movies?.map((movie, i) => {
			if (movie.id === movieId) return (
				<Html
					key={movie.id}
					position={[
						(i % random(30, 50)) * (i % 2 === 0 ? 1.5 : -1.5),
						0.25,
						Math.floor(i / random(30, 50)) * (Math.floor(i / 30) % 2 === 0 ? 0.5 : -0.5)
					]}
					center
					className='bg-background px-2 py-1 cursor-pointer rounded-md select-none text-xs text-accent-1 text-center'
				>
					<span
						className="line-clamp-2"
						onClick={() => setMovieId(null)}
					>
						{movie.title}
					</span>
				</Html>
			)
			return (
				<Marker
					key={movie.id}
					id={movie.id}
					position={[
						(i % random(30, 50)) * (i % 2 === 0 ? 1.5 : -1.5),
						0,
						Math.floor(i / random(30, 50)) * (Math.floor(i / 30) % 2 === 0 ? 0.5 : -0.5)
					]}
					color="#ffbf49"
					fontSize={0.2}
					maxRange={25}
					onClick={() => setMovieId(movie.id)}
				>
					{movie.title} {i}
				</Marker>
			)
		})}
			{/* {Array.from({ length: 1500 }, (_, index) => (
				<Marker
					key={index}
					id={index}
					position={[
						(index % random(30, 50)) * (index % 2 === 0 ? 1.5 : -1.5),
						0.25,
						Math.floor(index / random(30, 50)) * (Math.floor(index / 30) % 2 === 0 ? 0.5 : -0.5)
					]}
					fontSize={0.1}
					maxRange={15}
					onClick={() => setMovieId(index)}
				>
					This is a pretty long
					movie title {index}
				</Marker>
			))} */}
		</>
	)
}