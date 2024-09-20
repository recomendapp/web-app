import Stripe from 'stripe';

export interface Product {
  id: string;
  active?: boolean;
  description?: string;
  features: Stripe.Product.MarketingFeature[];
  image?: string;
  metadata?: Stripe.Product.MarketingFeature[];
  name?: string;
}

export interface ProductWithPrices extends Product {
  prices?: Price[];
}

export interface Price {
  id: string;
  product_id?: string;
  active?: boolean;
  description?: string;
  unit_amount?: number;
  currency?: string;
  type?: Stripe.Price.Type;
  interval?: Stripe.Price.Recurring.Interval;
  interval_count?: number;
  trial_period_days?: number | null;
  metadata?: Stripe.Metadata;
}

export interface PriceWithProduct extends Price {
  products: Product | null;
}

export interface Customer {
  id: string;
  stripe_customer_id?: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  status: string;
}

export interface SubscriptionWithProduct extends Subscription {
  prices: PriceWithProduct | null;
}
