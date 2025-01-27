'use client';
import * as React from "react"
import { cn } from "@/lib/utils";
import { Card } from "../ui/card";
import { Media, UserActivity } from "@/types/type.db";
import { ImageWithFallback } from "../utils/ImageWithFallback";
import Link from "next/link";
import { ContextMenuMedia } from "../context-menu/ContextMenuMedia";
import { getMediaDetails, getMediaUrlPrefix } from "@/hooks/get-media-details";
import { TooltipBox } from "../Box/TooltipBox";
import { Button } from "../ui/button";
import { BadgeMedia } from "../badge/BadgeMedia";
import { Icons } from "@/config/icons";
import { useRouter } from "next/navigation";
import UserActivityWatch from "../media/actions/UserActivityWatch";
import UserWatchlist from "../media/actions/UserWatchlist";
import { IconMediaRating } from "../media/icons/IconMediaRating";
import { useUI } from "@/context/ui-context";

interface CardMediaProps
	extends React.ComponentProps<typeof Card> {
		variant?: "default" | "poster" | "row";
		media: Media;
		activity?: UserActivity;
		linked?: boolean;
		posterClassName?: string;
		disableActions?: boolean;
		showRating?: boolean;
	}

const CardMediaDefault = React.forwardRef<
	HTMLDivElement,
	Omit<CardMediaProps, "variant">
>(({ className, media, children, posterClassName, ...props }, ref) => {
	const mediaDetails = getMediaDetails(media);
	return (
		<Card
			ref={ref}
			className={cn(
				"flex items-center rounded-xl h-20 bg-muted hover:bg-muted-hover p-1",
				className
			)}
			{...props}
		>
			<div
			className={cn('relative h-full shrink-0 rounded-md overflow-hidden', mediaDetails.poster_className, posterClassName)}
			>
				<ImageWithFallback
					src={mediaDetails?.poster_path ? `https://image.tmdb.org/t/p/original/${mediaDetails.poster_path}` : ''}
					alt={mediaDetails?.title ?? ''}
					fill
					className="object-cover"
					type="playlist"
					sizes={`
					(max-width: 640px) 96px,
					(max-width: 1024px) 120px,
					150px
					`}
				/>
			</div>
			<div className='px-2 py-1 space-y-1'>
				<p className='line-clamp-2 break-words'>{mediaDetails?.title}</p>
				{children}
			</div>
		</Card>
	);
});
CardMediaDefault.displayName = "CardMediaDefault";

const CardMediaPoster = React.forwardRef<
	HTMLDivElement,
	Omit<CardMediaProps, "variant">
>(({ className, media, linked, disableActions, activity, children, ...props }, ref) => {
	const { device } = useUI();
	const [isHovered, setIsHovered] = React.useState(false);
	const mediaDetails = getMediaDetails(media);
	return (
		<TooltipBox tooltip={`${mediaDetails.title} (${mediaDetails.date && (new Date(mediaDetails.date)).getFullYear()})`} side='top'>
			<Card
				ref={ref}
				className={cn(
					"group relative transition flex gap-4 items-center w-32 shrink-0 rounded-md",
					"border-transparent hover:border-accent-1",
					"aspect-[2/3] overflow-hidden",
					className
				)}
				onMouseEnter={() => setIsHovered(true)}
            	onMouseLeave={() => setIsHovered(false)}
				{...props}
			>
				<ImageWithFallback
					src={mediaDetails?.poster_path ? `https://image.tmdb.org/t/p/original/${mediaDetails.poster_path}` : ''}
					alt={mediaDetails?.title ?? ''}
					fill
					className="object-cover"
					type={media.media_type}
					sizes={`
					(max-width: 640px) 96px,
					(max-width: 1024px) 120px,
					150px
					`}
				/>
				{(media.vote_average || media.tmdb_vote_average) ? (
					<div className='absolute top-1 right-1'>
						<IconMediaRating rating={media.vote_average ?? media.tmdb_vote_average} />
					</div>
				) : null}
				{/* {(activity?.is_liked ||
					activity?.rating ||
					activity?.review) && (
					<div className="absolute top-1 right-1 pointer-events-none">
						<Link
						href={`/@${activity?.user?.username}${mediaUrlPrefix}/${media.slug ?? media.id}`}
						className="pointer-events-auto"
						onClick={linked ? (e) => e.stopPropagation() : undefined}
						>
						<IconMediaRating
							rating={activity?.rating}
							// is_liked={activity?.is_liked}
							// is_reviewed={activity?.review?.id ?? null}
						/>
						</Link>
					</div>
				)} */}
				{(device === 'desktop' && !disableActions) ? (
					<div className="hidden absolute bottom-8 group-hover:flex w-full justify-center pointer-events-none">
					{isHovered ? (
						<div className="bg-background rounded-md w-fit pointer-events-auto">
							<UserActivityWatch mediaId={media.id} mediaType={media.media_type} />
							<UserWatchlist mediaId={media.id} mediaType={media.media_type} />
						</div>
					) : null}
					</div>
				) : null}
			</Card>
		</TooltipBox>
	);
});
CardMediaPoster.displayName = "CardMediaPoster";

