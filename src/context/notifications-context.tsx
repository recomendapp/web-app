'use client';

import { useAuth } from '@/context/auth-context';
import useNotificationPermission, { NotificationPermissionProps } from '@/hooks/use-notification-permission';
import { NovuProvider } from '@novu/react';
import { createContext, use } from 'react';

interface NotificationsContextProps {
	permission: NotificationPermissionProps;
}

const NotificationsContext = createContext<NotificationsContextProps | undefined>(undefined);

export const NotificationsProvider = ({
	children,
	subscriberHash,
} : {
	children: React.ReactNode;
	subscriberHash?: string | null;
}) => {
	const { session } = useAuth();
	const notificationPermission = useNotificationPermission();
	if (!session || !subscriberHash) return children;
	return (
		<NovuProvider
		applicationIdentifier={process.env.NEXT_PUBLIC_NOVU_APP_IDENTIFIER!}
		subscriberId={session.user.id}
		subscriberHash={subscriberHash}
		>
			<NotificationsContext.Provider
			value={{
				permission: notificationPermission
			}}
			>
				{children}
			</NotificationsContext.Provider>
		</NovuProvider>
	);
}

export const useNotifications = () => {
	const context = use(NotificationsContext);
	if (context === undefined) {
		throw new Error('useNotifications must be used within a NotificationsProvider');
	}
	return context;
}
