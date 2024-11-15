'use client';

import { useAuth } from '@/context/auth-context';
import useNotificationPermission, { NotificationPermissionProps } from '@/hooks/use-notification-permission';
import { NovuProvider } from '@novu/react';
import { createHmac } from 'crypto';
import { createContext, useContext } from 'react';

interface NotificationsContextProps {
	permission: NotificationPermissionProps;
}

const NotificationsContext = createContext<NotificationsContextProps | undefined>(undefined);

export const NotificationsProvider = ({
	children,
} : {
	children: React.ReactNode;
}) => {
	const { session } = useAuth();
	const notificationPermission = useNotificationPermission();

	const hmac = (subscriberId: string, secret: string) => {
		return createHmac('sha256', secret)
			.update(subscriberId)
			.digest('hex');
	}

	if (!session) return <>{children}</>;
	return (
		<NovuProvider
		applicationIdentifier={process.env.NEXT_PUBLIC_NOVU_APP_IDENTIFIER!}
		subscriberId={session.user.id}
		subscriberHash={hmac(session.user.id, process.env.NEXT_PUBLIC_NOVU_API_KEY!)}
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
	const context = useContext(NotificationsContext);
	if (context === undefined) {
		throw new Error('useNotifications must be used within a NotificationsProvider');
	}
	return context;
}
