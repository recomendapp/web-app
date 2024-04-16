import { MapHeader } from "./MapHeader";
import { MapSearchbar } from "./MapSearchbar";
import { MovieWidget } from "./MovieWidget";

export const Interface = () => {
	return (
		<div className="absolute top-0 w-full h-full pointer-events-none p-2 flex flex-col justify-between">
			<MapHeader />
	  		{/* <MapSearchbar /> */}
			<MovieWidget />
		</div>
	);
};