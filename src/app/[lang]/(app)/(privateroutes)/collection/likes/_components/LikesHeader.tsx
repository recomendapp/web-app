import { HeaderBox } from "@/components/Box/HeaderBox";
import { UserActivity } from "@/types/type.db";
import { capitalize } from "lodash";
import { useTranslations } from "next-intl";

export function LikesHeader({ data }: { data: UserActivity[] }) {
  const common = useTranslations('common');
  const randomBackdrop = (object: UserActivity[]) => {
    const itemsWithBackdrop = object.filter(
      (item) => item?.media?.backdrop_path
    );

    if (itemsWithBackdrop.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * itemsWithBackdrop.length);
    return itemsWithBackdrop[randomIndex]?.media?.backdrop_url;
  };

  return (
    <HeaderBox
      style={{
        backgroundImage: `${
          data.length
            ? `url(${randomBackdrop(data)})`
            : "url('https://media.giphy.com/media/Ic0IOSkS23UAw/giphy.gif')"
        }`,
      }}
    >
      <div className="w-full h-full flex flex-col justify-center items-center text-center px-4 py-8 ">
        <h2 className="text-6xl font-bold text-accent-1">
        {capitalize(common('library.collection.likes.label'))}
        </h2>
        <p className="text-muted-foreground">
          {data.length} {common('word.film', { count: data?.length })}
        </p>
      </div>
    </HeaderBox>
  )
}
