'use client'

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { upperFirst } from "lodash";
import { ArrowDownNarrowWideIcon, ArrowUpNarrowWideIcon, LayoutGridIcon, ListIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";

const SORT_BY = ["release_date", "vote_average"];
const DISPLAY = ["grid", "row"];

export const Filters = ({
	sortBy,
	sortOrder,
	display,
} : {
	sortBy: typeof SORT_BY[number];
	sortOrder: 'asc' | 'desc';
	display: typeof DISPLAY[number];
}) => {
	const common = useTranslations('common');
	const searchParams = useSearchParams();
	const router = useRouter();
	const handleChange = ({ name, value }: { name: string, value: string }) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set(name, value);
		router.push(`?${params.toString()}`);
	};
	return (
		<div className='flex items-center gap-2'>
			<Select defaultValue={sortBy} onValueChange={(e) => handleChange({ name: 'sort_by', value: e })}>
				<SelectTrigger>
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					{SORT_BY.map((item, i) => (
						<SelectItem key={i} value={item}>
							{upperFirst(common(`messages.${item}`))}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			<Button variant={'ghost'} size={'sm'} onClick={(e) => {
				e.preventDefault();
				handleChange({ name: 'sort_order', value: sortOrder === 'desc' ? 'asc' : 'desc' });
			}}>
				{sortOrder === 'desc' ? <ArrowDownNarrowWideIcon size={20} /> : <ArrowUpNarrowWideIcon size={20} />}
			</Button>
			<Button variant={'ghost'} onClick={(e) => {
				e.preventDefault();
				handleChange({ name: 'display', value: display === 'grid' ? 'row' : 'grid' });
			}}>
				{display == 'poster' ? <LayoutGridIcon /> : <ListIcon />}
			</Button>
		</div>
	)
}