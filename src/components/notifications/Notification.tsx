import { Notification as NotificationType } from '@novu/react';
import React from 'react';
import { cn } from '@/lib/utils';
import { ImageWithFallback } from '../utils/ImageWithFallback';
import { Link } from "@/lib/i18n/routing";
import { ReactMarkdown } from '../utils/ReactMarkdown';
import { CircleIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Icons } from '@/config/icons';
import { TooltipBox } from '../Box/TooltipBox';
import { Skeleton } from '../ui/skeleton';
import { useUserAcceptFollowerRequest, useUserDeclineFollowerRequest } from '@/features/client/user/userMutations';
import { useAuth } from '@/context/auth-context';
import toast from 'react-hot-toast';

interface NotificationProps extends React.HTMLAttributes<HTMLDivElement | HTMLAnchorElement> {
	notification: NotificationType;
}

const NotificationContent = ({ notification }: { notification: NotificationType }) => {
	const { user } = useAuth();
	const acceptRequest = useUserAcceptFollowerRequest({
		userId: user?.id,
	});
	const declineRequest = useUserDeclineFollowerRequest({
		userId: user?.id,
	});

	const handleAction = async (action: 'primary' | 'secondary', key: string, id: number) => {
		switch (key) {
			case 'follower_request_accept':
				acceptRequest.mutate({ requestId: id }, { onSuccess: () => { toast.success('Demande acceptée') }, onError: () => { toast.error("Une erreur s'est produite") } });
				break;
			case 'follower_request_decline':
				declineRequest.mutate({ requestId: id }, { onSuccess: () => { toast.success('Demande refusée') }, onError: () => { toast.error("Une erreur s'est produite") } });
				break;
			default:
				toast.error('Unknown action');
				return;
		}
		if (action === 'primary') {
			await notification.completePrimary();
		} else {
			await notification.completeSecondary();
		}
	}
	return (
		<div className='flex gap-2'>
			<div className='h-10 relative shrink-0 rounded-md overflow-hidden aspect-square'>
				<ImageWithFallback
					src={notification.avatar ?? ''}
					alt={notification.subject ?? ''}
					fill
					className="object-cover"
					sizes={`
					(max-width: 640px) 96px,
					(max-width: 1024px) 120px,
					150px
					`}
				/>
			</div>
			<div className='space-y-2'>
				<ReactMarkdown className={'line-clamp-2 break-all'}>
				{notification.body}
				</ReactMarkdown>
				{(notification.primaryAction || notification.secondaryAction) && (!notification.primaryAction?.isCompleted && !notification.secondaryAction?.isCompleted) ? (
					<div className='flex gap-2'>
						{(notification.primaryAction && !notification.primaryAction.isCompleted) ? (
							<Button
							variant='accent-yellow'
							onClick={async () => {
								const primaryAction = notification.data?.primaryAction as {
									key: string;
									id: number;
								};
								await handleAction('primary', primaryAction.key, primaryAction.id);
							}}
							>
								{notification.primaryAction.label}
							</Button>
						) : null}
						{(notification.secondaryAction && !notification.secondaryAction.isCompleted) ? (
							<Button
							variant='outline'
							onClick={async () => {
								const secondaryAction = notification.data?.secondaryAction as {
									key: string;
									id: number;
								};
								await handleAction('secondary', secondaryAction.key, secondaryAction.id);
							}}
							>
								{notification.secondaryAction.label}
							</Button>
						) : null}
					</div>
				) : null}
			</div>
			{/* <div className='flex flex-col gap-2'>
				<ReactMarkdown>
				{notification.body}
				</ReactMarkdown>
				{(notification.primaryAction || notification.secondaryAction) && (!notification.primaryAction?.isCompleted && !notification.secondaryAction?.isCompleted) ? (
					<div className='flex gap-2'>
						{(notification.primaryAction && !notification.primaryAction.isCompleted) ? (
							<Button
							variant='accent-yellow'
							onClick={async () => {
								const primaryAction = notification.data?.primaryAction as {
									key: string;
									id: number;
								};
								await handleAction('primary', primaryAction.key, primaryAction.id);
							}}
							>
								{notification.primaryAction.label}
							</Button>
						) : null}
						{(notification.secondaryAction && !notification.secondaryAction.isCompleted) ? (
							<Button
							variant='outline'
							onClick={async () => {
								const secondaryAction = notification.data?.secondaryAction as {
									key: string;
									id: number;
								};
								await handleAction('secondary', secondaryAction.key, secondaryAction.id);
							}}
							>
								{notification.secondaryAction.label}
							</Button>
						) : null}
					</div>
				) : null}
			</div> */}
		</div>
	)
}

export const NotificationSkeleton = () => {
	return (
		<div className='flex justify-between gap-2 p-2'>
			<div className='flex gap-2'>
				<Skeleton className='h-10 w-10 rounded-md shrink-0' />
				<Skeleton className='h-10 w-40' />
			</div>
			<div className='flex flex-col gap-2 shrink-0'>
				<Skeleton className='h-4 w-4 rounded-full' />
				<Skeleton className='h-4 w-4 rounded-full' />
			</div>
		</div>
	);
}

export const Notification = React.forwardRef<
	HTMLDivElement,
	NotificationProps
>(({ className, onClick, notification, ...props }, ref) => {
	return (
		<div
		ref={ref as React.RefObject<HTMLDivElement>}
		className={cn(
			"relative flex justify-between gap-2 text-sm cursor-pointer hover:bg-muted p-2",
			className
		)}
		onClick={(e) => {
			if (!notification.isRead) {
				notification.read();
			}
			onClick && onClick(e);
		}}
		{...props}
		>
			<NotificationContent notification={notification} />
			<div className='flex flex-col shrink-0'>
			{notification.isArchived ? (
				<>
				<TooltipBox tooltip='Désarchiver'>
					<Button
					variant='ghost'
					size={'icon'}
					className='h-8 w-8 rounded-full'
					onClick={() => notification.unarchive()}
					>
						<Icons.archiveRestore size={14} />
					</Button>
				</TooltipBox>
				</>
			) : (
				<>
				<TooltipBox tooltip={notification.isRead ? 'Marquer comme non lu' : 'Marquer comme lu'}>
					<Button
					variant='ghost'
					size={'icon'}
					className='h-8 w-8 rounded-full'
					onClick={() => notification.isRead ? notification.unread() : notification.read()}
					>
						<Icons.check size={14} />
					</Button>
				</TooltipBox>
				<TooltipBox tooltip='Archiver'>
					<Button
					variant='ghost'
					size={'icon'}
					className='h-8 w-8 rounded-full'
					onClick={() => notification.archive()}
					>
						<Icons.archive size={14} />
					</Button>
				</TooltipBox>
				</>
			)}
			</div>
			{!notification.isRead ? (
				<CircleIcon size={8} className='absolute top-1 left-1 text-accent-yellow fill-accent-yellow'/>
			) : null}
		</div>
	)
});
Notification.displayName = 'Notification';