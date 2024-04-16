import { MapFilters } from "./MapFilters/MapFilters"
import { MapSearchbar } from "./MapSearchbar"

export const MapHeader = () => {
	return (
		<div className="gap-2  w-full flex flex-col justify-between md:flex-row">
          <MapSearchbar />
		  <MapFilters />
        </div>
	)
}