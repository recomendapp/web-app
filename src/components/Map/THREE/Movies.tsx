import { FaMapMarkerAlt } from "react-icons/fa";
import Marker from "./Marker";
import { MovieMarker } from "./MovieMarker";

export function Movies() {
	return (
		<>
			{Array.from({ length: 1500 }, (_, index) => (
				<Marker
					key={index}
					position={[
						(index % 30) * (index % 2 === 0 ? 0.5 : -0.5),
						0.25,
						Math.floor(index / 30) * (Math.floor(index / 30) % 2 === 0 ? 0.5 : -0.5)
					]}
					fontSize={0.20}
					maxRange={25}
				>
					{index}
					{/* <FaMapMarkerAlt /> */}
				</Marker>
			))}
		</>
	)
}