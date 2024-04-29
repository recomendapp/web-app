// React
import { useMemo } from "react";

// THREE
import { Html } from "@react-three/drei";

// Context
import {
	useMap
} from "@/context/map-context";

// Components
import Marker from "@/components/Map/THREE/components/Marker";

// Utils
import { random } from "lodash";

// GUI
import { folder, useControls } from "leva";

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
			const isGenreMatch = filters.genres.value.length === 0 || movie.genres.some(genre => filters.genres.value.includes(genre));
			
			return isDateInRange && isRuntimeInRange && isGenreMatch;
		});
		return filteredMovies;
	}, [data?.movies, filters.date.value, filters.genres.value, filters.runtime.value]);

	const {
		movieAngle,
		movieSize,
		movieTranslateX,
		movieTranslateY
	} = useControls({
		movies: folder({
			movieAngle: { value: -Math.PI / 2, step: 0.01 },
			movieSize: { value: 0.0007080000000000005, step: 0.000001  },
			movieTranslateX: { value: 66.99999999999993, step: 0.1 },
			movieTranslateY: { value: -7.300000000000007, step: 0.1 },
		})
	});

	const translateVector = (position: number[]) => {
		// rotate around z axis
		const x = position[0];
		const z = position[1];

		const angle = movieAngle;
		const s = Math.sin(angle);
		const c = Math.cos(angle);

		// rotate point
		let xnew = x * c - z * s;
		let znew = x * s + z * c;

		const ratio = 70 / 100;
		xnew *= movieSize;
		znew *= -movieSize

		xnew += movieTranslateX;
		znew += movieTranslateY;
		return [xnew, 0, znew] as [number, number, number];
	}

	return (
		<>
		{movies?.map((movie, i) => {
			if (movie.id === movieId) return (
				<Html
					key={movie.id}
					position={translateVector(movie.position)}
					zIndexRange={[0, 0]}
					// position={[
					// 	(i % random(30, 50)) * (i % 2 === 0 ? 1.5 : -1.5),
					// 	0.25,
					// 	Math.floor(i / random(30, 50)) * (Math.floor(i / 30) % 2 === 0 ? 0.5 : -0.5)
					// ]}
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
					position={translateVector(movie.position)}
					// position={convertToVector(movie.position[0], movie.position[1],[13138.6683686489, -93485.3819654745], [0,0])}
					// position={movie.position}
					// position={[
					// 	(i % random(30, 50)) * (i % 2 === 0 ? 1.5 : -1.5),
					// 	0,
					// 	Math.floor(i / random(30, 50)) * (Math.floor(i / 30) % 2 === 0 ? 0.5 : -0.5)
					// ]}
					color="#ffbf49"
					fontSize={0.2}
					maxRange={25}
					onClick={() => setMovieId(movie.id)}
				>
					{movie.title}
					{/* {movie.title} {i} */}
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