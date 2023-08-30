'use client';

import Loader from '@/components/loader';
import { useUser } from '@/context/user';
import { useRouter, useSearchParams } from 'next/navigation';
import { parse } from 'url';

interface LayoutResetPasswordProps {
  children: React.ReactNode;
}

export default function LayoutResetPassword({
  children,
}: LayoutResetPasswordProps) {
  const searchParams = useSearchParams();

  const url = searchParams.toString();

  const parsedUrl = parse(url, true);

  const expire = new Date(parsedUrl.query.expire as string);

  const router = useRouter();

  const { user } = useUser();

  // if (user) {
  //     router.push('/')
  // }

  return <>{user === null || !expire ? <Loader /> : <>{children}</>}</>;
}
