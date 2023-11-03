import { Metadata } from 'next';
import { Fragment } from 'react';
import { LikesPage } from '@/components/Playlist/Likes/LikesPage/LikesPage';

export const metadata: Metadata = {
  title: 'Coups de coeur',
};

export default function Favorites() {

  return (
    <Fragment>
      <LikesPage />
    </Fragment>
  );
}