import * as React from "react"
import { Button } from "@/components/ui/button";
import { useUserReviewMovieLikeQuery } from "@/features/client/user/userQueries";
import { useAuth } from "@/context/auth-context";
import { TooltipBox } from "@/components/Box/TooltipBox";
import { Link } from "@/lib/i18n/routing";
import { Icons } from "@/config/icons";
import { usePathname } from '@/lib/i18n/routing';
import { cn } from "@/lib/utils";
import { AlertCircleIcon } from "lucide-react";
import { useUserReviewMovieLikeDeleteMutation, useUserReviewMovieLikeInsertMutation } from "@/features/client/user/userMutations";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
import { upperFirst } from "lodash";

interface ButtonUserReviewMovieLikeProps
	extends React.ComponentProps<typeof Button> {
		reviewId: number;
		reviewLikesCount?: number;
	}

const ButtonUserReviewMovieLike = React.forwardRef<
	React.ComponentRef<typeof Button>,
	ButtonUserReviewMovieLikeProps
>(({ reviewId, reviewLikesCount, className, ...props }, ref) => {
	const { session } = useAuth();
	const t = useTranslations();
	const pathname = usePathname();
	const {
		data: like,
		isLoading,
		isError,
	} = useUserReviewMovieLikeQuery({
		reviewId: reviewId,
		userId: session?.user.id,
	});
	const [likeCount, setLikeCount] = React.useState(reviewLikesCount ?? undefined);
	const insertLike = useUserReviewMovieLikeInsertMutation();
	const deleteLike = useUserReviewMovieLikeDeleteMutation();

	const handleLike = async (e: React.MouseEvent) => {
		e.stopPropagation();
		if (!session) {
			toast.error(upperFirst(t('common.messages.not_logged_in')));
			return;
		}
		await insertLike.mutateAsync({
			userId: session.user.id,
			reviewId: reviewId,
		}, {
			onSuccess: () => {
				setLikeCount((prev) => (prev ?? 0) + 1);
			},
			onError: () => {
				toast.error(upperFirst(t('common.messages.an_error_occurred')));
			}
		});
	};
	const handleUnlike = async (e: React.MouseEvent) => {
		e.stopPropagation();
		if (!like) {
			toast.error(upperFirst(t('common.messages.an_error_occurred')));
			return;
		}
		await deleteLike.mutateAsync({
			likeId: like.id
		}, {
			onSuccess: () => {
				setLikeCount((prev) => (prev ?? 0) - 1);
			},
			onError: () => {
				toast.error(upperFirst(t('common.messages.an_error_occurred')));
			}
		});
	};

	if (session == null) {
		return (
		<TooltipBox tooltip={upperFirst(t('common.messages.please_login'))}>
			<Button
			ref={ref}
			size={'icon'}
			variant={'action'}
			className={cn(
				"rounded-full text-muted-foreground hover:text-accent-pink",
				className
			)}
			asChild
			{...props}
			>
			<Link href={`/auth/login?redirect=${encodeURIComponent(pathname)}`}>
				<Icons.like size={20} />
				{likeCount != undefined ? ` ${likeCount}` : null}
			</Link>
			</Button>
		</TooltipBox>
		)
	}

	return (
		<TooltipBox tooltip={like ? upperFirst(t('common.messages.unlike')) : upperFirst(t('common.messages.like'))}>
			<Button
			ref={ref}
			onClick={like ? handleUnlike : handleLike}
			disabled={isLoading || isError || like === undefined || insertLike.isPending || deleteLike.isPending}
			size="fit"
			variant={'action'}
			className={cn(
				"rounded-full",
				like ? 'text-accent-pink hover:text-accent-pink/50' : 'text-muted-foreground hover:text-accent-pink',
				className
			)}
			{...props}
			>
				{(isLoading || like === undefined) ? (
				<Icons.spinner size={20} className="animate-spin" />
				) : isError ? (
				<AlertCircleIcon size={20}/>
				) : (
				<Icons.like
				size={20}
				className={`
				${like ? 'fill-accent-pink' : 'fill-none'}
				`}
				/>
				)}
				{likeCount != undefined ? ` ${likeCount}` : null}
			</Button>
		</TooltipBox>
	);
});
ButtonUserReviewMovieLike.displayName = 'ButtonUserReviewMovieLike';

export default ButtonUserReviewMovieLike;
