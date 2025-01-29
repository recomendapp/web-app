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
import { MediaType, UserActivity, UserReview } from '@/types/type.db';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import ActivityIcon from '@/components/Review/ActivityIcon';
import { CardUser } from '@/components/Card/CardUser';
import { useFormatter, useNow, useTranslations } from 'next-intl';
import { TooltipBox } from '@/components/Box/TooltipBox';
import Tiptap from '@/components/tiptap/Tiptap';
import { useUserReviewInsertMutation, useUserReviewUpdateMutation } from '@/features/client/user/userMutations';
import { upperFirst } from 'lodash';
import { useModal } from '@/context/modal-context';
import { ReviewSettings } from './ReviewSettings';
import UserActivityRating from '@/components/Media/actions/UserActivityRating';
import { useRouter } from 'next/navigation';
import { getMediaUrl } from '@/hooks/get-media-details';
import ActionReviewLike from './actions/ActionReviewLike';
import { IconMediaRating } from '@/components/Media/icons/IconMediaRating';

const MAX_TITLE_LENGTH = 50;
const MAX_BODY_LENGTH = 5000;

interface ReviewFormProps extends React.HTMLAttributes<HTMLDivElement> {
  review?: UserReview;
  mediaId: number;
  mediaType: MediaType;
  activity?: UserActivity;
}

export default function ReviewForm({
	review,
	mediaId,
	mediaType,
	activity,
	className
} : ReviewFormProps) {
	const { user } = useAuth();
	const common = useTranslations('common');
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
		mediaType,
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
				toast.success(upperFirst(common('word.saved')));
				router
			},
			onError: () => {
				toast.error(upperFirst(common('errors.an_error_occurred')));
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
				toast.success(upperFirst(common('word.saved')));
				router.replace(`${getMediaUrl({ id: mediaId, type: mediaType })}/review/${data.id}`);
			},
			onError: () => {
				toast.error(upperFirst(common('errors.an_error_occurred')));
			}
		});
	};

	const handleCancel = () => {
		if (title == review?.title && body == review?.body) {
			setEditable(false);
			return;
		}
		createConfirmModal({
			title: 'Annuler les modifications',
			description: 'Voulez-vous vraiment annuler les modifications ?',
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
				? <IconMediaRating rating={review?.rating} className="h-fit"/>
				: <UserActivityRating mediaId={mediaId} mediaType={mediaType} />}
			<div className="bg-muted-hover h-full w-0.5 rounded-full"></div>
		</div>
		<div className="w-full flex flex-col gap-2">
			<div className="w-full flex justify-between items-center gap-2">
				{review ? <CardUser variant="inline" user={review?.user} /> : <CardUser variant="inline" user={user} />}
				<div className='flex items-center gap-1 text-sm text-muted-foreground'>
					{review ? format.relativeTime(new Date(review?.created_at ?? ''), now) : null}
					{review?.user?.id == user?.id ? (
						<>
							{!editable ? (
								<TooltipBox tooltip="Modifier">							
									<Button
									variant={'ghost'}
									size={'sm'}
									className='hover:text-foreground'
									onClick={() => setEditable(true)}
									disabled={updateReview.isPending || insertReview.isPending}
									>
										<span className="sr-only">Modifier</span>
										<Icons.edit />
									</Button>
								</TooltipBox>
							) : (
								<>
								<TooltipBox tooltip="Enregistrer">
									<Button
									variant={'accent-1'}
									size={'sm'}
									onClick={handleUpdateReview}
									disabled={updateReview.isPending || insertReview.isPending}
									>
										<span className="sr-only">Enregistrer</span>
										<Icons.check />
									</Button>
								</TooltipBox>
								<TooltipBox tooltip="Annuler">
									<Button
									variant={'accent-1-enabled'}
									size={'sm'}
									onClick={handleCancel}
									disabled={updateReview.isPending || insertReview.isPending}
									>
										<span className="sr-only">Annuler</span>
										<Icons.close />
									</Button>
								</TooltipBox>
								</>
							)}
							{review ? <ReviewSettings review={review} mediaId={mediaId} mediaType={mediaType} /> : null}
						</>
					) : !review ? (
						<TooltipBox tooltip="Enregistrer">
							<Button
							variant={'accent-1'}
							size={'sm'}
							onClick={handleCreateReview}
							disabled={updateReview.isPending || insertReview.isPending}
							>
								<span className="sr-only">Enregistrer</span>
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
		w-full h-fit  outline-none focus-visible:ring-0 overflow-hidden resize-none text-5xl font-semibold text-center text-accent-1
		${editable ? 'bg-background border-dashed' : 'bg-muted border-transparent'}
	`}
    />
  );
}
