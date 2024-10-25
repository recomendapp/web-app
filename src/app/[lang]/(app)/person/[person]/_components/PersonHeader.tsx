'use client';

// ICONS
import { HeaderBox } from '@/components/Box/HeaderBox';
import PersonPoster from './PersonPoster';
import { PersonFollowButton } from './PersonFollowButton';
import { Modal } from '@/components/modals/Modal';
import { PersonAbout } from './PersonAbout';

export default function PersonHeader({
  person,
  background,
} : {
  person: any
  background?: string | null
}) {
  return (
    <HeaderBox
      className='@container/person-header'
      style={{
        backgroundImage: `url('https://image.tmdb.org/t/p/original/${background}`,
      }}
    >
      <div className="flex flex-col w-full gap-4 items-center @2xl/person-header:flex-row">
        {/* MOVIE POSTER */}
        <PersonPoster
          className="w-[280px]"
          poster_path={`https://image.tmdb.org/t/p/original/${person.profile_path}`}
          alt={person.name}
        />
        {/* MOVIE MAIN DATA */}
        <div className="flex flex-col justify-between gap-2 w-full h-full py-4">
          {/* TYPE */}
          <div>
            <span className='text-accent-1'>Personnalité</span>
            <span className=" before:content-['_|_']">
              {person.known_for_department}
            </span>
          </div>
          {/* NAME */}
          <div className="text-xl @xl/person-header:text-6xl font-bold line-clamp-2">
            {person.name}
          </div>
          <div className='space-y-2'>
            <PersonAbout person={person} />
            <PersonFollowButton personId={person.id} />
          </div>
        </div>
      </div>
    </HeaderBox>
  );
}
