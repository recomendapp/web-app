'use client';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Fragment } from 'react';

export default function NavigationButton() {
  const router = useRouter();
  return (
    <Fragment>
      <Button
        onClick={router.back}
        variant="ghost"
        size="icon"
        className="rounded-full hidden lg:flex justify-center"
      >
        <ChevronLeft />
      </Button>
      <Button
        onClick={router.forward}
        variant="ghost"
        size="icon"
        className="rounded-full hidden lg:flex justify-center"
      >
        <ChevronRight />
      </Button>
    </Fragment>
  );
}
