"use server"

import Stripe from 'stripe';
import { Session } from '@supabase/supabase-js';
import { stripe } from '@/lib/stripe/stripe';
import { toDateTime } from '@/lib/stripe/stripe-helpers';
import { supabaseAdmin } from '../supabase/supabase-admin';
import { siteConfig } from '@/config/site';
import { Database } from '@recomendapp/types/dist';

const upsertProductRecord = async (product: Stripe.Product) => {
  const productData: Database['public']['Tables']['products']['Row'] = {
	id: product.id,
	active: product.active,
	name: product.name,
	description: product.description,
	image: product.images?.[0] ?? null,
	metadata: product.metadata,
	features: product.marketing_features as any,
  };

  const { error } = await supabaseAdmin.from('products').upsert([productData]);
  if (error) throw error;
  console.log(`Product inserted/updated: ${product.id}`);
};

const upsertPriceRecord = async (price: Stripe.Price) => {
  const priceData: Database['public']['Tables']['prices']['Row'] = {
	id: price.id,
	product_id: typeof price.product === 'string' ? price.product : '',
	active: price.active,
	currency: price.currency,
	description: price.nickname,
	type: price.type,
	unit_amount: price.unit_amount,
	interval: price.recurring?.interval as any,
	interval_count: price.recurring?.interval_count as any,
	trial_period_days: price.recurring?.trial_period_days as any,
	metadata: price.metadata,
  };

  const { error } = await supabaseAdmin.from('prices').upsert([priceData]);
  if (error) throw error;
  console.log(`Price inserted/updated: ${price.id}`);
};

const deleteProductRecord = async (product: Stripe.Product) => {
  const { error: deletionError } = await supabaseAdmin
	.from('products')
	.delete()
	.eq('id', product.id);
  if (deletionError)
	throw new Error(`Product deletion failed: ${deletionError.message}`);
  console.log(`Product deleted: ${product.id}`);
};

const deletePriceRecord = async (price: Stripe.Price) => {
  const { error: deletionError } = await supabaseAdmin
	.from('prices')
	.delete()
	.eq('id', price.id);
  if (deletionError) throw new Error(`Price deletion failed: ${deletionError.message}`);
  console.log(`Price deleted: ${price.id}`);
};

const createOrRetrieveCustomer = async ({
  email,
  uuid,
}: {
  email: string;
  uuid: string;
}) => {
  const { data, error } = await supabaseAdmin
	.from('customers')
	.select('stripe_customer_id')
	.eq('id', uuid)
	.single();
  if (error || !data?.stripe_customer_id) {
	const customerData: { metadata: { supabaseUUID: string }; email?: string } =
	  {
		metadata: {
		  supabaseUUID: uuid,
		},
	  };
	if (email) customerData.email = email;
	const customer = await stripe.customers.create(customerData);
	const { error: supabaseError } = await supabaseAdmin
	  .from('customers')
	  .insert([{ id: uuid, stripe_customer_id: customer.id }]);
	if (supabaseError) throw supabaseError;
	console.log(`New customer created and inserted for ${uuid}.`);
	return customer.id;
  }
  return data.stripe_customer_id;
};

const copyBillingDetailsToCustomer = async (
  uuid: string,
  payment_method: Stripe.PaymentMethod
) => {
  //Todo: check this assertion
  const customer = payment_method.customer as string;
  const { name, phone, address } = payment_method.billing_details;
  if (!name || !phone || !address) return;
  //@ts-ignore
  await stripe.customers.update(customer, { name, phone, address });
  const { error } = await supabaseAdmin
	.from('user_billing')
	.upsert({
	  user_id: uuid,
	  billing_address: { ...address },
	  payment_method: { ...payment_method[payment_method.type] },
	});
  if (error) throw error;
};

const manageSubscriptionStatusChange = async (
  subscriptionId: string,
  customerId: string,
  createAction = false
) => {
  // Get customer's UUID from mapping table.
  const { data: customerData, error: noCustomerError } = await supabaseAdmin
	.from('customers')
	.select('id')
	.eq('stripe_customer_id', customerId)
	.single();
  if (noCustomerError) throw noCustomerError;

  const { id: uuid } = customerData!;

  const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
	expand: ['default_payment_method'],
  });
  // Upsert the latest status of the subscription object.
  const subscriptionData: Database['public']['Tables']['user_subscriptions']['Insert'] =
	{
	  id: subscription.id,
	  user_id: uuid,
	  metadata: subscription.metadata,
	  // @ts-ignore
	  status: subscription.status,
	  price_id: subscription.items.data[0].price.id,
	  //TODO check quantity on subscription
	  // @ts-ignore
	  quantity: subscription.quantity,
	  cancel_at_period_end: subscription.cancel_at_period_end,
	  cancel_at: subscription.cancel_at
		? toDateTime(subscription.cancel_at).toISOString()
		: null,
	  canceled_at: subscription.canceled_at
		? toDateTime(subscription.canceled_at).toISOString()
		: null,
	  current_period_start: toDateTime(
		subscription.current_period_start
	  ).toISOString(),
	  current_period_end: toDateTime(
		subscription.current_period_end
	  ).toISOString(),
	  created: toDateTime(subscription.created).toISOString(),
	  ended_at: subscription.ended_at
		? toDateTime(subscription.ended_at).toISOString()
		: null,
	  trial_start: subscription.trial_start
		? toDateTime(subscription.trial_start).toISOString()
		: null,
	  trial_end: subscription.trial_end
		? toDateTime(subscription.trial_end).toISOString()
		: null,
	};

  const { error } = await supabaseAdmin
	.from('user_subscriptions')
	.upsert([subscriptionData]);
  if (error) throw error;
  console.log(
	`Inserted/updated subscription [${subscription.id}] for user [${uuid}]`
  );

  // For a new subscription copy the billing details to the customer object.
  // NOTE: This is a costly operation and should happen at the very end.
  if (createAction && subscription.default_payment_method && uuid)
	//@ts-ignore
	await copyBillingDetailsToCustomer(
	  uuid,
	  subscription.default_payment_method as Stripe.PaymentMethod
	);
};

const getUrlCustomerPortal = async (session: Session, returnDomain: string = siteConfig.url) => {
  const customer = await createOrRetrieveCustomer({
	uuid: session.user.id || '',
	email: session.user.email || '',
  });
  if (!customer) throw Error('Could not get customer');
  const { url } = await stripe.billingPortal.sessions.create({
	customer,
	return_url: `${returnDomain}/settings/subscription`,
  });
  return url;
};

export {
  upsertProductRecord,
  upsertPriceRecord,
  deleteProductRecord,
  deletePriceRecord,
  createOrRetrieveCustomer,
  manageSubscriptionStatusChange,
  getUrlCustomerPortal,
};
