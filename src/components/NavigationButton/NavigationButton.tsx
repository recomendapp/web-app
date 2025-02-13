'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from '@/lib/i18n/routing';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function NavigationButton() {
  const router = useRouter();
  return (
    <>
      <Button
        onClick={router.back}
        variant="ghost"
        size="icon"
        className="rounded-full justify-center"
      >
        <ChevronLeft />
      </Button>
      <Button
        onClick={router.forward}
        variant="ghost"
        size="icon"
        className="rounded-full justify-center"
      >
        <ChevronRight />
      </Button>
    </>
  );
}
