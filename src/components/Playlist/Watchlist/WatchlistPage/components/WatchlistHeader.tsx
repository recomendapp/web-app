import { UserMovieWatchlistFragment } from "@/graphql/__generated__/graphql";

export function WatchlistHeader({ data }: { data: { node: UserMovieWatchlistFragment }[] }) {
  
  const randomBackdrop = (object: { node: UserMovieWatchlistFragment }[]) => {
    const itemsWithBackdrop = object.filter(
      ({ node }) => node.movie.backdrop_path
    );

    if (itemsWithBackdrop.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * itemsWithBackdrop.length);
    return itemsWithBackdrop[randomIndex].node.movie.backdrop_path;
  };

  return (
    <div
      style={{
        backgroundImage: `${
          data.length! > 0
            ? `url('https://image.tmdb.org/t/p/original/${randomBackdrop(data)}`
            : "url('https://media.giphy.com/media/Ic0IOSkS23UAw/giphy.gif')"
        }`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: `${data.length! > 0 ? 'top' : 'center'}`,
        height: 'clamp(340px,30vh,400px)',
      }}
    >
      <div className="w-full h-full flex flex-col justify-center p-4 items-center bg-gradient-to-t from-background to-[#000000bd] bg-opacity-75">
        <h2 className="text-6xl font-bold text-accent-1">Watchlist</h2>
        <p className="text-muted-foreground">
          {data.length! > 0 ? data.length : '0'} film
          {data.length! > 1 && 's'}
        </p>
      </div>
    </div>
  );
}
