import {
  getActiveProductsWithPrices,
  getSession,
} from '@/lib/supabase/server';
import { Upgrade } from './_components/Upgrade';

export default async function UpgradePage() {
  const [session, products] = await Promise.all([
    getSession(),
    getActiveProductsWithPrices(),
  ]);
  return <Upgrade session={session} product={products.find((product) => product.name?.toLowerCase() === 'premium')} />;
}
