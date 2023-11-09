'use client';
import { PersonFollowButton } from '@/components/Person/ButtonFollowPerson/PersonFollowButton';
import { useAuth } from '@/context/AuthContext/AuthProvider';

export function PersonDetails({ person }: { person: any }) {
  const { user } = useAuth();

  return (
    <div className=" w-full">
      <div
        className="bg-white flex items-center justify-center"
        style={{
          backgroundImage: `url('https://image.tmdb.org/t/p/original/${person.profile_path}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          height: 'clamp(340px,30vh,400px)',
        }}
      >
        {user && <PersonFollowButton userId={user?.id} personId={person.id} />}
      </div>
    </div>
  );
}
