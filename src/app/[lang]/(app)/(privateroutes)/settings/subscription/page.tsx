'use client';
import Loader from '@/components/Loader/Loader';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/context/auth-context';
import { postData } from '@/lib/stripe/stripe-helpers';
import { supabase } from '@/lib/supabase/client';
import { Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// BILLINGPORTAL STRIPE
import { stripe } from '@/lib/stripe/stripe';
import { getURL } from '@/lib/stripe/stripe-helpers';
import { createOrRetrieveCustomer } from '@/lib/supabase/supabase-admin';

export default function SettingsAccountPage() {
  const { user, session } = useAuth();
  const t = useTranslations('settings');

  const router = useRouter();

  const redirectToCustomerPortal = async () => {
    console.log('redirectToCustomerPortal', getURL());
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw Error('Could not get user');
      const customer = await createOrRetrieveCustomer({
        uuid: user.id || '',
        email: user.email || '',
      });
      if (!customer) throw Error('Could not get customer');
      const { url } = await stripe.billingPortal.sessions.create({
        customer,
        return_url: `${getURL()}/settings/subscription`,
      });
      router.push(url);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{t('subscription.label')}</h3>
        {/* <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p> */}
      </div>
      <Separator />
      {!user ? (
        <Loader />
      ) : (
        <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
          {user?.subscriptions?.edges.length ? (
            <>
              <p className="pb-4 sm:pb-0">
                You are currently on the{' '}
                <b>
                  {user?.subscriptions.edges[0]?.node?.prices?.products?.name}
                </b>{' '}
                plan
              </p>
              <Button
                variant={'accent-1-enabled'}
                disabled={!session}
                onClick={redirectToCustomerPortal}
              >
                Open customer portal
              </Button>
            </>
          ) : (
            <>
              <p className="pb-4 sm:pb-0">
                You are currently on the <b>Free</b> plan
              </p>
              <Button variant={'accent-1-enabled'} asChild>
                <Link href={'/upgrade'}>
                  <Sparkles className="mr-2 h-4 w-4" />
                  <span>Upgrade to Premium</span>
                </Link>
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
