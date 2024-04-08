import { ForgotPasswordForm } from '@/app/[lang]/(app)/auth/forgotPassword/_components/ForgotPasswordForm';
import { siteConfig } from '@/config/site';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mot de passe oublié',
  description: '...',
};

export default function ForgotPassword() {
  return (
    <main className="container h-full relative flex flex-col items-center justify-center">
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex justify-center">
            <Image
              src={siteConfig.logo.href}
              alt={siteConfig.logo.alt}
              width={400}
              height={400}
            />
          </div>
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Réinitialiser le mot de passe
            </h1>
          </div>
          <ForgotPasswordForm />
        </div>
      </div>
    </main>
  );
}
