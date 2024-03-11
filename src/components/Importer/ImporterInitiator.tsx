import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ImporterSource } from "./Importer";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
  } from "@/components/ui/select"

export const ImporterInitiator = ({
	sources,
	selectedSource,
	setSelectedSource,
	file,
	setFile
}: {
	sources: ImporterSource[];
	selectedSource: ImporterSource;
	setSelectedSource: (source: ImporterSource | null) => void;
	file: File | null;
	setFile: (file: File | null) => void;
}) => {
	return (
		<div className="bg-muted rounded-md space-y-2 p-4">
			<div className="flex items-center gap-2">
				<Button
					onClick={() => setSelectedSource(null)}
					variant="ghost"
					size="icon"
					className="rounded-full hidden lg:flex justify-center"
				>
					<ChevronLeft />
				</Button>
				<Select
					defaultValue={selectedSource.source}
					value={selectedSource.source}
					onValueChange={(value) => {
						const source = sources.find((source) => source.source === value);
						if (source) {
							setSelectedSource(source);
						}
					}}
				>
					<SelectTrigger className="w-[180px]">
						<SelectValue

							placeholder="Source"
						/>
					</SelectTrigger>
					<SelectContent>
						{sources.sort((a, b) => a.enabled === b.enabled ? 0 : a.enabled ? -1 : 1).map(source => (
							<SelectItem
								value={source.source}
								key={source.source}
								disabled={!source.enabled}
							>
								{source.name}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
			{!file ? (
				<label
					className="flex justify-center h-32 px-4 transition bg-background border-2 border-muted border-dashed rounded-md appearance-none cursor-pointer hover:border-muted-hover focus:outline-none">
					<span className="flex items-center space-x-2">
						
						<span className="font-medium text-muted-foreground">
							Drop files to Attach, or{' '}
							<span className="text-accent-1 underline">browse</span>
						</span>
					</span>
					<Input
						type="file"
						name="file"
						className="hidden"
						onChange={(e) => {
							const file = e.target.files?.[0];
							if (file) {
								setFile(file);
							}
						}}
					/>
				</label>
			) : (
				<div>
					ok
				</div>
			)}
		</div>
	)
}