'use client';

import { useState, useEffect } from 'react';
import { Metadata } from 'next';
import { usePathname, useSearchParams } from 'next/navigation';
import { account } from '@/lib/appwrite';
import { toast } from 'react-toastify';
import { useUser } from '@/context/UserProvider';

// export const metadata: Metadata = {
//   title: 'Vérifier Email',
//   description: '...',
// }

export default function VerifyEmail() {
  const { userRefresh } = useUser();

  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');
  const secret = searchParams.get('secret');
  const [isLoading, setIsLoading] = useState(true);
  const [verifyEmail, setVerifyEmail] = useState<any>();

  useEffect(() => {
    userId &&
      secret &&
      account
        .updateVerification(String(userId), String(secret))
        .then(() => {
          setVerifyEmail(true);
          setIsLoading(false);
          userRefresh();
          toast.success('Ton email a bien été confirmé 👌', {
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: 'colored',
          });
        })
        .catch((error) => {
          setVerifyEmail(false);
          setIsLoading(false);
          toast.error('Ton lien de validation a expiré 🤯', {
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: 'colored',
          });
        });
  }, [userId, secret, userRefresh]);

  return (
    <main className="container h-full relative flex flex-col items-center justify-center">
      {/* {(verifyEmail === undefined) && (
                    <Skeleton className='h-5 w-60 rounded-full' />
                )} */}
      {verifyEmail && <div>Ton email a bien été confirmé 👌</div>}
      {verifyEmail === false && <div>Ton lien de validation a expiré 🤯</div>}
      {(!userId || !secret) && <div>Tu t&apos;es perdu ? 🤯</div>}
    </main>
  );
}
