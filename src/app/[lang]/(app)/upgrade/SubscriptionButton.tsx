"use client"

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext/auth-context";
import { postData } from "@/lib/stripe/stripe-helpers";
import { getStripe } from "@/lib/stripe/stripeClient";
import { Price, Product } from "@/types/type.stripe";
import { useState } from "react";
import toast from "react-hot-toast";

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

    return (
        <Button
            onClick={() => handleCheckout(price)}
            disabled={(user && user?.subscriptions?.edges?.length > 0 ) || price.id === priceIdLoading || !user || loading}
        >
            {!user || loading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
                <>
                    {user.subscriptions.edges.length ? 'Already subscribed'
                    : !user.subscriptions.edges.length && offer.name === "Free" && 'Already subscribed'}
                </>
            )}
        </Button>
    )
}