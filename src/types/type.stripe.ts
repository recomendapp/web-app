import Stripe from "stripe";

export interface Product {
    id: string;
    active?: boolean;
    name?: string;
    description?: string;
    image?: string;
    metadata?: Stripe.Metadata;
    features: Stripe.Product.Feature[]
}

export interface ProductWithPrice extends Product {
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
    products?: Product;
}

export interface Customer {
    id: string;
    stripe_customer_id?: string;
}

export interface Subscription {
    id: string,
    user_id: string,
    status: string,
    prices: Price
}