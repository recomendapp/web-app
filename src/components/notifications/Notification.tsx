import { Notification as NotificationType } from '@novu/react';
import React from 'react';
import { cn } from '@/lib/utils';
import { ImageWithFallback } from '../utils/ImageWithFallback';
import Link from 'next/link';
import { ReactMarkdown } from '../utils/ReactMarkdown';
import { CircleIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Icons } from '@/config/icons';
import { TooltipBox } from '../Box/TooltipBox';
import { Skeleton } from '../ui/skeleton';

interface NotificationProps extends React.HTMLAttributes<HTMLDivElement | HTMLAnchorElement> {
	notification: NotificationType;
}

const NotificationContent = ({ notification }: { notification: NotificationType }) => {
	return notification.redirect?.url ? (
		<Link href={notification.redirect.url} className='flex gap-2'>
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
			<ReactMarkdown>
			{notification.body}
			</ReactMarkdown>
		</Link>
	) : (
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
			<ReactMarkdown>
			{notification.body}
			</ReactMarkdown>
		</div>
	)
}

export const NotificationSkeleton = () => {
	return (
		<div className='flex justify-between gap-2'>
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
				<CircleIcon size={8} className='absolute top-1 left-1 text-accent-1 fill-accent-1'/>
			) : null}
		</div>
	)
});