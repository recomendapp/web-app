import { HeaderBox } from "@/components/Box/HeaderBox";
import { UserMovieGuidelistFragment } from "@/graphql/__generated__/graphql";
import { UserMovieGuidelist } from "@/types/type.db";

export function GuidelistHeader({ data }: { data: UserMovieGuidelist[] }) {
  
  const randomBackdrop = (object: UserMovieGuidelist[]) => {
    const itemsWithBackdrop = object.filter(
      (item) => item?.movie?.backdrop_path
    );

    if (itemsWithBackdrop.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * itemsWithBackdrop.length);
    return itemsWithBackdrop[randomIndex]?.movie?.backdrop_path;
  };

  return (
    <HeaderBox
      style={{
        backgroundImage: `${
          data.length
            ? `url('https://image.tmdb.org/t/p/original/${randomBackdrop(data)}`
            : "url('https://media.giphy.com/media/Ic0IOSkS23UAw/giphy.gif')"
        }`,
      }}
    >
      <div className="w-full h-full flex flex-col justify-center items-center text-center px-4 py-8 ">
        <h2 className="text-6xl font-bold text-accent-1">
          Guidelist
        </h2>
        <p className="text-muted-foreground">
          {data?.length > 0 ? data.length : '0'} film
          {data?.length > 1 && 's'}
        </p>
      </div>

    </HeaderBox>
  );
}
