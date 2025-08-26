import { Button } from '@/components/ui/button';
import {
DropdownMenu,
DropdownMenuContent,
DropdownMenuItem,
DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/context/auth-context';
import { MoreHorizontal } from 'lucide-react';
import toast from 'react-hot-toast';
import { MediaTvSeries, User, UserReviewTvSeries } from '@recomendapp/types/dist';
import { useTranslations } from 'next-intl';
import { upperFirst } from 'lodash';
import { Icons } from '@/config/icons';
import { useModal } from '@/context/modal-context';
import { usePathname, useRouter } from '@/lib/i18n/routing';
import { useUserReviewTvSeriesDeleteMutation } from '@/features/client/user/userMutations';

export function ReviewTvSeriesSettings({
	tvSeriesId,
	tvSeries,
	review,
	author,
} : {
	tvSeriesId: number;
	tvSeries: MediaTvSeries;
	review: UserReviewTvSeries;
	author: User;
}) {
	const { session } = useAuth();
	const t = useTranslations();
	const { createConfirmModal } = useModal();
	const pathname = usePathname();
	const router = useRouter();
	const deleteReview = useUserReviewTvSeriesDeleteMutation({
		userId: session?.user.id,
		tvSeriesId,
	});

	const handleDeleteReview = async () => {
		await deleteReview.mutateAsync({
			id: review.id,
		}, {
			onSuccess: () => {
				toast.success(upperFirst(t('common.messages.deleted')));
				if (pathname.startsWith(`/tv-series/${tvSeries.slug || tvSeriesId}/review/${review.id}`)) {
					router.replace(`/tv-series/${tvSeries.slug || tvSeriesId}`);
				}
			},
			onError: () => {
				toast.error(upperFirst(t('common.messages.an_error_occurred')));
			}
		});
	};

	if (session?.user.id != author?.id) return null;

	return (
	<DropdownMenu>
		<DropdownMenuTrigger asChild>
		<Button variant="ghost" size={'icon'} className="rounded-full">
			<span className="sr-only">{upperFirst(t('common.messages.open_menu'))}</span>
			<MoreHorizontal />
		</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent align="end">
		{session?.user.id && session?.user.id == author?.id ? (
			<DropdownMenuItem
			onSelect={() => createConfirmModal({
				title: upperFirst(t('common.messages.delete_review')),
				description: upperFirst(t('common.messages.do_you_really_want_to_delete_this_review')),
				onConfirm: () => handleDeleteReview(),
			})}
			>
			<Icons.delete />
			{upperFirst(t('common.messages.delete'))}
			</DropdownMenuItem>
		) : null}
		</DropdownMenuContent>
	</DropdownMenu>
	);
  }
  