import { useState } from "react";
import { Notification, NotificationSkeleton } from "@/components/notifications/Notification";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { InfiniteScroll } from "@/components/utils/InfiniteScroll";
import { Icons } from "@/config/icons";
import { useNotifications } from "@novu/react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { createRightPanel } from "./RightPanelUtils";

export const RightPanelNotifications = () => createRightPanel({
	title: 'Notifications',
	component: RightPanelNotificationsContent,
	props: {},
	onlyAuth: true,
})

const RightPanelNotificationsContent = () => {
	const [show, setShow] = useState<'all' | 'unread' | 'archived'>('all');
	const {
		notifications,
		isLoading,
		isFetching,
		fetchMore,
		hasMore,
		readAll,
		archiveAll,
		archiveAllRead,

	} = useNotifications({
		archived: show === 'archived' ? true : undefined,
		read: show === 'unread' ? false : undefined,
	});

	return (
		<>
			<div className="sticky z-[1] top-0 px-2 pt-2 space-y-2 bg-background">
				<div className="flex justify-between items-center">
					<Select value={show} onValueChange={(value) => setShow(value as any)}>
						<SelectTrigger className="w-fit border-0 gap-2">
							<SelectValue />
						</SelectTrigger>
						<SelectContent align="start">
							<SelectItem value="all">All</SelectItem>
							<SelectItem value="unread">Unread</SelectItem>
							<SelectItem value="archived">Archived</SelectItem>
						</SelectContent>
					</Select>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
								<Icons.ellipsis className="w-4 h-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem onClick={readAll}>Mark all read</DropdownMenuItem>
							<DropdownMenuItem onClick={archiveAll}>Archive all</DropdownMenuItem>
							<DropdownMenuItem onClick={archiveAllRead}>Archive all read</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
				<Separator />
			</div>
			<ScrollArea>
			<div className="flex flex-col">
				{(notifications?.length || notifications === undefined || isLoading) ? (
					<InfiniteScroll
					dataLength={notifications?.length ?? undefined}
					isLoading={isLoading}
					isFetching={isFetching}
					fetchMore={fetchMore}
					hasMore={hasMore}
					loader={<Icons.loader className="mx-auto" />}
					skeleton={NotificationSkeleton}
					>
						{notifications?.map((notification, index) => (
							<Notification key={index} notification={notification} />
						))}
					</InfiniteScroll>
				) : (
					<p className="mx-auto text-muted-foreground">No notifications</p>
				)}
			</div>
			</ScrollArea>
		</>
	);
}