import { GuidelistPage } from '@/components/modules/MovieGuidelist/GuidelistPage/GuidelistPage';
import { Metadata } from 'next';
import { Fragment } from 'react';

export const metadata: Metadata = {
  title: 'Guidelist',
};

export default function Guidelist() {

  return (
    <Fragment>
      <GuidelistPage />
    </Fragment>
  );
}