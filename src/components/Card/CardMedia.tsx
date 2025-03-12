'use client';
import * as React from "react"
import { cn } from "@/lib/utils";
import { Card } from "../ui/card";
import { Media, MediaPerson, UserActivity } from "@/types/type.db";
import { ImageWithFallback } from "../utils/ImageWithFallback";
import { Link, useRouter } from "@/lib/i18n/routing";
import { ContextMenuMedia } from "../ContextMenu/ContextMenuMedia";
import { getMediaDetails, getMediaUrlPrefix } from "@/hooks/get-media-details";
import { TooltipBox } from "../Box/TooltipBox";
import { Button } from "../ui/button";
import { BadgeMedia } from "../Badge/BadgeMedia";
import { Icons } from "@/config/icons";
import MediaActionUserActivityWatch from "@/components/Media/actions/MediaActionUserActivityWatch";
import MediaActionUserWatchlist from "@/components/Media/actions/MediaActionUserWatchlist";
import { IconMediaRating } from "@/components/Media/icons/IconMediaRating";
import { useUI } from "@/context/ui-context";
import { DateOnlyYearTooltip } from "../utils/Date";
import { WithLink } from "../utils/WithLink";

interface CardMediaProps
	extends React.ComponentProps<typeof Card> {
		variant?: "default" | "poster" | "row";
		media: Media;
		activity?: UserActivity;
		profileActivity?: UserActivity;
		linked?: boolean;
		posterClassName?: string;
		disableActions?: boolean;
		showRating?: boolean;
		hideMediaType?: boolean;
	}

const CardMediaDefault = React.forwardRef<
	HTMLDivElement,
	Omit<CardMediaProps, "variant">
>(({ className, media, activity, profileActivity, children, linked, showRating, posterClassName, ...props }, ref) => {
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
					src={media.avatar_url ?? ''}
					alt={media.title ?? ''}
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
				<p className='line-clamp-2 break-words'>{media.title}</p>
				{children}
			</div>
		</Card>
	);
});
CardMediaDefault.displayName = "CardMediaDefault";

const CardMediaPoster = React.forwardRef<
	HTMLDivElement,
	Omit<CardMediaProps, "variant">