const CardMediaRow = React.forwardRef<
	HTMLDivElement,
	Omit<CardMediaProps, "variant">
>(({ className, media, activity, linked, children, ...props }, ref) => {
	const mediaDetails = getMediaDetails(media);
	const mediaUrlPrefix = getMediaUrlPrefix(media.media_type);
	return (
		<Card
			ref={ref}
			className={cn(
				"group flex gap-4 items-center p-1",
				linked ? "hover:bg-muted-hover" : "",
				className
			)}
			{...props}
		>
			<div className="relative w-24 h-32 rounded-md overflow-hidden">
				<ImageWithFallback
					src={mediaDetails?.poster_path ? `https://image.tmdb.org/t/p/original/${mediaDetails.poster_path}` : ''}
					alt={mediaDetails?.title ?? ''}
					fill
					className="object-cover"
					type={media.media_type}
					sizes={`
					(max-width: 640px) 96px,
					(max-width: 1024px) 120px,
					150px
					`}
				/>
			</div>
			<div className='space-y-1'>
				<BadgeMedia type={media.media_type} />
				<div className="flex items-center gap-2">
					<Link
					href={mediaDetails.url}
					className='line-clamp-2 break-words'
					onClick={linked ? (e) => e.stopPropagation() : undefined}
					>
						{mediaDetails?.title}
					</Link>
					{activity?.rating ? (
						<Link
						href={`/@${activity?.user?.username}${mediaUrlPrefix}/${media.slug ?? media.id}`}
						className="pointer-events-auto"
						onClick={linked ? (e) => e.stopPropagation() : undefined}
						>
							<IconMediaRating
							rating={activity.rating}
							className="inline-flex"
							/>
						</Link>
					) : null}
					{activity?.is_liked && (
						<Link
						href={`/@${activity?.user?.username}${mediaUrlPrefix}/${media.slug ?? media.id}`}
						className="pointer-events-auto"
						onClick={linked ? (e) => e.stopPropagation() : undefined}
						>
							<Icons.like
							size={24}
							className="text-background fill-accent-pink inline-flex"
							/>
						</Link>
					)}
				</div>
				{mediaDetails.mainCredits ? (
					<Credits credits={mediaDetails.mainCredits} linked={linked} className="line-clamp-2"/>
				) : null}
			</div>
			{(activity?.is_liked ||
				activity?.rating ||
				activity?.review) && (
				<div className="absolute top-1 right-1 pointer-events-none">
					<Link
					href={`/@${activity?.user?.username}${mediaUrlPrefix}/${media.slug ?? media.id}`}
					className="pointer-events-auto"
					onClick={linked ? (e) => e.stopPropagation() : undefined}
					>
					<IconMediaRating
						rating={activity?.rating}
					/>
					</Link>
				</div>
			)}
		</Card>
	);
});
CardMediaRow.displayName = "CardMediaRow";

const CardMedia = React.forwardRef<
	HTMLDivElement,
	CardMediaProps
>(({ className, media, onClick, showRating = true, linked = true, variant = "default", ...props }, ref) => {
	const mediaDetails = getMediaDetails(media);
	const router = useRouter();
	const customOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (linked) {
			router.push(mediaDetails.url);
		}
		onClick && onClick(e);
	};
	return (
	<ContextMenuMedia media={media}>
		{variant === "default" ? (
			<CardMediaDefault ref={ref} className={cn(linked && 'cursor-pointer', className)} media={media} linked={linked} onClick={customOnClick} showRating={showRating} {...props} />
		) : variant == "poster" ? (
			<CardMediaPoster ref={ref} className={cn(linked && 'cursor-pointer', className)} media={media} linked={linked} onClick={customOnClick} showRating={showRating} {...props} />
		) : variant == "row" ? (
			<CardMediaRow ref={ref} className={cn(linked && 'cursor-pointer', className)} media={media} linked={linked} onClick={customOnClick} showRating={showRating} {...props} />
		) : null}
	</ContextMenuMedia>
	);
});
CardMedia.displayName = "CardMedia";

export {
	type CardMediaProps,
	CardMedia,
	CardMediaDefault,
	CardMediaPoster,
	CardMediaRow,
}


const Credits = ({
	credits,
	linked,
	className,
  }: {
	credits: any[];
	linked?: boolean;
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
			  <Link
			  href={`/person/${credit.id}`}
			  onClick={linked ? (e) => e.stopPropagation() : undefined}
			  >
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