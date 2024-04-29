import { FormItem } from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { SliderRange } from "@/components/ui/slider-range"
import { useMap } from "../../../../context/map-context"
import { useEffect, useState } from "react"
import useDebounce from "@/hooks/use-debounce"
import { TooltipBox } from "@/components/Box/TooltipBox"
import { RotateCcwIcon } from "lucide-react"

export const MapFilterDate = () => {
	const {
		map,
		filters
	} = useMap();
	const [value, setValue] = useState<number[]>(filters.date.value);
	const debouncedValue = useDebounce(value, 500);

	useEffect(() => {
		if (debouncedValue !== filters.date.value)
			filters.date.setValue(debouncedValue);
	}, [debouncedValue, filters.date]);

	useEffect(() => {
		if (!map.current) return;
		const startDate = new Date(`${filters.date.value[0]}`);
		const endDate = new Date(`${filters.date.value[1]}`);
		endDate.setFullYear(endDate.getFullYear() + 1);
		map.current.setFilter('movies', [
			"all",
			[">=", ["get", "release_date"], startDate.toISOString().slice(0, 10)],
			["<", ["get", "release_date"], endDate.toISOString().slice(0, 10)]
		]);
	}, [filters.date.value, map]);

	return (
		<FormItem>
			<Label className=" inline-flex items-center">
				Date
				{!value.every((value, index) => value === filters.date.defaultValue[index]) &&
				<TooltipBox tooltip="Reset">
					<RotateCcwIcon
						onClick={() => {
							setValue(filters.date.defaultValue)
						}}
						className="w-3 h-3 ml-1 text-muted-foreground hover:text-primary-foreground transition-colors cursor-pointer"
					/>
				</TooltipBox>}
			</Label>
			<SliderRange
				min={filters.date.defaultValue[0]}
				value={value}
				max={filters.date.defaultValue[1]}
				step={1}
				onValueChange={(value) => {
					setValue(value)
				}}
			/>
		</FormItem>
	)
}