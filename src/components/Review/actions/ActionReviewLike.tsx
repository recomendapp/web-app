import * as React from "react"
import { Button } from "@/components/ui/button";
import { useUserReviewLikeQuery } from "@/features/client/user/userQueries";
import { useAuth } from "@/context/auth-context";
import { TooltipBox } from "@/components/Box/TooltipBox";
import Link from "next/link";
import { Icons } from "@/config/icons";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { AlertCircleIcon } from "lucide-react";
import { useUserReviewLikeDeleteMutation, useUserReviewLikeInsertMutation } from "@/features/client/user/userMutations";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
import { upperFirst } from "lodash";

interface ActionReviewLikeProps
	extends React.ComponentProps<typeof Button> {
		reviewId: number;
		reviewLikesCount?: number;
	}

const ActionReviewLike = React.forwardRef<
	HTMLDivElement,
	ActionReviewLikeProps
>(({ reviewId, reviewLikesCount, className, ...props }, ref) => {
	const { user } = useAuth();
	const common = useTranslations('common');
	const pathname = usePathname();
	const {
		data: like,
		isLoading,
		isError,
	} = useUserReviewLikeQuery({
		reviewId: reviewId,
		userId: user?.id,
	});
	const [likeCount, setLikeCount] = React.useState(reviewLikesCount ?? undefined);
	const insertLike = useUserReviewLikeInsertMutation();
	const deleteLike = useUserReviewLikeDeleteMutation();

	const handleLike = async (e: React.MouseEvent) => {
		e.stopPropagation();
		if (!user) {
			toast.error(upperFirst(common('errors.not_logged_in')));
			return;
		}
		await insertLike.mutateAsync({
			userId: user.id,
			reviewId: reviewId,
		}, {
			onSuccess: () => {
				setLikeCount((prev) => (prev ?? 0) + 1);
			},
			onError: () => {
				toast.error(upperFirst(common('errors.an_error_occurred')));
			}
		});
	};
	const handleUnlike = async (e: React.MouseEvent) => {
		e.stopPropagation();
		if (!like) {
			toast.error(upperFirst(common('errors.an_error_occurred')));
			return;
		}
		await deleteLike.mutateAsync({
			likeId: like.id
		}, {
			onSuccess: () => {
				setLikeCount((prev) => (prev ?? 0) - 1);
			},
			onError: () => {
				toast.error(upperFirst(common('errors.an_error_occurred')));
			}
		});
	};

	if (user == null) {
		return (
		<TooltipBox tooltip={'Connectez-vous'}>
			<Button
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
		<TooltipBox tooltip={like ? 'Ne plus aimer' : 'Aimer'}>
			<Button
			onClick={like ? handleUnlike : handleLike}
			disabled={isLoading || isError || like === undefined || insertLike.isPending || deleteLike.isPending}
			size="fit"
			variant={'action'}
			className={cn(
				"rounded-full",
				like ? 'text-accent-pink hover:text-accent-link/50' : 'text-muted-foreground hover:text-accent-pink',
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
ActionReviewLike.displayName = 'ActionReviewLike';

export default ActionReviewLike;
