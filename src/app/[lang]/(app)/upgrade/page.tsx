import { createServerClient, getActiveProductsWithPrices, getSession, getSubscription } from "@/lib/supabase/supabase-server"
import { Price, ProductWithPrices } from "@/types/type.stripe"
import SubscriptionButton from "./SubscriptionButton";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Pricing from "@/components/Subscription/Pricing";


export default async function Upgrade() {
    const [session, products, subscription] = await Promise.all([
        getSession(),
        getActiveProductsWithPrices(),
        getSubscription()
      ]);

    return (
        <main className="h-full w-full flex flex-col gap-8 p-4">
            <Pricing
                session={session}
                user={session?.user}
                products={products}
                subscription={subscription}
            />
        </main>
    )
}

const formatPrice = (price: Price) => {
    const priceString = new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: price.currency,
        minimumFractionDigits: 0
    }).format((price?.unit_amount || 0) / 100);
  
    return priceString;
  };