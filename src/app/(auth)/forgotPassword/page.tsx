'use client';

import { useState } from 'react';
import { ForgotPasswordForm } from '@/components/modules/Auth/ForgotPassword/ForgotPasswordForm';
import { siteConfig } from '@/config/site';
import Image from 'next/image';

// export const metadata: Metadata = {
//   title: 'Se connecter',
//   description: '...',
// }

export default function ForgotPassword() {
  const [passwordRecoverySuccess, setPasswordRecoverySuccess] = useState(false);
  return (
    <main className="container h-full relative flex flex-col items-center justify-center">
      {!passwordRecoverySuccess ? (
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex justify-center">
              <Image
                src={siteConfig.logo.href}
                alt={siteConfig.logo.alt}
                width={150}
                height={150}
              />
            </div>
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Réinitialiser le mot de passe
              </h1>
            </div>
            <ForgotPasswordForm
              setPasswordRecoverySuccess={setPasswordRecoverySuccess}
            />
          </div>
        </div>
      ) : (
        <div className="lg:p-8">
          Un e-mail de réinitialisation a bien été envoyé 👌
        </div>
      )}
    </main>
  );
}
