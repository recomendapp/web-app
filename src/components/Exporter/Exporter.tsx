import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState } from "react"

export type ExporterDestination = {
	destination: string;
	name: string;
	description: string;
	icon: string;
	enabled: boolean;
};

export function Exporter() {
	const [selectedDestination, setSelectedDestination] = useState<ExporterDestination | null>(null);
	const destinations: ExporterDestination[]= [
		{
			destination: 'recomend',
			name: 'Recomend',
			description: 'Import your data from Recomend',
			icon: 'recomend',
			enabled: false,
		},
		{
			destination: 'letterboxd',
			name: 'Letterboxd',
			description: 'Import your data from Letterboxd',
			icon: 'letterboxd',
			enabled: false,
		},
		{
			destination: 'senscritique',
			name: 'SensCritique',
			description: 'Import your data from SensCritique',
			icon: 'senscritique',
			enabled: false,
		},
		{
			destination: 'csv',
			name: 'CSV',
			description: 'Import your data from a CSV file',
			icon: 'csv',
			enabled: false,
		}
	]

	return (
		<div className="space-y-6">
			<h3 className="text-lg font-medium">Exporter</h3>
			<div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
				{destinations.sort((a, b) => a.enabled === b.enabled ? 0 : a.enabled ? -1 : 1).map(destination => (
					<Button
						variant={'muted'}
						key={destination.destination}
						disabled={!destination.enabled}
						onClick={() => setSelectedDestination(destination)}
						className="flex flex-col items-center gap-2 aspect-square h-full overflow-hidden"
					>
						<Image src={`/icons/${destination.icon}.svg`} alt={destination.name} width={48} height={48} />
						<p className="text-sm text-muted-foreground">{destination.name}</p>
					</Button>
				))}
			</div>
		</div>
	)
}
	