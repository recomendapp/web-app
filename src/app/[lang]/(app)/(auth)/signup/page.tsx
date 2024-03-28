import { SignupForm } from '@/app/[lang]/(app)/(auth)/signup/_components/SignupForm';
import { siteConfig } from '@/config/site';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "S'inscrire",
};

export default function Signup() {
  return (
    <main className="p-4 h-full relative flex flex-col items-center justify-center">
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
              Créer un compte
            </h1>
          </div>
          <SignupForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            Déjà inscrit ?{' '}
            <Link
              href="/login"
              className="underline underline-offset-4 hover:text-primary"
            >
              Se connecter
            </Link>{' '}
          </p>
        </div>
      </div>
    </main>
  );
}