>(({ className, media, activity, profileActivity, linked, disableActions, showRating, children, ...props }, ref) => {
	const { device } = useUI();
	const [isHovered, setIsHovered] = React.useState(false);
	const mediaDetails = getMediaDetails(media);
	return (
		<TooltipBox tooltip={`${media.title} (${mediaDetails.date && (new Date(mediaDetails.date)).getFullYear()})`} side='top'>
			<Card
				ref={ref}
				className={cn(
					"group relative transition flex gap-4 items-center w-32 shrink-0 rounded-md",
					"border-transparent hover:border-accent-yellow",
					"aspect-[2/3] overflow-hidden",
					className
				)}
				onMouseEnter={() => setIsHovered(true)}
            	onMouseLeave={() => setIsHovered(false)}
				{...props}
			>
				<ImageWithFallback
					src={media.avatar_url ?? ''}
					alt={media.title ?? ''}
					fill
					className="object-cover"
					type={media.media_type}
					sizes={`
					(max-width: 640px) 96px,
					(max-width: 1024px) 120px,
					150px
					`}
				/>
				{(media.vote_average
				|| media.tmdb_vote_average
				|| profileActivity?.rating
				|| profileActivity?.is_liked
				|| profileActivity?.review
				) ? (
					<div className='absolute top-1 right-1 flex flex-col gap-1'>
						{(media.vote_average || media.tmdb_vote_average) ?
						<IconMediaRating
						disableTooltip
						rating={media.vote_average ?? media.tmdb_vote_average}
						/> : null}
						{(profileActivity?.is_liked
						|| profileActivity?.rating
						|| profileActivity?.review) ? (
						<IconMediaRating
						disableTooltip
						rating={profileActivity.rating}
						variant="profile"
						/>) : null}
					</div>
				) : null}
				{(device === 'desktop' && !disableActions) ? (
					<div className="hidden absolute bottom-2 group-hover:flex w-full justify-center pointer-events-none">
					{isHovered ? (
						<div className="bg-background rounded-md w-fit pointer-events-auto">
							<MediaActionUserActivityWatch mediaId={media.media_id!} />
							<MediaActionUserWatchlist mediaId={media.media_id!} />
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
>(({ className, posterClassName, media, activity, profileActivity, hideMediaType, linked, showRating, children, ...props }, ref) => {
	const mediaUrlPrefix = getMediaUrlPrefix(media.media_type!);
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
			<div className={cn("relative w-24 aspect-[2/3] rounded-md overflow-hidden", posterClassName)}>
				<ImageWithFallback
					src={media.avatar_url ?? ''}
					alt={media.title ?? ''}
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
			<div className="flex items-center gap-4 justify-between w-full">
				<div className='space-y-1'>
					<div className="flex items-center gap-2">
						<WithLink
						href={linked ? (media.url ?? '') : undefined}
						className='line-clamp-2 break-words'
						onClick={linked ? (e) => e.stopPropagation() : undefined}
						>
							{media.title}
						</WithLink>
						{profileActivity?.rating ? (
							<WithLink
							href={linked ? `/@${profileActivity?.user?.username}${mediaUrlPrefix}/${media.slug ?? media.id}` : undefined}
							className="pointer-events-auto"
							onClick={linked ? (e) => e.stopPropagation() : undefined}
							>
								<IconMediaRating
								rating={profileActivity.rating}
								className="inline-flex"
								/>
							</WithLink>
						) : null}
						{profileActivity?.is_liked && (
							<Link
							href={`/@${profileActivity?.user?.username}${mediaUrlPrefix}/${media.slug ?? media.id}`}
							className="pointer-events-auto"
							onClick={linked ? (e) => e.stopPropagation() : undefined}
							>
								<Icons.like
								size={24}
								className="text-accent-pink fill-accent-pink inline-flex"
								/>
							</Link>
						)}
						{profileActivity?.review ? (
							<Link
							href={`/review/${profileActivity.review.id}`}
							className="pointer-events-auto"
							onClick={linked ? (e) => e.stopPropagation() : undefined}
							>
								<Icons.comment
								size={24}
								className="text-foreground inline-flex"
								/>
							</Link>
						) : null}
					</div>
					{media.main_credit ? <Credits credits={media.main_credit} linked={linked} className="line-clamp-2"/> : null}
					{media.extra_data.known_for_department ? <div className="text-xs text-muted-foreground">{media.extra_data.known_for_department}</div> : null}
					{!hideMediaType ? <BadgeMedia type={media.media_type} /> : null}
				</div>
				{media.date ? (
					<DateOnlyYearTooltip date={media.date} className="text-xs text-muted-foreground"/>
				) : null}
			</div>
		</Card>
	);
});
CardMediaRow.displayName = "CardMediaRow";

const CardMedia = React.forwardRef<
	HTMLDivElement,
	CardMediaProps
>(({ className, media, hideMediaType = true, onClick, showRating = true, linked = true, variant = "default", ...props }, ref) => {
	const router = useRouter();
	const customOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (linked && media.url) {
			router.push(media.url);
		}
		onClick && onClick(e);
	};
	return (
	<ContextMenuMedia media={media}>
		{variant === "default" ? (
			<CardMediaDefault ref={ref} className={cn(linked ? 'cursor-pointer' : '', className)} media={media} linked={linked} onClick={customOnClick} showRating={showRating} {...props} />
		) : variant == "poster" ? (
			<CardMediaPoster ref={ref} className={cn(linked ? 'cursor-pointer' : '', className)} media={media} linked={linked} onClick={customOnClick} showRating={showRating} {...props} />
		) : variant == "row" ? (
			<CardMediaRow ref={ref} className={cn(linked ? 'cursor-pointer' : '', className)} media={media} linked={linked} onClick={customOnClick} showRating={showRating} hideMediaType={hideMediaType} {...props} />
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
} : {
	credits: MediaPerson[];
	linked?: boolean;
	className?: string;
}) => {
	if (!credits || credits.length === 0) return null;
	return (
	  <p className={cn('line-clamp-1', className)}>
		{credits?.map((credit, index) => (
		  <span key={index}>
			<Button
			  variant={'link'}
			  className={`
				w-fit p-0 h-full italic text-muted-foreground transition
				${linked ? 'hover:text-accent-yellow' : 'hover:text-muted-foreground hover:no-underline'}
			`}
			  asChild
			>
			  <WithLink
			  href={linked ? (credit.url ?? '') : undefined}
			  onClick={linked ? (e) => e.stopPropagation() : undefined}
			  >
				{credit.title}
			  </WithLink>
			</Button>
			{index !== credits.length - 1 && (
			  <span className='text-muted-foreground'>, </span>
			)}
		  </span>
		))}
	  </p>
	)
}