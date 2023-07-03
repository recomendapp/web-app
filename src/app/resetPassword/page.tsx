"use client"

import { useState, useEffect } from 'react'
import { Metadata } from 'next'
import { usePathname, useSearchParams } from 'next/navigation';
import { account } from '@/utils/appwrite';
import { toast } from 'react-toastify';
import { Skeleton } from '@/components/ui/skeleton';
import { ResetPasswordForm } from '@/app/resetPassword/ResetPasswordForm';

export const metadata: Metadata = {
  title: 'Vérifier Email',
  description: '...',
}

export default function ResetPassword() {
    const searchParams = useSearchParams()
    const userId = searchParams.get('userId');
    const secret = searchParams.get('secret');
    const expire = searchParams.get('expire');
    // const currentDate = new Date();
    // const [ isExpired, setIsExpired] = useState<boolean | null>(null)

    // useEffect(() => {
    //     if(expire) {
    //         const expirationDate = new Date(expire);
    //         setIsExpired(currentDate > expirationDate)
    //     }
    // }, [expire])

    return (
        <main className="container h-full relative flex flex-col items-center justify-center">
                {userId && secret && expire ? (
                    <div className="lg:p-8">
                        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                            <div className="flex flex-col space-y-2 text-center">
                                <h1 className="text-2xl font-semibold tracking-tight">
                                    Réinitialiser le mot de passe
                                </h1>
                                {/* <p className="text-sm text-muted-foreground">
                                    Entrez votre adresse e-mail et votre mot de passe ci-dessous pour créer votre compte.
                                </p> */}
                            </div>
                            <ResetPasswordForm />
                        </div>
                    </div>
                ) : (
                    <div>
                        Ton lien de récupération a expiré 🤯
                    </div>
                )}
        </main>
    );
}