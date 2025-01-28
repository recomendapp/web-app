import { notFound } from 'next/navigation';
import PersonHeader from './_components/PersonHeader';
import PersonNavbar from './_components/PersonNavbar';
import { getIdFromSlug } from '@/hooks/get-id-from-slug';
import { getPerson } from '@/features/server/media/mediaQueries';

export default async function PersonLayout(
  props: {
    children: React.ReactNode;
    params: Promise<{
      lang: string;
      person_id: string;
    }>;
  }
) {
  const params = await props.params;
  const { id } = getIdFromSlug(params.person_id);
  const person = await getPerson({
    id: id,
    locale: params.lang,
  });
  if (!person) notFound();
  return (
    <>
      <PersonHeader person={person} background={person.backdrop_path} />
      <div className="px-4 pb-4">
        <PersonNavbar personId={params.person_id} />
        {props.children}
      </div>
    </>
  );
}
