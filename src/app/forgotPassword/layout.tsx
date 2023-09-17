'use client';

import Loader from '@/components/elements/Loader/Loader';
import { useUser } from '@/context/UserProvider';
import { useRouter } from 'next/navigation';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();

  const { user } = useUser();

  if (user) {
    router.push('/');
  }

  return (
    <>
      {user === null && <Loader />}
      {user === false && <>{children}</>}
    </>
  );
}
