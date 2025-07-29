import { HeaderBox } from "@/components/Box/HeaderBox";
import { TMDB_IMAGE_BASE_URL } from "@/lib/tmdb/tmdb";
import { UserActivity } from "@/types/type.db";
import { upperFirst } from "lodash";
import { useTranslations } from "next-intl";

export function LikesHeader({ data }: { data: UserActivity[] }) {
  const t = useTranslations('common');
  const randomBackdrop = (object: UserActivity[]) => {
    const itemsWithBackdrop = object.filter(
      (item) => item?.media?.backdrop_path
    );

    if (itemsWithBackdrop.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * itemsWithBackdrop.length);
    return `${TMDB_IMAGE_BASE_URL}/w1280${itemsWithBackdrop[randomIndex]?.media?.backdrop_path}`;
  };

  return (
    <HeaderBox background={{ src: randomBackdrop(data) || 'https://media.giphy.com/media/Ic0IOSkS23UAw/giphy.gif', alt: 'Likes Header Background', unoptimized: true }}>
      <div className="w-full h-full flex flex-col justify-center items-center text-center px-4 py-8 ">
        <h2 className="text-6xl font-bold text-accent-yellow">
          {upperFirst(t('messages.heart_pick', { count: 2 }))}
        </h2>
        <p className="text-muted-foreground">
          {data.length} {t('messages.film', { count: data?.length })}
        </p>
      </div>
    </HeaderBox>
  )
}
