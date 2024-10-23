'use client';

import { Button } from '@/components/ui/button';
import { postData } from '@/lib/stripe/stripe-helpers';
import { getStripe } from '@/lib/stripe/stripeClient';
import { Session } from '@supabase/supabase-js';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import { useLocale } from 'next-intl';
import { useAuth } from '@/context/auth-context';
import { Icons } from '../../config/icons';
import { Prices, Products } from '@/types/type.db';
import { useQuery } from '@tanstack/react-query';
import { useSupabaseClient } from '@/context/supabase-context';

interface Props {
  session: Session | null;
  products: Products[];
  className?: string;
  title?: boolean;
}

type BillingInterval = 'lifetime' | 'year' | 'month';

export default function Pricing({
  session,
  products,
  className,
  title = true,
}: Props) {
  const { user } = useAuth();
  const pathname = usePathname();
  const locale = useLocale();
  const intervals = Array.from(
    new Set(
      products.flatMap(
        (product) => product?.prices?.map((price) => price?.interval)
      )
    )
  );
  const router = useRouter();
  const [billingInterval, setBillingInterval] =
    useState<BillingInterval>('month');
  const [priceIdLoading, setPriceIdLoading] = useState<string>();

  const handleCheckout = async (price: Prices) => {
    setPriceIdLoading(price?.id);
    if (!session) {
      return router.push(`/auth/login?redirect=${encodeURIComponent(pathname)}`);
    }
    if (user?.premium|| price?.unit_amount === 0) {
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
      setPriceIdLoading(undefined);
    }
  };

  return (
    <div
      className={cn(
        'max-w-6xl px-4 py-8 space-y-4 mx-auto sm:py-24 sm:px-6 lg:px-8',
        className
      )}
    >
      {title && (
        <div className="sm:flex sm:flex-col sm:align-center">
          <h1 className="text-4xl text-white sm:text-center sm:text-6xl">
            Pricing Plans
          </h1>
        </div>
      )}
      <div className="flex flex-col gap-4 items-center">
        <Tabs
          defaultValue={billingInterval}
          className="w-full lg:w-[400px] self-center "
        >
          <TabsList className="grid w-full grid-cols-2">
            {intervals.includes('month') && (
              <TabsTrigger
                onClick={() => setBillingInterval('month')}
                value="month"
              >
                Monthly
              </TabsTrigger>
            )}
            {intervals.includes('year') && (
              <TabsTrigger
                onClick={() => setBillingInterval('year')}
                value="year"
              >
                Yearly
              </TabsTrigger>
            )}
          </TabsList>
        </Tabs>
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4">
          {products.map((product) => {
            const price = product?.prices?.find(
              (price) => price?.interval === billingInterval
            );
            if (!price) return null;
            return (
              <OfferCard
                key={product?.id}
                locale={locale}
                product={product}
                price={price}
                billingInterval={billingInterval}
                handleCheckout={handleCheckout}
                session={session}
                priceIdLoading={priceIdLoading}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

const OfferCard = ({
  locale,
  product,
  price,
  billingInterval,
  handleCheckout,
  session,
  priceIdLoading,
}: {
  locale: string;
  product: Products;
  price: Prices;
  billingInterval: BillingInterval;
  handleCheckout: (price: Prices) => void;
  session?: Session | null;
  priceIdLoading?: string;
}) => {
  const supabase = useSupabaseClient();
  const { user, loading } = useAuth();

  const {
    data: subscription,
    isLoading
  } = useQuery({
    queryKey: ['user', user?.id, 'subscription'],
    queryFn: async () => {
      if (!user?.id) return;
      const { data, error } = await supabase
        .from('user_subscriptions')
        .select(`
          *,
          price:prices(
            *,
            product:products(*)
          )
        `)
        .eq('user_id', user.id)
        .in('status', ['active', 'trialing'])
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  })

  return (
    <div
      className={cn(
        'rounded-md shadow-sm bg-muted border border-transparent',
        {
        ' border-accent-1': product?.name === subscription?.price?.product?.name
            || (price?.unit_amount === 0 && session && !subscription && !loading),
        }
      )}
    >
      <div className="flex flex-col gap-4 p-6 h-full">
        <h2 className="text-2xl font-semibold">{product?.name}</h2>
        <p className="text-muted-foreground">{product?.description}</p>
        <section className="flex-1 flex flex-col gap-2">
          {Array.isArray(product?.features) && product?.features.map((feature: any) => (
            <p key={feature.name} className="flex gap-2 items-center">
              <Check className="text-accent-1 p-1 shrink-0" />
              <span>{feature.name}</span>
            </p>
          ))}
        </section>
        <section className="flex flex-col gap-4">
          <p>
            <span className="text-5xl font-extrabold">
              {formatPrice(price, locale)}
            </span>
            <span className="text-base font-medium"> / {billingInterval}</span>
          </p>
          <Button
            disabled={priceIdLoading === price?.id || loading}
            variant={
              subscription &&
              product?.name === subscription.price?.product?.name
                ? 'accent-1-enabled'
                : price?.unit_amount === 0 && !!session
                  ? 'accent-1-enabled'
                  : 'accent-1'
            }
            type="button"
            onClick={() => handleCheckout(price)}
            className="font-semibold"
          >
            {
              priceIdLoading === price?.id || loading ? <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              : subscription &&
                product?.name === subscription?.price?.product?.name
                ? 'Manage'
                : price?.unit_amount === 0 && !!session
                  ? 'Manage'
                  : session
                    ? 'Upgrade'
                    : 'Subscribe'
            }
          </Button>
        </section>
      </div>
    </div>
  );
};

const formatPrice = (price: Prices, language: string) => {
  if (!price?.currency) return '';
  const priceString = new Intl.NumberFormat(language, {
    style: 'currency',
    currency: price?.currency,
    minimumFractionDigits: 0,
  }).format((price?.unit_amount || 0) / 100);

  return priceString;
};
