import * as React from "react"
import { Button } from "@/components/ui/button";
import { DateOnlyYearTooltip } from "@/components/utils/Date";
import { ImageWithFallback } from "@/components/utils/ImageWithFallback";
import { getMediaDetails } from "@/hooks/get-media-details";
import { cn } from "@/lib/utils";
import { Media } from "@/types/type.db";
import Link from "next/link";

interface ItemProps
	extends React.ComponentProps<'div'> {
		media: Media;
	}

export const Item = React.forwardRef<
	HTMLDivElement,
	ItemProps
>(({ media, className, ...props }, ref) => {
	const mediaDetails = getMediaDetails(media);
	return (
		<div ref={ref} className={cn("flex gap-4 items-center", className)} {...props}>
			<div
				className={cn(
				'shadow-md relative shrink-0 overflow-hidden',
				mediaDetails.poster_className,
				className
				)}
			>
				<ImageWithFallback
				src={mediaDetails.poster_url ?? ''}
				alt={mediaDetails.title ?? ''}
				className={cn("object-cover")}
				width={60}
          		height={90}
				type={media.media_type}
				{...props}
				/>
			</div>
			<div className="flex-1">
				<Link href={mediaDetails.url} className="font-medium line-clamp-2">
				{mediaDetails.title}
				</Link>
				<Credits credits={mediaDetails.mainCredits ?? []} className="line-clamp-1" />
				{mediaDetails.date ? <p className="lg:hidden">
					<DateOnlyYearTooltip date={mediaDetails.date} />
				</p> : null}
			</div>
		</div>
	);
})


const Credits = ({
	credits,
	className,
  }: {
	credits: any[];
	className?: string;
  }) => {
	if (!credits || credits.length === 0) return null;
	return (
	  <p className={cn('line-clamp-1', className)}>
		{credits?.map((credit: any, index: number) => (
		  <span key={credit.id}>
			<Button
			  variant={'link'}
			  className="w-fit p-0 h-full italic text-muted-foreground hover:text-accent-1 transition"
			  asChild
			>
			  <Link href={`/person/${credit.id}`}>
				{credit.name}
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
  