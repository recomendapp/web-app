'use client';
import Loader from '@/components/Loader/Loader';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/context/AuthContext/AuthProvider';
import { Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function SettingsAccountPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Abonnement</h3>
        {/* <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p> */}
      </div>
      <Separator />
      {!user ? 
        <Loader />
      :
        <section>
          {user.subscription.edges.length ?
            <p>You are currently on the <b>{user.subscription.edges[0].node.prices.products?.name}</b> plan</p>
          :
            <div>
              <p>You are currently on the <b>Free</b> plan</p>
              <Button variant={'accent-1'} asChild>
                <Link href={'/upgrade'}>
                  <Sparkles className="mr-2 h-4 w-4" />
                  <span>Upgrade to Premium</span>
                </Link>
              </Button>
            </div>
          }
        </section>
      }
      {/* <AccountForm /> */}
    </div>
  );
}
