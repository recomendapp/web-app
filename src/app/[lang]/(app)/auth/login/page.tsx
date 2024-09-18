"use client";

import { LoginForm } from '@/app/[lang]/(app)/auth/login/_components/LoginForm';
import { siteConfig } from '@/config/site';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function Login() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/';
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
              Se connecter
            </h1>
          </div>
          <LoginForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            Pas encore de compte ?{' '}
            <Link
              href={`/auth/signup?redirect=${encodeURIComponent(redirectTo)}`}
              className="underline underline-offset-4 hover:text-foreground"
            >
              S&apos;inscrire
            </Link>{' '}
          </p>
        </div>
      </div>
    </main>
  );
}
