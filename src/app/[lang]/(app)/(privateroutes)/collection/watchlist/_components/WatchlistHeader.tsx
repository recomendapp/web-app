import { HeaderBox } from "@/components/Box/HeaderBox";
import { Skeleton } from "@/components/ui/skeleton";
import { ImageObject, useRandomImage } from "@/hooks/use-random-image";
import { UserWatchlistType } from "@/types/type.db";
import { upperFirst } from "lodash";
import { useTranslations } from "next-intl";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useUIStore } from "@/stores/useUIStore";

interface WatchlistHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
    skeleton?: boolean;
    type: UserWatchlistType;
    numberItems?: number;
    backdrops?: ImageObject[];
}

export function WatchlistHeader({
  numberItems,
  type,
  backdrops,
  skeleton,
} : WatchlistHeaderProps) {
  const t = useTranslations();
  const setTab = useUIStore((state) => state.setWatchlistTab);
  const backdrop = useRandomImage(backdrops || []);

  const renderItemsCount = () => {
    switch (type) {
      case 'movie':
        return `${numberItems} ${t('common.messages.film', { count: numberItems })}`;
      case 'tv_series':
        return `${numberItems} ${t('common.messages.tv_series', { count: numberItems })}`;
      default:
        return `${numberItems} ${t('common.messages.item', { count: numberItems })}`;
    }
  };

  return (
    <HeaderBox background={!skeleton ? { src: backdrop?.src || 'https://media.giphy.com/media/Ic0IOSkS23UAw/giphy.gif', alt: 'Likes Header Background', unoptimized: true } : undefined} className="flex-col items-center">
      <div className="w-full h-full flex flex-col justify-center items-center text-center px-4 py-8 ">
        <h2 className="text-6xl font-bold text-accent-yellow">
          {upperFirst(t('common.messages.watchlist', { count: 2 }))}
        </h2>
        {!skeleton ? (
          <p className="text-muted-foreground">
            {renderItemsCount()}
          </p>
        ) : <Skeleton className="h-6 w-48" />}
      </div>
      <Tabs defaultValue={type} onValueChange={(value) => setTab(value as UserWatchlistType)}>
        <TabsList>
          <TabsTrigger value="movie">{upperFirst(t('common.messages.film', { count: 2 }))}</TabsTrigger>
          <TabsTrigger value="tv_series">{upperFirst(t('common.messages.tv_series', { count: 2 }))}</TabsTrigger>
        </TabsList>
      </Tabs>
    </HeaderBox>
  )
}
