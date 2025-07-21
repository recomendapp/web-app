'use client';

import Loader from '@/components/Loader/Loader';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/context/auth-context';
import { Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link, useRouter } from "@/lib/i18n/routing";
import { getUrlCustomerPortal } from '@/lib/stripe/stripe-functions';
import { useUserSubscriptionsQuery } from '@/features/client/user/userQueries';

export default function SettingsAccountPage() {
  const { user, session } = useAuth();
  const t = useTranslations('pages.settings');
  const router = useRouter();

  const {
    data: subscription,
  } = useUserSubscriptionsQuery({
    userId: user?.id,
  })

  const redirectToCustomerPortal = async () => {
    try {
      if (!session) throw Error('Could not get user');
      const url = await getUrlCustomerPortal(session, location.origin);
      router.push(url);
    } catch (error) {
      console.error(error);
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
          {subscription ? (
            <>
              <p className="pb-4 sm:pb-0">
                You are currently on the{' '}
                <b>
                  {subscription.price?.product?.name}
                </b>{' '}
                plan
              </p>
              <Button
                variant={'accent-yellow-enabled'}
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
              <Button variant={'accent-yellow-enabled'} asChild>
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
