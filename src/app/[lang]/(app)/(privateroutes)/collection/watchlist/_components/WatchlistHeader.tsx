import { HeaderBox } from "@/components/Box/HeaderBox";
import { TMDB_IMAGE_BASE_URL } from "@/lib/tmdb/tmdb";
import { UserWatchlist } from "@/types/type.db";
import { upperFirst } from "lodash";
import { useTranslations } from "next-intl";

export function WatchlistHeader({ data }: { data: UserWatchlist[] }) {
  const t = useTranslations('common');
  const randomBackdrop = (object: UserWatchlist[]) => {
    const itemsWithBackdrop = object.filter(
      (item) => item?.media?.backdrop_path
    );

    if (itemsWithBackdrop.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * itemsWithBackdrop.length);
    return `${TMDB_IMAGE_BASE_URL}/w1280${itemsWithBackdrop[randomIndex]?.media?.backdrop_path}`;
  };

  return (
    <HeaderBox background={{ src: randomBackdrop(data) || 'https://media.giphy.com/media/Ic0IOSkS23UAw/giphy.gif', alt: 'Watchlist Header Background', unoptimized: true }}>
      <div className="w-full h-full flex flex-col justify-center items-center text-center px-4 py-8 ">
        <h2 className="text-6xl font-bold text-accent-yellow">
        {upperFirst(t('messages.watchlist'))}
        </h2>
        <p className="text-muted-foreground">
        {t('messages.item_count', { count: data?.length })}
        </p>
      </div>
    </HeaderBox>
  )
}
