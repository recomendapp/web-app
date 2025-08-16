import * as React from "react"
import { Button } from "@/components/ui/button";
import { DateOnlyYearTooltip } from "@/components/utils/Date";
import { ImageWithFallback } from "@/components/utils/ImageWithFallback";
import { cn } from "@/lib/utils";
import { MediaTvSeries, MediaPerson } from "@/types/type.db";
import { Link } from "@/lib/i18n/routing";

interface ItemProps
	extends React.ComponentProps<'div'> {
		tvSeries: MediaTvSeries;
	}

export const Item = React.forwardRef<
	HTMLDivElement,
	ItemProps
>(({ tvSeries, className, ...props }, ref) => {
	return (
		<div ref={ref} className={cn("flex gap-4 items-center", className)} {...props}>
			<div
				className={cn(
				'shadow-md relative shrink-0 overflow-hidden rounded-md',
				'aspect-[2/3]',
				className
				)}
			>
				<ImageWithFallback
				src={tvSeries.avatar_url ?? ''}
				alt={tvSeries.title ?? ''}
				className={cn("object-cover")}
				width={60}
          		height={90}
				type={'tv_series'}
				{...props}
				/>
			</div>
			<div className="flex-1">
				<Link href={tvSeries.url ?? ''} className="font-medium line-clamp-2">
				{tvSeries.title}
				</Link>
				<Credits credits={tvSeries.main_credit ?? []} className="line-clamp-1" />
				{tvSeries.date ? <p className="lg:hidden">
					<DateOnlyYearTooltip date={tvSeries.date} />
				</p> : null}
			</div>
		</div>
	);
})
Item.displayName = 'Item';


const Credits = ({
	credits,
	className,
  }: {
	credits: MediaPerson[];
	className?: string;
  }) => {
	if (!credits || credits.length === 0) return null;
	return (
	  <p className={cn('line-clamp-1', className)}>
		{credits?.map((credit, index: number) => (
		  <span key={index}>
			<Button
			  variant={'link'}
			  className="w-fit p-0 h-full italic text-muted-foreground hover:text-accent-yellow transition"
			  asChild
			>
			  <Link href={credit?.url ?? ''}>
				{credit?.title}
			  </Link>
			</Button>
			{index !== credits.length - 1 && (
			  <span className='text-muted-foreground'>, </span>
			)}
		  </span>
		))}
	  </p>
	)
}
  