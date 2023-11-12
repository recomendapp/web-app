import { createServerClient } from "@/lib/supabase/supabase-server"
import { Price, ProductWithPrice } from "@/types/type.stripe"
import SubscriptionButton from "./SubscriptionButton";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";


export default async function Upgrade() {
    const subscriptions = await getActiveProductsWithPrices();
    const supabase = createServerClient();
    const { data: { session } } = await supabase.auth.getSession();

    let content = (
        <div>
            No products available.
        </div>
    )

    if (subscriptions.length) {
        content = (
            <div className="flex flex-col gap-4 lg:flex-row justify-center">
                {/* <div className="flex flex-col gap-2 bg-muted p-4 rounded-md">
                    <p className="text-center">Free</p>
                    <p></p>
                    <Button>

                    </Button>
                </div> */}
                {subscriptions.map((offer) => {
                    if (!offer.prices?.length) {
                        return (
                            <div key={offer.id}>
                                No prices available
                            </div>
                        );
                    }

                    return offer.prices.map((price) => (
                        <div
                            key={price.id}
                            className={`
                                flex flex-col gap-2 p-4 rounded-md lg:w-[300px]
                                ${offer.name === "Premium" ? 'bg-accent-1 text-background'
                                : 'bg-muted'
                                }
                            `}
                        >
                            <p>
                                <span className="text-5xl font-bold">{formatPrice(price)}</span>
                                <span className="font-semibold"> / {price.interval}</span>
                            </p>
                            <p className="text-xl font-bold">{offer.name}</p>
                            <section className="flex-1 flex flex-col gap-2">
                                {offer.features.map((feature) => (
                                    <p key={feature.name} className="flex gap-2 items-center">
                                        <Check className="bg-background rounded-full text-accent-1 p-1 shrink-0"/>
                                        <span>{feature.name}</span>
                                    </p>
                                ))}
                            </section>
                            <p>{offer.description}</p>
                            {session ?
                                <SubscriptionButton offer={offer} price={price} />
                            :
                            <Button asChild>
                                <Link href='/login'>
                                    Subscribe
                                </Link>
                            </Button>
                            }
                        </div>
                    ))
                })}
            </div>
        )
    }
    

    return (
        <main className="h-full w-full flex flex-col gap-8 p-4">
            <section className="flex justify-center items-center">
                <Sparkles className="mr-2 h-16 w-16" />
                <h1 className="text-6xl font-bold text-center">
                    Upgrade
                </h1>
            </section>
            {content}
        </main>
    )
}

export const getActiveProductsWithPrices = async (): Promise<ProductWithPrice[]> => {
    const supabase = createServerClient();

    const { data, error } = await supabase
        .from('products')
        .select('*, prices(*)')
        .eq('active', true)
        .eq('prices.active', true)
        .order('unit_amount', { foreignTable: 'prices' })
    
    if (error)
        console.log(error);

    return (data as any) || [];
}

const formatPrice = (price: Price) => {
    const priceString = new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: price.currency,
        minimumFractionDigits: 0
    }).format((price?.unit_amount || 0) / 100);
  
    return priceString;
};