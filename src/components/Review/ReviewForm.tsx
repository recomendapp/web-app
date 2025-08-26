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
import { User, UserReview } from '@recomendapp/types';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { CardUser } from '@/components/Card/CardUser';
import { useFormatter, useNow, useTranslations } from 'next-intl';
import { TooltipBox } from '@/components/Box/TooltipBox';
import Tiptap from '@/components/tiptap/Tiptap';
import { upperFirst } from 'lodash';
import { useModal } from '@/context/modal-context';
import { IconMediaRating } from '@/components/Media/icons/IconMediaRating';

const MAX_TITLE_LENGTH = 50;
const MAX_BODY_LENGTH = 5000;

interface ReviewFormProps extends React.HTMLAttributes<HTMLDivElement> {
	review?: UserReview;
	author?: User;
	rating?: number;
	mediaAction: React.ReactNode | (() => React.ReactNode);
	reviewActions?: React.ReactNode | (() => React.ReactNode);
	reviewSettings?: React.ReactNode | (() => React.ReactNode);
	onUpdate?: (data: { title?: string; body: JSONContent }) => void;
	onCreate?: (data: { title?: string; body: JSONContent }) => void;
}

export default function ReviewForm({
	review,
	author,
	rating,
	className,
	mediaAction,
	reviewActions,
	reviewSettings,
	onUpdate,
	onCreate,
} : ReviewFormProps) {
	const { session } = useAuth();
	const t = useTranslations('common');
	const { createConfirmModal } = useModal();
	const [title, setTitle] = useState(review?.title);
	const [body, setBody] = useState<JSONContent | undefined>(review?.body ?? undefined);
	const [bodyLength, setBodyLength] = useState(0);
	const [editable, setEditable] = useState(review ? false : true);
	const now = useNow({ updateInterval: 1000 * 10 });
	const format = useFormatter();
	const [isLoading, setIsLoading] = useState(false);

	const handleUpdateReview = async () => {
		try{
			setIsLoading(true);
			if (title == review?.title && body == review?.body) {
				setEditable(false);
				return;
			}
			if (!body || bodyLength == 0) {
				toast.error('Le contenu est obligatoire');
				return;
			}

			await onUpdate?.({
				title: title?.trim(),
				body: body,
			});
			setEditable(false);
			toast.success(upperFirst(t('messages.saved', { gender: 'male', count: 1 })));
		} catch (error) {
			toast.error(upperFirst(t('messages.an_error_occurred')));
		} finally {
			setIsLoading(false);
		}
	};

	const handleCreateReview = async () => {
		try {
			setIsLoading(true);
			if (!rating) {
				toast.error('Vous devez noter ce film pour ajouter une critique');
				return;
			}
			if (!body || bodyLength == 0) {
				toast.error('Le contenu est obligatoire');
				return;
			}
	
			await onCreate?.({
				title: title?.trim(),
				body: body,
			});
			toast.success(upperFirst(t('messages.saved', { gender: 'male', count: 1 })));
		} finally {
			setIsLoading(false);
		}
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
				? <IconMediaRating rating={rating} className="h-fit"/>
				: (
					typeof mediaAction === 'function' ? mediaAction() : mediaAction
				)}
			<div className="bg-muted-hover h-full w-0.5 rounded-full"></div>
		</div>
		<div className="w-full flex flex-col gap-2">
			<div className="w-full flex justify-between items-center gap-2">
				{author ? (review ? <CardUser variant="inline" user={author} /> : <CardUser variant="inline" user={author} />) : null}
				<div className='flex items-center gap-1 text-sm text-muted-foreground'>
					{review ? format.relativeTime(new Date(review?.created_at ?? ''), now) : null}
					{author?.id == session?.user.id ? (
						<>
							{!editable ? (
								<TooltipBox tooltip={upperFirst(t('messages.edit'))}>							
									<Button
									variant={'ghost'}
									size={'sm'}
									className='hover:text-foreground'
									onClick={() => setEditable(true)}
									disabled={isLoading}
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
									disabled={isLoading}
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
									disabled={isLoading}
									>
										<span className="sr-only">{upperFirst(t('messages.cancel'))}</span>
										<Icons.close />
									</Button>
								</TooltipBox>
								</>
							)}
							{reviewSettings && (
								typeof reviewSettings === 'function' ? reviewSettings() : reviewSettings
							)}
						</>
					) : !review ? (
						<TooltipBox tooltip={upperFirst(t('messages.save'))}>
							<Button
							variant={'accent-yellow'}
							size={'sm'}
							onClick={handleCreateReview}
							disabled={isLoading}
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
			{reviewActions ? <div className="flex items-center justify-end m-1">
				{typeof reviewActions === 'function' ? reviewActions() : reviewActions}
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
