import React, { useState, useEffect, useContext, Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
// import HeaderMinimal from '../../src/components/header/HeaderMinimal';
import { getPersonDetails } from '@/hooks/tmdb';
import { Metadata } from 'next';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { PersonFollowButton } from '@/components/button/PersonFollowButton';
import { PersonDetails } from './PersonDetails';
// import MovieDetails from '../../src/components/movie/MovieDetails';

export async function generateMetadata({
  params,
}: {
  params: { person: string };
}) {
  const person = await getPersonDetails(params.person, 'fr-FR');
  if (person.success === false) {
    console.log('FALSE');
    return {
      title: 'Oups, personne introuvable !',
    };
  }
  console.log('TRUE');
  return {
    title: person.name,
    description: `This is the page of ${person.name}`,
  };
}

export default async function Person({
  params,
}: {
  params: { person: string };
}) {
  const person = await getPersonDetails(params.person, 'fr-FR');
  if (person.success === false) throw Error;

  return <PersonDetails person={person} />;
}
