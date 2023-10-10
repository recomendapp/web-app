"use client"

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext/AuthProvider";
import { postData } from "@/lib/stripe/stripe-helpers";
import { getStripe } from "@/lib/stripe/stripeClient";
import { Price, Product } from "@/types/type.stripe";
import { useState } from "react";
import { toast } from "react-toastify";

export default function SubscriptionButton({
    offer,
    price
} : {
    offer: Product,
    price: Price
}) {

    const { user, loading } = useAuth();

    const [ priceIdLoading, setPriceIdLoading ] = useState<string>()

    const handleCheckout = async (price: Price) => {
        setPriceIdLoading(price.id)

        if (!user) {
            setPriceIdLoading(undefined);
            return toast.error('Must be logged in');
        }

        // if (subscrip)
        
        try {
            const { sessionId } = await postData({
                url: '/api/create-checkout-session',
                data: {
                     price
                }
            });

            const stripe = await getStripe();
            stripe?.redirectToCheckout({ sessionId });
        } catch (error) {
            toast.error((error as Error)?.message);
        } finally {
            setPriceIdLoading(undefined);
        }
    }

    console.log('user', user?.subscription)
    return (
        <Button
            onClick={() => handleCheckout(price)}
            disabled={(user && user?.subscription?.edges?.length > 0 ) || price.id === priceIdLoading || !user || loading}
        >
            {!user || loading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
                <>
                    {user.subscription.edges.length ? 'Already subscribed'
                    : !user.subscription.edges.length && offer.name === "Free" && 'Already subscribed'}
                </>
            )}
        </Button>
    )
}