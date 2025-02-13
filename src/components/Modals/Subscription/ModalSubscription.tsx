'use client';

import { useAuth } from '@/context/auth-context';
import { useModal } from '@/context/modal-context';
import {  Prices, Products } from '@/types/type.db';
import { Modal, ModalBody, ModalDescription, ModalFooter, ModalHeader, ModalTitle, ModalType } from '../Modal';
import { Card } from '@/components/ui/card';
import { useState } from 'react';
import { Icons } from '@/config/icons';
import { formatPrice } from '@/components/ui/format-price';
import { useLocale, useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { postData } from '@/lib/stripe/stripe-helpers';
import { getStripe } from '@/lib/stripe/stripeClient';
import { upperFirst } from 'lodash';
import { Badge } from '@/components/ui/badge';
import { calculateSave } from '@/hooks/calculate-save';
import { usePathname, useRouter } from '@/lib/i18n/routing';


interface ModalSubscriptionProps extends ModalType {
	product: Products;
	preselectedPrice?: Prices;
}

export function ModalSubscription({
	product,
	preselectedPrice,
	...props
} : ModalSubscriptionProps) {
	const { user } = useAuth();
	const common = useTranslations('common');
	const pathname = usePathname();
	const router = useRouter();
	const locale = useLocale();
	const { closeModal } = useModal();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [selectedProductPrice, setSelectedProductPrice] = useState<Prices | undefined>(preselectedPrice || product?.prices?.at(0));

	const handleCheckout = async (price: Prices) => {
		setIsLoading(true);
		if (!user) {
			toast.error(upperFirst(common('errors.not_logged_in')));
		  return router.push(`/auth/login?redirect=${encodeURIComponent(pathname)}`);
		}
		if (user?.premium) {
			toast.error(upperFirst(common('errors.already_premium')));
		  return router.push('/settings/subscription');
		}
	
		try {
		  const { sessionId } = await postData({
			url: '/api/stripe/create-checkout-session',
			data: { price },
		  });
		  const stripe = await getStripe();
		  stripe?.redirectToCheckout({ sessionId });
		} catch (error) {
		  return alert((error as Error)?.message);
		} finally {
		  setIsLoading(false);
		}
	};

	return (
		<Modal
			open={props.open}
			onOpenChange={(open) => !open && closeModal(props.id)}
			className='outline-none'
		>
			<ModalHeader>
				<ModalTitle>{upperFirst(common('messages.upgrade_to_plan', {
					plan: product?.name,
				}))}</ModalTitle>
				<ModalDescription>
				{upperFirst(common('messages.choose_subscription_recurrence'))}
				</ModalDescription>
			</ModalHeader>
			<ModalBody className='flex flex-col gap-2'>
				{product?.prices?.map((price, index) => (
					<Card
					key={price?.id}
					className={`
						flex items-center justify-between p-4 cursor-pointer hover:bg-muted-hover
					`}
					onClick={() => !isLoading && setSelectedProductPrice(price)}
					>
						<div
						className={`
							transition-colors
							${selectedProductPrice?.id === price?.id ? 'text-foreground' : 'text-muted-foreground'}
						`}
						>
							<span className='text-2xl font-bold'>{formatPrice(price, locale)}</span>
							<span className="pl-2 text-base font-medium">/ {common(`word.${price?.interval}`)}</span>
						</div>
						{index > 0 ? (
							<Badge variant='accent-1'>
							{upperFirst(common('messages.save_up_to_percent', {
								percent: calculateSave(price, product?.prices?.at(index - 1) ?? price),
							}))}
							</Badge>
						) : null}
						<Icons.check
						className={`
							text-accent-1 transition-opacity
							${selectedProductPrice?.id === price?.id ? 'opacity-100' : 'opacity-0'}
						`}
						/>
					</Card>
				))}
			</ModalBody>
			<ModalFooter>
				<Button
					variant='accent-1'
					disabled={isLoading}
					onClick={() => selectedProductPrice && handleCheckout(selectedProductPrice)}
				>
				{isLoading ? <Icons.loader className='w-6 h-6' /> : null}
				{upperFirst(common('messages.upgrade_to_plan', {
					plan: product?.name,
				}))}
				</Button>
			</ModalFooter>
		</Modal>
	);
};
