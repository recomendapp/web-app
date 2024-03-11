import { HeaderBox } from "@/components/Box/HeaderBox";
import { UserMovieWatchlistFragment } from "@/graphql/__generated__/graphql";
import { UserMovieWatchlist } from "@/types/type.db";

export function WatchlistHeader({ data }: { data: UserMovieWatchlist[] }) {
  
  const randomBackdrop = (object: UserMovieWatchlist[]) => {
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
          Watchlist
        </h2>
        <p className="text-muted-foreground">
          {data?.length > 0 ? data.length : '0'} film
          {data?.length > 1 && 's'}
        </p>
      </div>

    </HeaderBox>
  )

  // return (
  //   <div
  //     style={{
  //       backgroundImage: `${
  //         data.length! > 0
  //           ? `url('https://image.tmdb.org/t/p/original/${randomBackdrop(data)}`
  //           : "url('https://media.giphy.com/media/Ic0IOSkS23UAw/giphy.gif')"
  //       }`,
  //       backgroundSize: 'cover',
  //       backgroundRepeat: 'no-repeat',
  //       backgroundPosition: `${data.length! > 0 ? 'top' : 'center'}`,
  //       height: 'clamp(340px,30vh,400px)',
  //     }}
  //   >
  //     <div className="w-full h-full flex flex-col justify-center p-4 items-center bg-gradient-to-t from-background to-[#000000bd] bg-opacity-75">
  //       <h2 className="text-6xl font-bold text-accent-1">Watchlist</h2>
  //       <p className="text-muted-foreground">
  //         {data.length! > 0 ? data.length : '0'} film
  //         {data.length! > 1 && 's'}
  //       </p>
  //     </div>
  //   </div>
  // );
}
