import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { upperFirst } from 'lodash';
import { CardMedia } from '@/components/Card/CardMedia';
import { getTranslations } from 'next-intl/server';
import { Link } from "@/lib/i18n/routing";
import { Button } from '@/components/ui/button';
import { MediaTvSeriesAggregateCredits } from '@/types/type.db';

interface WidgetPersonTvSeriesProps extends React.HTMLAttributes<HTMLDivElement> {
  personSlug: string;
  credits: MediaTvSeriesAggregateCredits[];
  lang: string;
}

export async function WidgetPersonTvSeries({
  personSlug,
	credits,
  lang,
} : WidgetPersonTvSeriesProps) {
  const common = await getTranslations({ locale: lang, namespace: 'common' });
  if (!credits || credits.length === 0) return null;
  return (
    <div className="flex flex-col gap-2">
      <Button variant={'link'} size={'fit'} className='font-semibold text-xl p-0' asChild>
        <Link href={`/person/${personSlug}/tv_series`}>
        {upperFirst(common('messages.tv_series', { count: 2 }))}
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
