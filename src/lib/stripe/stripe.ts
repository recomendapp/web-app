import Stripe from 'stripe';

export const stripe = new Stripe(
  process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY ?? '',
  {
    apiVersion: '2025-01-27.acacia',
    appInfo: {
      name: 'Recomend Web App',
      version: '1.0',
    },
  }
);
