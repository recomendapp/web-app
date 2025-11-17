'use client'

import { Button } from "@/components/ui/button";
import { useRouter } from "@/lib/i18n/navigation";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { upperFirst } from "lodash";
import { Icons } from "@/config/icons";

export const ActiveFilters = ({
	department,
	job,
} : {
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
	const canReset = !!department || !!job;
	if (!canReset) return null;
	return (
	<ScrollArea>
		<div className="flex items-center gap-2 p-2">
			{/* DEPARTMENT */}
			{department && (
				<Button
					variant={'accent-yellow'}
					size={'sm'}
					className="group overflow-hidden gap-0 rounded-full"
					onClick={() => handleChange({ department: null, job: null })}
				>
					{upperFirst(department)}
					<span className="text-muted-foreground max-w-0 group-hover:max-w-[100px] ml-0 group-hover:ml-2 overflow-hidden group-hover:opacity-100 opacity-0 transition-all duration-500">
						{upperFirst(common('messages.department', { count: 1 }))}
					</span>
					<Icons.X className="ml-2" />
				</Button>
			)}
			{/* JOB */}
			{job && (
				<Button
					variant={'accent-yellow'}
					size={'sm'}
					className="group overflow-hidden gap-0 rounded-full"
					onClick={() => handleChange({ job: null })}
				>
					{upperFirst(job)}
					<span className="text-muted-foreground max-w-0 group-hover:max-w-[100px] ml-0 group-hover:ml-2 overflow-hidden group-hover:opacity-100 opacity-0 transition-all duration-500">
						{upperFirst(common('messages.job', { count: 1 }))}
					</span>
					<Icons.X className="ml-2" />
				</Button>
			)}
			{/* RESET */}
			<Button
			variant={'outline'}
			size={'sm'}
			className="rounded-full"
			onClick={() => handleChange({ sort_by: null, sort_order: null, department: null, job: null })}
			>
				{upperFirst(common('messages.reset'))}
				<Icons.X className="ml-2" />
			</Button>
		</div>
		<ScrollBar orientation="horizontal" />
	</ScrollArea>
	)
}