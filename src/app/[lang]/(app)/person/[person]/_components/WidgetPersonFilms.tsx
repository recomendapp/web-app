import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { upperFirst } from 'lodash';
import { CardMedia } from '@/components/card/CardMedia';
import { getTranslations } from 'next-intl/server';
import { getPersonFilms } from '@/features/server/persons';

interface WidgetPersonFilmsProps extends React.HTMLAttributes<HTMLDivElement> {
	personId: number;
  lang: string;
}

export async function WidgetPersonFilms({
	personId,
  lang,
} : WidgetPersonFilmsProps) {
  const common = await getTranslations({ locale: lang, namespace: 'common' });

  const credits = await getPersonFilms(personId);

  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-semibold text-xl">
      {upperFirst(common('word.film', { count: 2 }))}
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
