import { ShowPlaylists } from '@/components/Playlist/ShowPlaylists/ShowPlaylists';

export default async function Reviews({
  params,
}: {
  params: {
    lang: string;
    film: number;
  };
}) {
  return (<ShowPlaylists filmId={String(params.film)} />);
}
