import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useEffect, useState } from "react"
import { ImporterInitiator } from "./ImporterInitiator";

export type ImporterSource = {
	source: string;
	name: string;
	description: string;
	icon: string;
	enabled: boolean;
};

export function Importer() {
	const [selectedSource, setSelectedSource] = useState<ImporterSource | null>(null);
	const [file, setFile] = useState<File | null>(null);
	const sources: ImporterSource[]= [
		{
			source: 'recomend',
			name: 'Recomend',
			description: 'Import your data from Recomend',
			icon: 'recomend',
			enabled: true,
		},
		{
			source: 'letterboxd',
			name: 'Letterboxd',
			description: 'Import your data from Letterboxd',
			icon: 'letterboxd',
			enabled: true,
		},
		{
			source: 'senscritique',
			name: 'SensCritique',
			description: 'Import your data from SensCritique',
			icon: 'senscritique',
			enabled: false,
		},
		{
			source: 'csv',
			name: 'CSV',
			description: 'Import your data from a CSV file',
			icon: 'csv',
			enabled: false,
		}
	]

	return (
		<div className="space-y-6">
			<h3 className="text-lg font-medium">Importer</h3>
			{!selectedSource
				? <SelectSource sources={sources} selectedSource={selectedSource} setSelectedSource={setSelectedSource} />
				: <ImporterInitiator
					sources={sources}
					selectedSource={selectedSource}
					setSelectedSource={setSelectedSource}
					file={file}
					setFile={setFile}
				/>
			}
		</div>
	)
}

const SelectSource = ({
	sources,
	selectedSource,
	setSelectedSource
}: {
	sources: ImporterSource[];
	selectedSource: ImporterSource | null;
	setSelectedSource: (source: ImporterSource | null) => void;
}) => {
	return (
		<div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
			{sources.sort((a, b) => a.enabled === b.enabled ? 0 : a.enabled ? -1 : 1).map(source => (
				<Button
					variant={'muted'}
					key={source.source}
					disabled={!source.enabled}
					onClick={() => setSelectedSource(source)}
					className="flex flex-col items-center gap-2 aspect-square h-full overflow-hidden"
				>
					<Image src={`/icons/${source.icon}.svg`} alt={source.name} width={48} height={48} />
					<p className="text-sm text-muted-foreground">{source.name}</p>
				</Button>
			))}
		</div>
	)
}

	