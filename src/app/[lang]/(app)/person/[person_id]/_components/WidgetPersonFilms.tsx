import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { upperFirst } from 'lodash';
import { CardMedia } from '@/components/Card/CardMedia';
import { getTranslations } from 'next-intl/server';
import { MediaMovieAggregateCredits } from '@/types/type.db';
import { Link } from "@/lib/i18n/routing";
import { Button } from '@/components/ui/button';

interface WidgetPersonFilmsProps extends React.HTMLAttributes<HTMLDivElement> {
	personSlug: string;
  credits: MediaMovieAggregateCredits[];
  lang: string;
}

export async function WidgetPersonFilms({
  personSlug,
	credits,
  lang,
} : WidgetPersonFilmsProps) {
  const common = await getTranslations({ locale: lang, namespace: 'common' });
  return (
    <div className="flex flex-col gap-2">
      <Button variant={'link'} size={'fit'} className='font-semibold text-xl p-0' asChild>
        <Link href={`/person/${personSlug}/films`}>
        {upperFirst(common('word.film', { count: 2 }))}
        </Link>
      </Button>
      <ScrollArea className="rounded-md">
        <div className="flex space-x-4 pb-4">
          {credits?.map((credit, i) => (
            <CardMedia
            key={i}
            variant='poster'
            media={credit.media!}
            className='w-24 lg:w-32'
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
