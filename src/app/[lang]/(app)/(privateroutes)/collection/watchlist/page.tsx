import { WatchlistPage } from '@/components/Playlist/Watchlist/WatchlistPage/WatchlistPage';
import { Metadata } from 'next';
import { Fragment } from 'react';

export const metadata: Metadata = {
  title: 'Watchlist',
};

export default function Watchlist() {
  return (
    <Fragment>
      <WatchlistPage />
    </Fragment>
  );
}
