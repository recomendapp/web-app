// ICONS
import { HeaderBox } from '@/components/Box/HeaderBox';
import PersonPoster from './PersonPoster';
import { PersonFollowButton } from './PersonFollowButton';
import { PersonAbout } from './PersonAbout';
import { MediaPerson } from '@/types/type.db';

export default function PersonHeader({
  person,
  background,
} : {
  person: MediaPerson
  background?: string | null
}) {
  return (
    <HeaderBox
      className='@container/person-header'
      style={{
        backgroundImage: background ? `url(${background})` : undefined,
      }}
    >
      <div className="flex flex-col w-full gap-4 items-center @2xl/person-header:flex-row">
        {/* MOVIE POSTER */}
        <PersonPoster
          className="w-[280px]"
          poster_path={person.avatar_url ?? ''}
          alt={person.title ?? ''}
        />
        {/* MOVIE MAIN DATA */}
        <div className="flex flex-col justify-between gap-2 w-full h-full py-4">
          {/* TYPE */}
          <div>
            <span className='text-accent-1'>Personnalité</span>
            <span className=" before:content-['_|_']">
              {person.extra_data.known_for_department}
            </span>
          </div>
          {/* NAME */}
          <div className="text-xl select-text @xl/person-header:text-6xl font-bold line-clamp-2">
            {person.title}
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
