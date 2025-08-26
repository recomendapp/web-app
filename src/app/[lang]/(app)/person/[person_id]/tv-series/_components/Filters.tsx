'use client'

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "@/lib/i18n/routing";
import { upperFirst } from "lodash";
import { LayoutGridIcon, ListIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Label } from "@/components/ui/label";
import { Icons } from "@/config/icons";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DISPLAY, SORT_BY, SORT_ORDER } from "./constants";
import { Database } from "@recomendapp/types";

export const Filters = ({
	knownForDepartment,
	jobs,
	sortBy,
	sortOrder,
	display,
	department,
	job,
} : {
	knownForDepartment: String;
	jobs: Database['public']['Views']['person_jobs']['Row'][];
	sortBy: typeof SORT_BY[number];
	sortOrder: 'asc' | 'desc';
	display: typeof DISPLAY[number];
	department?: string;
	job?: string;
}) => {
	const common = useTranslations('common');
	const searchParams = useSearchParams();
	const router = useRouter();
	const handleChange = (entries: { [key: string]: string | null }) => {
		const params = new URLSearchParams(searchParams.toString());
		for (const [name, value] of Object.entries(entries)) {
			if (!value) {
				params.delete(name);
			} else {
				params.set(name, value);
			}
		}
		router.push(`?${params.toString()}`);
	};
	return (
	<div className='flex items-center gap-2'>
		<Popover>
			<PopoverTrigger asChild>
				<Button variant={'ghost'} size={'sm'}>
					<Icons.filter size={20} />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-80 space-y-2">
				<div className="grid grid-cols-3 items-center gap-4">
					<Label htmlFor="width">{upperFirst(common('messages.department', { count: 1 }))}</Label>
					<Select
					value={department ?? ''}
					onValueChange={(e) => {
						handleChange({ department: e ?? null, job: null });
					}}
					>
						<SelectTrigger className="col-span-2">
							<SelectValue placeholder="Select a department" />
						</SelectTrigger>
						<SelectContent>
							{jobs.map((department, i) => {
								if (!department.department) return null;
								return (
									<SelectItem key={i} value={department.department}>
										{department.department}
										{department.department === knownForDepartment && (
											<Icons.star size={14} className="inline text-accent-yellow fill-accent-yellow ml-2" />
										)}
									</SelectItem>
								);
							})}
						</SelectContent>
					</Select>
				</div>
				<div className="grid grid-cols-3 items-center gap-4">
					<Label htmlFor="width">{upperFirst(common('messages.job', { count: 1 }))}</Label>
					<Select
					value={job ?? ''}
					onValueChange={(e) => {
						handleChange({ job: e ?? null });
					}}
					disabled={!department || !jobs.some(d => d.department === department)}
					>
						<SelectTrigger className="col-span-2">
							<SelectValue placeholder="Select a job"/>
						</SelectTrigger>
						<SelectContent>
							{jobs.filter(d => d.department === department).map((department, i) => (
								department.jobs?.map((job, j) => (
									<SelectItem key={j} value={job}>
										{job}
									</SelectItem>
								))
							))}
						</SelectContent>
					</Select>
				</div>
			</PopoverContent>
		</Popover>
		<Popover>
			<PopoverTrigger asChild>
				<Button variant={'ghost'} size={'sm'}>
					{sortOrder === 'desc' ? <Icons.orderDesc size={20} /> : <Icons.orderAsc size={20} />}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-80 space-y-2">
				<div className="grid grid-cols-3 items-center gap-4">
					<Label htmlFor="width">{upperFirst(common('messages.sort_by'))}</Label>
					<Select defaultValue={sortBy} onValueChange={(e) => handleChange({ sort_by: e })}>
						<SelectTrigger className="col-span-2">
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
				</div>
				<div className="grid grid-cols-3 items-center gap-4">
					<Label htmlFor="width">{upperFirst(common('messages.sort_order'))}</Label>
					<Tabs defaultValue={sortOrder} onValueChange={(e) => handleChange({ sort_order: e })} className="col-span-2">
						<TabsList className="grid w-full grid-cols-2">
							{SORT_ORDER.map((item, i) => (
								<TabsTrigger key={i} value={item} className="data-[state=active]:bg-accent data-[state=active]:text-accent-yellow">
									{item === 'asc' ? (
										<Icons.arrowUp size={20} />
									) : (
										<Icons.arrowDown size={20} />
									)}
								</TabsTrigger>
							))}
						</TabsList>
					</Tabs>
				</div>
			</PopoverContent>
		</Popover>
		<Button variant={'ghost'} onClick={(e) => {
			e.preventDefault();
			handleChange({ display: display === 'grid' ? 'row' : 'grid' });
		}}>
			{display == 'grid' ? <LayoutGridIcon /> : <ListIcon />}
		</Button>
	</div>
	)
}