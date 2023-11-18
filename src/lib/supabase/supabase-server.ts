import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Price, ProductWithPrices } from "@/types/type.stripe";

export const createServerClient = () => {
  const cookieStore = cookies();
  return createServerComponentClient({ cookies: () => cookieStore });
};

export async function getSession() {
  const supabase = createServerClient();
  try {
    const {
      data: { session }
    } = await supabase.auth.getSession();
    return session;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export const getActiveProductsWithPrices = async (): Promise<ProductWithPrices[]> => {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from('products')
    .select('*, prices(*)')
    .eq('active', true)
    .eq('prices.active', true)
    .order('unit_amount', { foreignTable: 'prices', ascending: true })

  if (error)
      console.log(error);

  return (data) || [];
}

export async function getSubscription() {
  const supabase = createServerClient();
  try {
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('*, prices(*, products(*))')
      .in('status', ['trialing', 'active'])
      .maybeSingle()
      .throwOnError();
    return subscription;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}
