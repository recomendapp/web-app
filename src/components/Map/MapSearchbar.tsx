import useDebounce from "@/hooks/use-debounce";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";

export function MapSearchbar({

} : {

}) {
	const [searchQuery, setSearchQuery] = useState<string>('');
	const debouncedSearchTerm = useDebounce(searchQuery);
	return (
		<div>
			<input
				name="searchTerm"
				type="number"
				placeholder="Faire une recherche"
				className="w-full z-10 bg-red-500 pr-4 focus:outline-none focus:outline-offset-2"
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
			// onFocus={handleOnFocus}
			// onBlur={handleOutFocus}
			// autoFocus
			/>
		</div>
	)
}
