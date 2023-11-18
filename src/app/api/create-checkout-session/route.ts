import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/stripe';
import { getURL } from '@/lib/stripe/stripe-helpers';
import { createOrRetrieveCustomer } from '@/lib/supabase/supabase-admin';
import { createRouteHandlerClient } from '@/lib/supabase/route';

export async function POST(
  request: Request
) {
  const { price, quantity = 1, metadata = {} } = await request.json();

  try {
    const supabase = createRouteHandlerClient();
    const {
      data: { user }
    } = await supabase.auth.getUser();

    const customer = await createOrRetrieveCustomer({
      uuid: user?.id || '',
      email: user?.email || ''
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      customer,
      line_items: [
        {
          price: price.id,
          quantity
        }
      ],
      mode: 'subscription',
      allow_promotion_codes: true,
      subscription_data: {
        // trial_from_plan: true,
        metadata
      },
      success_url: `${getURL()}/settings/subscription`,
      cancel_url: `${getURL()}/`
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (err: any) {
    console.log(err);
    return new NextResponse('Internal Error', { status: 500 });
  }
}