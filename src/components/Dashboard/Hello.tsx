'use client';

import { useAuth } from '@/context/auth-context';
import { useTranslations } from 'next-intl';

export const Hello = () => {
  const { user } = useAuth();
  const t = useTranslations('word');

  if (!user) return null;
  return (
    <div className="text-4xl font-bold">
      {t('hello')} {user.full_name}
    </div>
  );
}
