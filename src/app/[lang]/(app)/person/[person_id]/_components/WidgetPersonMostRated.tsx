import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { upperFirst } from 'lodash';
import { CardMedia } from '@/components/Card/CardMedia';
import { getTranslations } from 'next-intl/server';
import { getPersonCombinedCredits } from '@/features/server/media/mediaQueries';

interface WidgetPersonMostRatedProps extends React.HTMLAttributes<HTMLDivElement> {
	personId: number;
  lang: string;
}

export async function WidgetPersonMostRated({
	personId,
  lang,
} : WidgetPersonMostRatedProps) {
  const common = await getTranslations({ locale: lang, namespace: 'common' });

  const credits = await getPersonCombinedCredits({
    id: personId,
    locale: lang,
  })

  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-semibold text-xl">
      {upperFirst(common('messages.known_for'))}
      </h3>
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
