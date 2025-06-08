import { HeaderBox } from "@/components/Box/HeaderBox";
import { UserRecosAggregated } from "@/types/type.db";
import { capitalize } from "lodash";
import { useTranslations } from "next-intl";

export function MyRecosHeader({ data }: { data: UserRecosAggregated[] }) {
  const common = useTranslations('common');
  const randomBackdrop = (object: UserRecosAggregated[]) => {
    const itemsWithBackdrop = object.filter(
      (item) => item?.media?.backdrop_url
    );

    if (itemsWithBackdrop.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * itemsWithBackdrop.length);
    return itemsWithBackdrop[randomIndex]?.media?.backdrop_url;
  };

  return (
    <HeaderBox background={{ src: randomBackdrop(data) || 'https://media.giphy.com/media/Ic0IOSkS23UAw/giphy.gif', alt: 'My Recos Header Background' }}>
      <div className="w-full h-full flex flex-col justify-center items-center text-center px-4 py-8 ">
        <h2 className="text-6xl font-bold text-accent-yellow">
        {capitalize(common('messages.my_recos'))}
        </h2>
        <p className="text-muted-foreground">
        {data.length} {common('messages.film', { count: data?.length })}
        </p>
      </div>
    </HeaderBox>
  );
}
