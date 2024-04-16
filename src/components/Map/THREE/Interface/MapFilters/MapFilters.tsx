import { Button } from '@/components/ui/button';
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from '@/components/ui/popover';
import { FilterIcon } from 'lucide-react';
import { MapFilterDate } from './MapFilterDate';
import { Separator } from '@/components/ui/separator';
import { MapFilterGenre } from './MapFilterGenre';
import { MapFilterActivity } from './MapFilterActivity';
import { MapFilterRuntime } from './MapFilterRuntime';

export const MapFilters = () => {
	return (
		<div className="flex justify-end pointer-events-auto">
			<Popover>
				<PopoverTrigger asChild>
					<Button
						variant="default"
						size="icon"
						className="relative h-8 w-8 rounded-full"
					>
						<FilterIcon className="h-4 w-4"/>
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-80 mr-4">
					<MapFilterDate />
					<Separator />
					<MapFilterRuntime />
					<Separator />
					<MapFilterGenre />
					<Separator />
					<MapFilterActivity />
				</PopoverContent>
				</Popover>
		</div>
	)
}