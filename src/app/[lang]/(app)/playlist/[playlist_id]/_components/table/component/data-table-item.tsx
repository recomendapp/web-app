import * as React from "react"
import { Button } from "@/components/ui/button";
import { DateOnlyYearTooltip } from "@/components/utils/Date";
import { ImageWithFallback } from "@/components/utils/ImageWithFallback";
import { getMediaDetails } from "@/hooks/get-media-details";
import { cn } from "@/lib/utils";
import { Media, MediaPerson } from "@/types/type.db";
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
				src={media.avatar_url ?? ''}
				alt={media.title ?? ''}
				className={cn("object-cover")}
				width={60}
          		height={90}
				type={media.media_type}
				{...props}
				/>
			</div>
			<div className="flex-1">
				<Link href={media.url ?? ''} className="font-medium line-clamp-2">
				{media.title}
				</Link>
				<Credits credits={media.main_credit ?? []} className="line-clamp-1" />
				{media.date ? <p className="lg:hidden">
					<DateOnlyYearTooltip date={media.date} />
				</p> : null}
			</div>
		</div>
	);
})
Item.displayName = 'Item'


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
		{credits?.map((credit, index) => (
		  <span key={index}>
			<Button
			  variant={'link'}
			  className="w-fit p-0 h-full italic text-muted-foreground hover:text-accent-1 transition"
			  asChild
			>
			  <Link href={credit.url ?? ''}>
				{credit.title}
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
  