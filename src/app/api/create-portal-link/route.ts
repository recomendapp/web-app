import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/stripe';
import { getURL } from '@/lib/stripe/stripe-helpers';
import { createOrRetrieveCustomer } from '@/lib/supabase/supabase-admin';
import { createRouteHandlerClient } from '@/lib/supabase/route';

export async function POST() {
  try {
    const supabase = createRouteHandlerClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) throw Error('Could not get user');
    const customer = await createOrRetrieveCustomer({
      uuid: user.id || '',
      email: user.email || '',
    });

    if (!customer) throw Error('Could not get customer');
    const { url } = await stripe.billingPortal.sessions.create({
      customer,
      return_url: `${location.origin}/settings/subscription`,
    });

    return NextResponse.json({ url });
  } catch (err: any) {
    console.log(err);
    new NextResponse('Internal Error', { status: 500 });
  }
}
