import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { upperFirst } from 'lodash';
import { Link } from "@/lib/i18n/navigation";
import { buttonVariants } from '@/components/ui/button';
import { MediaTvSeriesAggregateCredits } from '@recomendapp/types';
import { CardTvSeries } from '@/components/Card/CardTvSeries';
import { SupportedLocale } from '@/translations/locales';
import { cn } from '@/lib/utils';
import { getT } from '@/lib/i18n';

interface WidgetPersonTvSeriesProps extends React.HTMLAttributes<HTMLDivElement> {
  personSlug: string;
  credits: MediaTvSeriesAggregateCredits[];
  lang: SupportedLocale;
}

export async function WidgetPersonTvSeries({
  personSlug,
	credits,
  lang,
} : WidgetPersonTvSeriesProps) {
  const { t } = await getT();
  if (!credits || credits.length === 0) return null;
  return (
    <div className="flex flex-col gap-2">
      <Link href={`/person/${personSlug}/tv-series`}  className={cn(buttonVariants({ variant: 'link' }), 'font-semibold text-xl p-0 w-fit')}>
      {upperFirst(t('common.messages.tv_series', { count: 2 }))}
      </Link>
      <ScrollArea className="rounded-md">
        <div className="flex space-x-4 pb-4">
          {credits?.map((credit, i) => (
            <CardTvSeries
            key={i}
            variant='poster'
            tvSeries={credit.tv_series}
            className='w-24 lg:w-32'
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
