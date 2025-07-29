import * as React from "react"
import { Button } from "@/components/ui/button";
import { MediaType } from "@/types/type.db";
import { useUserActivityQuery } from "@/features/client/user/userQueries";
import { useAuth } from "@/context/auth-context";
import { TooltipBox } from "@/components/Box/TooltipBox";
import { Link } from "@/lib/i18n/routing";
import { Icons } from "@/config/icons";
import { usePathname } from '@/lib/i18n/routing';
import { cn } from "@/lib/utils";
import { AlertCircleIcon } from "lucide-react";
import { useUserActivityInsertMutation, useUserActivityUpdateMutation } from "@/features/client/user/userMutations";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
import { upperFirst } from "lodash";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
  } from '@/components/ui/dialog';

interface MediaActionUserActivityRatingProps
	extends React.ComponentProps<typeof Button> {
		mediaId: number;
		stopPropagation?: boolean;
	}

const MediaActionUserActivityRating = React.forwardRef<
	HTMLDivElement,
	MediaActionUserActivityRatingProps
>(({ mediaId, stopPropagation = true, className, ...props }, ref) => {
	const { user } = useAuth();
	const t = useTranslations();
	const pathname = usePathname();
	const [ratingValue, setRatingValue] = React.useState(5);
	const {
		data: activity,
		isLoading,
		isError,
	} = useUserActivityQuery({
		userId: user?.id,
		mediaId: mediaId,
	});
	const insertActivity = useUserActivityInsertMutation();
	const updateActivity = useUserActivityUpdateMutation();

	const handleRate = async (e: React.MouseEvent<HTMLButtonElement>) => {
		stopPropagation && e.stopPropagation();
		if (!user?.id) return;
		if (activity) {
			await updateActivity.mutateAsync({
				activityId: activity.id,
				rating: ratingValue,
			}, {
				onError: () => {
					toast.error(upperFirst(t('common.errors.an_error_occurred')));
				}
			});
		} else {
			await insertActivity.mutateAsync({
				userId: user?.id,
				mediaId: mediaId,
				rating: ratingValue,
			}, {
				onError: () => {
					toast.error(upperFirst(t('common.errors.an_error_occurred')));
				}
			});
		}
	  };
	const handleUnrate = async (e: React.MouseEvent<HTMLButtonElement>) => {
		stopPropagation && e.stopPropagation();
		if (activity?.review) {
			return toast.error(t('components.media.actions.rating.remove_rating.has_review'));
		}
		await updateActivity.mutateAsync({
		  activityId: activity!.id!,
		  rating: null,
		}, {
			onError: () => {
				toast.error(upperFirst(t('common.errors.an_error_occurred')));
			}
		});
	  };

	React.useEffect(() => {
		activity?.rating && setRatingValue(activity?.rating);
	  }, [activity]);

	if (user == null) {
		return (
		<TooltipBox tooltip={upperFirst(t('common.messages.please_login'))}>
			<Button
			variant={'rating'}
			className={cn('', className)}
			asChild
			{...props}
			>
			<Link href={`/auth/login?redirect=${encodeURIComponent(pathname)}`}>
				<Icons.star />
			</Link>
			</Button>
		</TooltipBox>
		)
	}

	return (
		<Dialog>
		  <TooltipBox tooltip={activity?.rating ? upperFirst(t('common.messages.edit_rating')) : upperFirst(t('common.messages.add_rating'))}>
			<DialogTrigger asChild>
			  <Button
				disabled={isLoading || isError || activity === undefined || insertActivity.isPending || updateActivity.isPending}
				variant={activity?.rating ? 'rating-enabled' : 'rating'}
			  >
				{(isLoading || activity === undefined) ? (
				  <Icons.spinner className="animate-spin" />
				) : isError ? (
				  <AlertCircleIcon />
				) : activity?.rating ? (
				  <p className="font-bold text-lg">{activity?.rating}</p>
				) : (
				  <Icons.star />
				)}
			  </Button>
			</DialogTrigger>
		  </TooltipBox>
		  <DialogContent>
			<DialogHeader className="relative">
			  <div className="absolute w-full flex justify-center -top-16">
				<p className="absolute top-6 text-2xl text-accent-yellow-foreground font-bold">
				  {ratingValue}
				</p>
				<Icons.star size={80} className="text-accent-yellow fill-accent-yellow" />
			  </div>
			  <DialogTitle className="text-center pt-4">{activity?.rating ? upperFirst(t('common.messages.edit_rating')) : upperFirst(t('common.messages.add_rating'))}</DialogTitle>
			</DialogHeader>
			<div className="grid gap-4 py-4">
			  <div className="flex">
				<MovieRating rating={ratingValue} setRating={setRatingValue} />
			  </div>
			</div>
			<DialogFooter className="flex flex-col justify-center">
			  <DialogClose asChild>
				<Button onClick={async (e) => handleRate(e)}>{upperFirst(t('common.word.save'))}</Button>
			  </DialogClose>
			  {activity?.rating && (
				<DialogClose asChild>
				  <Button variant="destructive" onClick={async (e) => handleUnrate(e)}>
					{upperFirst(t('common.messages.remove_rating'))}
				  </Button>
				</DialogClose>
			  )}
			</DialogFooter>
		  </DialogContent>
		</Dialog>
	  );
});
MediaActionUserActivityRating.displayName = 'MediaActionUserActivityRating';

const MovieRating = ({
	rating,
	setRating,
} : {
	rating: number;
	setRating: React.Dispatch<React.SetStateAction<number>>;
}) => {
	const [hover, setHover] = React.useState<number | null>(null);
	const [tmpRating, setTmpRating] = React.useState(rating);
  
	const stars = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  
	const handleMouseEnter = (i: number) => {
	  setHover(i);
	  setTmpRating((prev) => {
		if (prev === rating) {
		  return rating;
		} else {
		  return prev;
		}
	  });
	  setRating(i);
	};
  
	const handleMouseLeave = () => {
	  setHover(null);
	  setRating(tmpRating);
	};
  
	return (
	  <div className="flex w-full justify-center">
		{stars.map((i) => {
		  return (
			<label key={i}>
			  <input
				type="radio"
				name="rating"
				className="hidden"
				value={rating}
				onClick={() => {
				  setRating(i);
				  setTmpRating(i);
				}}
			  />
			  <Icons.star
				aria-hidden="true"
				onMouseEnter={() => handleMouseEnter(i)}
				onMouseLeave={handleMouseLeave}
				className={`
				  text-accent-yellow
				  ${i <= (hover || rating) && 'fill-accent-yellow'}
				`}
			  />
			</label>
		  );
		})}
	  </div>
	);
};
  

export default MediaActionUserActivityRating;
