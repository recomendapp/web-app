'use client';

import Loader from '@/components/elements/Loader/Loader';
import { useAuth } from '@/context/AuthContext/AuthProvider';
import { useRouter } from 'next/navigation';

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const router = useRouter();

  const { session, loading } = useAuth();

  if (session) {
    router.push('/');
  }

  return (
    <>
      {loading && <Loader />}
      {!loading && !session && <>{children}</>}
    </>
  );
}
