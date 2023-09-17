'use client';

import Loader from '@/components/elements/Loader/Loader';
import { useUser } from '@/context/UserProvider';
import { useRouter } from 'next/navigation';

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const router = useRouter();

  const { user } = useUser();

  if (user === false) {
    router.push('/login');
  }

  return (
    <>
      {user === null && <Loader />}
      {user && <>{children}</>}
    </>
  );
}
