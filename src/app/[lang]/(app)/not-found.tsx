"use client"

import { upperFirst } from 'lodash';
import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import React from 'react';

export const metadata: Metadata = {
  title: '404',
};

export default function NotFound() {
  const t = useTranslations('pages');
  return (
    <div
      className="bg-white w-full h-full flex justify-center items-center"
      style={{
        backgroundImage: `url('https://s.ltrbxd.com/static/img/errors/not-found-4.9da22e2b.jpg')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="text-4xl font-bold">
      {upperFirst(t('errors.404.description'))}
      </div>
    </div>
  );
}
