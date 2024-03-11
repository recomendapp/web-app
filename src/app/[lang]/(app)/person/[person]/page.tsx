import { getMovieDetails, getPersonDetails } from '@/lib/tmdb/tmdb';
import MovieHeader from './_components/PersonHeader';
import MovieDescription from './_components/PersonDescription';
import MovieNavbar from './_components/PersonNavbar';
import { notFound } from 'next/navigation';
import { createServerClient } from '@/lib/supabase/server';
import PersonHeader from './_components/PersonHeader';
import PersonNavbar from './_components/PersonNavbar';
import PersonDescription from './_components/PersonDescription';

// GRAPHQL
import apolloServer from '@/lib/apollo/server';
import { GetPersonByIdQuery } from '@/graphql/__generated__/graphql';
import GET_PERSON_BY_ID from '@/graphql/Person/queries/GetPersonById';

export async function generateMetadata({
  params,
}: {
  params: {
    lang: string;
    person: string;
  };
}) {
  const person = await getPersonDetails(params.person, params.lang);
  if (!person) {
    return {
      title: 'Oups, personne introuvable !',
    };
  }
  return {
    title: person.name,
    description: `This is the page of ${person.name}`,
  };
}

export default async function Film({
  params,
}: {
  params: {
    lang: string;
    person: string;
  };
}) {
  const person = await getPersonDetails(params.person, params.lang);

  if (!person) notFound();
  // const { data: personQuery } = await apolloServer.query<GetPersonByIdQuery>({
  //   query: GET_PERSON_BY_ID,
  //   variables: {
  //     filter: {
  //       id: { eq: params.person },
  //     },
  //     locale: params.lang,
  //   },
  // });
  // const person = personQuery?.tmdb_personCollection?.edges[0].node;

  // console.log(person);

  // if (!person) notFound();
  

  return (
    <main>
      <PersonHeader person={person} />
      <div className="px-4 pb-4">
        {/* <PersonNavbar focus={"description"} personId={person.id} /> */}
        <PersonDescription person={person} />
      </div>
    </main>
  );
}
