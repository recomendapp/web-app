import {
  getActiveProductsWithPrices,
  getSession,
} from '@/lib/supabase/server';
import { Price } from '@/types/type.stripe';
import Pricing from '@/components/Subscription/Pricing';

export default async function Upgrade() {
  const [session, products] = await Promise.all([
    getSession(),
    getActiveProductsWithPrices(),
  ]);

  return (
    <main className="h-full w-full flex flex-col gap-8 p-4">
      <Pricing
        session={session}
        products={products}
      />
    </main>
  );
}
