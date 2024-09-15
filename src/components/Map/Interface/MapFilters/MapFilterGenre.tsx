import { FormItem } from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { SliderRange } from "@/components/ui/slider-range"
import { useMap } from "../../../../context/map-context"
import { useEffect, useState } from "react"
import useDebounce from "@/hooks/use-debounce"
import { Button } from "@/components/ui/button"
import { RotateCcwIcon } from "lucide-react"
import { TooltipBox } from "@/components/Box/TooltipBox"

export const MapFilterGenre = () => {
	const {
		data,
		filters
	} = useMap();

	// useEffect(() => {
	// 	if (!map.current) return;
	// 	console.log('filters.genres.value', filters.genres.value);
	// 	if (filters.genres.value.length) {
	// 		// filter movies by genres, genres array need to contain at least one genre id from the selected genres
	// 		map.current.setFilter('movies', ['in', ['get', 'genres'], ['literal', filters.genres.value]]);
	// 	} else {
	// 		map.current.setFilter('movies', null);
	// 	}
	// 	console.log('movies filters', map.current.getFilter('movies'));
	// }, [filters.genres.value, map]);

	return (
		<FormItem>
			<Label className=" inline-flex items-center">
				Genres
				{filters.genres.value.length > 0 &&
					<TooltipBox tooltip="Reset">
					<RotateCcwIcon
						onClick={() => filters.genres.setValue([])}
						className="w-3 h-3 ml-1 text-muted-foreground hover:text-primary-foreground cursor-pointer"
					/>
				</TooltipBox>}
			</Label>
			<div className="">
				{data?.genres.map((genre) => (
					<Button
						key={genre.id}
						variant="muted"
						onClick={() => {
							const newGenres = [...filters.genres.value];
							const index = newGenres.indexOf(genre.id);
							if (index > -1) {
								newGenres.splice(index, 1);
							} else {
								newGenres.push(genre.id);
							}
							filters.genres.setValue(newGenres);
						}}
						className={`
							rounded-full  text-sm py-1 px-3 h-fit
							${filters.genres.value.includes(genre.id) && 'bg-accent-1 text-primary-foreground hover:bg-accent-1'}
						`}
					>
						{genre.name}
					</Button>
				))}
			</div>
		</FormItem>
	)
}