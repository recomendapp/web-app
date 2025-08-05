'use client';

import { JSONContent } from '@tiptap/react';
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import toast from 'react-hot-toast';
import { Icons } from '@/config/icons';
import { useAuth } from '@/context/auth-context';
import { Media, User, UserActivity, UserReview } from '@/types/type.db';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { CardUser } from '@/components/Card/CardUser';
import { useFormatter, useNow, useTranslations } from 'next-intl';
import { TooltipBox } from '@/components/Box/TooltipBox';
import Tiptap from '@/components/tiptap/Tiptap';
import { useUserReviewInsertMutation, useUserReviewUpdateMutation } from '@/features/client/user/userMutations';
import { upperFirst } from 'lodash';
import { useModal } from '@/context/modal-context';
import { ReviewSettings } from './ReviewSettings';
import MediaActionUserActivityRating from '@/components/Media/actions/MediaActionUserActivityRating';
import ActionReviewLike from './actions/ActionReviewLike';
import { IconMediaRating } from '@/components/Media/icons/IconMediaRating';
import { useRouter } from '@/lib/i18n/routing';

const MAX_TITLE_LENGTH = 50;
const MAX_BODY_LENGTH = 5000;

interface ReviewFormProps extends React.HTMLAttributes<HTMLDivElement> {
	mediaId: number;
	media: Media;
	review?: UserReview;
	author?: User;
	activity?: UserActivity | null;
}

