import { LoginForm } from '@/app/(auth)/login/LoginForm';
import { siteConfig } from '@/config/site';
import { useUser } from '@/context/UserProvider';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'À propos',
};

export default function About() {
  return (
    <main className="container h-full relative flex flex-col items-center justify-center">
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col items-center justify-center space-y-6 sm:w-[350px]">
          ABOUT
        </div>
      </div>
    </main>
  );
}
