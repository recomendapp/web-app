'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from '@/lib/i18n/routing';
import { upperFirst } from 'lodash';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function NavigationButton() {
  const router = useRouter();
  const common = useTranslations('common');
  return (
    <>
      <Button
        onClick={router.back}
        variant="ghost"
        size="icon"
        className="rounded-full justify-center"
      >
        <ChevronLeft />
        <span className="sr-only">{upperFirst(common('messages.backward'))}</span>
      </Button>
      <Button
        onClick={router.forward}
        variant="ghost"
        size="icon"
        className="rounded-full justify-center"
      >
        <ChevronRight />
        <span className="sr-only">{upperFirst(common('messages.forward'))}</span>
      </Button>
    </>
  );
}