export default function ReviewForm({
	mediaId,
	media,
	review,
	author,
	activity,
	className
} : ReviewFormProps) {
	const { user } = useAuth();
	const t = useTranslations('common');
	const router = useRouter();
	const { createConfirmModal } = useModal();
	const [title, setTitle] = useState(review?.title);
	const [body, setBody] = useState<JSONContent | undefined>(review?.body ?? undefined);
	const [bodyLength, setBodyLength] = useState(0);
	const [editable, setEditable] = useState(review ? false : true);
	const now = useNow({ updateInterval: 1000 * 10 });
	const format = useFormatter();
	const updateReview = useUserReviewUpdateMutation();
	const insertReview = useUserReviewInsertMutation({
		userId: user?.id,
		mediaId,
	});

	const handleUpdateReview = async () => {
		if (title == review?.title && body == review?.body) {
			setEditable(false);
			return;
		}
		if (!body || bodyLength == 0) {
			toast.error('Le contenu est obligatoire');
			return;
		}

		await updateReview.mutateAsync({
			id: review!.id,
			title: title?.trim(),
			body: body,
		}, {
			onSuccess: () => {
				setEditable(false);
				toast.success(upperFirst(t('messages.saved', { gender: 'male', count: 1 })));
				router
			},
			onError: () => {
				toast.error(upperFirst(t('messages.an_error_occurred')));
			}
		});	
	};

	const handleCreateReview = async () => {
		if (!activity?.rating) {
			toast.error('Vous devez noter ce film pour ajouter une critique');
			return;
		}
		if (!body || bodyLength == 0) {
			toast.error('Le contenu est obligatoire');
			return;
		}

		await insertReview.mutateAsync({
			activityId: activity.id,
			title: title?.trim(),
			body: body,
		}, {
			onSuccess: (data) => {
				setEditable(false);
				toast.success(upperFirst(t('messages.saved', { gender: 'male', count: 1 })));
				router.replace(`/review/${data.id}`);
				// router.replace(`${getMediaUrl({ id: mediaId, type: mediaType })}/review/${data.id}`);
			},
			onError: () => {
				toast.error(upperFirst(t('messages.an_error_occurred')));
			}
		});
	};

	const handleCancel = () => {
		if (title == review?.title && body == review?.body) {
			setEditable(false);
			return;
		}
		createConfirmModal({
			title: upperFirst(t('messages.cancel_change', { count: 2 })),
			description: upperFirst(t('messages.do_you_really_want_to_cancel_change', { count: 2 })),
			onConfirm: () => {
				setTitle(review?.title);
				setBody(review?.body);
				setEditable(false);
			}
		})
	};

	return (
	<Card
	className={cn("w-full flex gap-2 p-1 h-fit", className)}
	>
		<div className="flex flex-col items-center gap-1">
			{review
				? <IconMediaRating rating={activity?.rating} className="h-fit"/>
				: <MediaActionUserActivityRating mediaId={mediaId} />}
			<div className="bg-muted-hover h-full w-0.5 rounded-full"></div>
		</div>
		<div className="w-full flex flex-col gap-2">
			<div className="w-full flex justify-between items-center gap-2">
				{author ? (review ? <CardUser variant="inline" user={author} /> : <CardUser variant="inline" user={author} />) : null}
				<div className='flex items-center gap-1 text-sm text-muted-foreground'>
					{review ? format.relativeTime(new Date(review?.created_at ?? ''), now) : null}
					{author?.id == user?.id ? (
						<>
							{!editable ? (
								<TooltipBox tooltip={upperFirst(t('messages.edit'))}>							
									<Button
									variant={'ghost'}
									size={'sm'}
									className='hover:text-foreground'
									onClick={() => setEditable(true)}
									disabled={updateReview.isPending || insertReview.isPending}
									>
										<span className="sr-only">{upperFirst(t('messages.edit'))}</span>
										<Icons.edit />
									</Button>
								</TooltipBox>
							) : (
								<>
								<TooltipBox tooltip={upperFirst(t('messages.save'))}>
									<Button
									variant={'accent-yellow'}
									size={'sm'}
									onClick={handleUpdateReview}
									disabled={updateReview.isPending || insertReview.isPending}
									>
										<span className="sr-only">{upperFirst(t('messages.save'))}</span>
										<Icons.check />
									</Button>
								</TooltipBox>
								<TooltipBox tooltip={upperFirst(t('messages.cancel'))}>
									<Button
									variant={'accent-yellow-enabled'}
									size={'sm'}
									onClick={handleCancel}
									disabled={updateReview.isPending || insertReview.isPending}
									>
										<span className="sr-only">{upperFirst(t('messages.cancel'))}</span>
										<Icons.close />
									</Button>
								</TooltipBox>
								</>
							)}
							{review ? (
								author ? <ReviewSettings
								mediaId={mediaId}
								media={media}
								review={review}
								author={author}
								/> : null
							) : null}
						</>
					) : !review ? (
						<TooltipBox tooltip={upperFirst(t('messages.save'))}>
							<Button
							variant={'accent-yellow'}
							size={'sm'}
							onClick={handleCreateReview}
							disabled={updateReview.isPending || insertReview.isPending}
							>
								<span className="sr-only">{upperFirst(t('messages.save'))}</span>
								<Icons.check />
							</Button>
						</TooltipBox>
					) : null}
				</div>
			</div>
			{(review?.title || editable) ? (
				<ReviewTitle title={title} setTitle={setTitle} editable={editable} />
			) : null}
			<Tiptap
			content={body}
			limit={MAX_BODY_LENGTH}
			editable={editable}
			onUpdate={(content) => setBody(content)}
			onCharacterCountChange={(count) => setBodyLength(count)}
			/>
			{review ? <div className="flex items-center justify-end m-1">
				<ActionReviewLike reviewId={review?.id} reviewLikesCount={review.likes_count} />
			</div> : null}
		</div>
	</Card>
	);
}

export function ReviewTitle({
  title,
  setTitle,
  editable,
}: {
  title: string | null | undefined;
  setTitle: Dispatch<SetStateAction<string | null | undefined>>;
  editable: boolean;
}) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textAreaRef && textAreaRef.current) {
      textAreaRef.current.style.height = '0px';
      const scrollHeight = textAreaRef.current.scrollHeight;
      textAreaRef.current.style.height = scrollHeight + 'px';
    }
  }, [textAreaRef, title]);

  return (
    <Textarea
	ref={textAreaRef}
	onChange={(e) =>
		setTitle(e.target.value.replace(/\s+/g, ' ').trimStart())
	}
	value={title ?? ''}
	readOnly={!editable}
	placeholder="Titre"
	maxLength={MAX_TITLE_LENGTH}
	className={`
		w-full h-fit  outline-none focus-visible:ring-0 overflow-hidden resize-none text-5xl font-semibold text-center text-accent-yellow
		${editable ? 'bg-background border-dashed' : 'bg-muted border-transparent'}
	`}
    />
  );
}
