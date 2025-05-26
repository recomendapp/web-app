'use client'

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "@/lib/i18n/routing";
import { upperFirst } from "lodash";
import { ArrowDownNarrowWideIcon, ArrowUpNarrowWideIcon, LayoutGridIcon, ListIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Label } from "@/components/ui/label";
import { Icons } from "@/config/icons";

const SORT_BY = ["release_date", "vote_average"];
const DISPLAY = ["grid", "row"];

export const Filters = ({
	jobs,
	sortBy,
	sortOrder,
	display,
	department,
	job,
} : {
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
					<div className="grid gap-4">
						{/* <div className="space-y-2">
							<h4 className="font-medium leading-none">Dimensions</h4>
							<p className="text-sm text-muted-foreground">
							Set the dimensions for the layer.
							</p>
						</div> */}
						<div className="grid gap-2">
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
								<Label htmlFor="width">{upperFirst(common('messages.job', { count: 1 }))}</Label>
								<Select
								value={job ? `${department}:${job}` : department ?? ''}
								onValueChange={(e) => {
									const [department, job] = e.split(':');
									handleChange({
										department: department ?? null,
										job: job ?? null
									});
								}}
								>
									<SelectTrigger className="col-span-2">
										<SelectValue placeholder="Select a job" />
									</SelectTrigger>
									<SelectContent>
										{jobs.map((department, i) => (
											<SelectGroup key={i}>
												{department.department && <SelectItem value={department.department} className="text-accent-yellow">
													{department.department}
												</SelectItem>}
												{department.jobs?.map((job, j) => (
													<SelectItem key={j} value={`${department.department}:${job}`}>
														{job}
													</SelectItem>
												))}
											</SelectGroup>
										))}
									</SelectContent>
								</Select>
							</div>
						</div>
					</div>
					<div className="flex items-center justify-end">
						<Button
						variant={'outline'}
						size={'sm'}
						onClick={() => handleChange({ sort_by: null, sort_order: null, department: null, job: null })}
						disabled={!department && !job}
						>
							{upperFirst(common('messages.reset'))}
						</Button>
					</div>
				</PopoverContent>
			</Popover>
			<Button variant={'ghost'} size={'sm'} onClick={(e) => {
				e.preventDefault();
				handleChange({ sort_order: sortOrder === 'desc' ? 'asc' : 'desc' });
			}}>
				{sortOrder === 'desc' ? <ArrowDownNarrowWideIcon size={20} /> : <ArrowUpNarrowWideIcon size={20} />}
			</Button>
			<Button variant={'ghost'} onClick={(e) => {
				e.preventDefault();
				handleChange({ display: display === 'grid' ? 'row' : 'grid' });
			}}>
				{display == 'poster' ? <LayoutGridIcon /> : <ListIcon />}
			</Button>
		</div>
	)
}