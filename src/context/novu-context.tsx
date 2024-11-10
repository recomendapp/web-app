'use client';

import { useAuth } from '@/context/auth-context';
import { NovuProvider as NovuProviderPrimitive } from '@novu/react';
import { createHmac } from 'crypto';

export const NovuProvider = ({
	children,
} : {
	children: React.ReactNode;
}) => {
	const { user } = useAuth();

	const hmac = (subscriberId: string, secret: string) => {
		return createHmac('sha256', secret)
			.update(subscriberId)
			.digest('hex');
	}

	if (!user) return <>{children}</>;
	return (
		<NovuProviderPrimitive
		applicationIdentifier={process.env.NEXT_PUBLIC_NOVU_APP_IDENTIFIER!}
		subscriberId={user.id}
		subscriberHash={hmac(user.id, process.env.NEXT_PUBLIC_NOVU_API_KEY!)}
		>
			{children}
		</NovuProviderPrimitive>
	);
}
