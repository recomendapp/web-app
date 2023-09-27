'use client';

import Loader from '@/components/elements/Loader/Loader';
import { useAuth } from '@/context/AuthContext/AuthProvider';
import { redirect } from 'next/navigation';

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const { session, loading } = useAuth();

  if (session) {
    redirect('/');
  }

  return (
    <>
      {loading && <Loader />}
      {!loading && !session && <>{children}</>}
    </>
  );
}
