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
import { MediaMovie, User, UserReviewMovie } from '@/types/type.db';
import { useTranslations } from 'next-intl';
import { upperFirst } from 'lodash';
import { Icons } from '@/config/icons';
import { useModal } from '@/context/modal-context';
import { usePathname, useRouter } from '@/lib/i18n/routing';
import { useUserReviewMovieDeleteMutation } from '@/features/client/user/userMutations';

export function ReviewMovieSettings({
	movieId,
	movie,
	review,
	author,
} : {
	movieId: number;
	movie: MediaMovie;
	review: UserReviewMovie;
	author: User;
}) {
	const { session } = useAuth();
	const t = useTranslations();
	const { createConfirmModal } = useModal();
	const pathname = usePathname();
	const router = useRouter();
	const deleteReview = useUserReviewMovieDeleteMutation({
		userId: session?.user.id,
		movieId,
	});

	const handleDeleteReview = async () => {
		await deleteReview.mutateAsync({
			id: review.id,
		}, {
			onSuccess: () => {
				toast.success(upperFirst(t('common.messages.deleted')));
				if (pathname.startsWith(`/film/${movie.slug || movieId}/review/${review.id}`)) {
					router.replace(`/film/${movie.slug || movieId}`);
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
  