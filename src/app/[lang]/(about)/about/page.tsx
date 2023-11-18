import {useTranslations} from 'next-intl';
import { Lang } from '@/types/type.i18n';
import { Metadata } from 'next';
import Marquee from "react-fast-marquee";

import { LoremIpsum } from "react-lorem-ipsum";

export const metadata: Metadata = {
  title: 'À propos',
};

export default function About({
  params: { lang }
}: {
  params: { lang: Lang }
}) {
  const t = useTranslations('about');

  return (
    <main>

      <div className='flex flex-col gap-4 items-center'>
        {/* ABOUT */}
        <section id='about' className='w-full flex flex-col items-center gap-2'>
          <Marquee pauseOnHover className=' bg-blue-700 py-1 uppercase z-0'>
            {Array.from({ length: 3 }).map((_, index) => (
              <p key={index} className='mr-8'>
                {t('about.marquee')}
              </p>
            ))}
          </Marquee>
          <div className='px-4 flex flex-col gap-4 max-w-xl'>
            <h2 className='text-center font-semibold text-3xl text-accent-1'>{t('about.label')}</h2>
            <p className='text-justify'>
            <b className='text-semibold'>Recomend</b> est un lieu pour découvrir, recommander et organiser des œuvres audiovisuelles. Tout a été pensé pour faciliter son usage et offrir la meilleure expérience cinéphile. 
            Sans publicités ni algorithmes, Recomend est le lieu idéal pour se créer son espace culturel et y cultiver ses singularités. Il est à l’image de tout ce que l’on souhaite d’un outil ou d’un réseau social. Bien évidemment tout cela est subjectif. 
            </p>
          </div>
        </section>
        {/* TEAM */}
        <section id='team' className='w-full flex flex-col items-center gap-4 px-4 max-w-xl'>
            <h2 className='text-center font-semibold text-3xl text-accent-1'>Team</h2>
            <p className='text-justify'>
              <LoremIpsum
                p={23}
                avgSentencesPerParagraph={9}
              />
            </p>
        </section>
      </div>
    </main>
  );
}
