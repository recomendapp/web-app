import { FaMapMarkerAlt } from "react-icons/fa";
import Marker from "./Marker";
import { MovieMarker } from "./MovieMarker";
import { random } from "lodash";

export function Movies() {
	return (
		<>
			{Array.from({ length: 1500 }, (_, index) => (
				<Marker
					key={index}
					position={[
						// (index % 30) * (index % 2 === 0 ? 1.5 : -1.5),
						(index % random(30, 50)) * (index % 2 === 0 ? 1.5 : -1.5),
						0.25,
						Math.floor(index / random(30, 50)) * (Math.floor(index / 30) % 2 === 0 ? 0.5 : -0.5)
						// Math.floor(index / 30) * (Math.floor(index / 30) % 2 === 0 ? 0.5 : -0.5)
					]}
					fontSize={0.1}
					maxRange={15}
				>
					This is a pretty long
					movie title {index}
					{/* <FaMapMarkerAlt /> */}
				</Marker>
			))}
		</>
	)
}