import { UserFollowButton } from '@/components/elements/ButtonFollowUser/UserFollowButton';
import ModalSettingsUser from '@/components/elements/ModalSettingsUser/ModalSettingsUser';
import UserAvatar from '@/components/elements/UserAvatar/UserAvatar';
import UserMovies from '@/components/modules/UserMovies/UserMovies';
import UserPlaylists from '@/components/modules/UserPlaylists/UserPlaylists';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { getUserDetails } from '@/db/appwrite';
// import ProfilePage from './ProfilePage';
import { User } from '@/types/type.user';
import { LinkIcon } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BsFillPatchCheckFill } from 'react-icons/bs';

export async function generateMetadata({
  params,
}: {
  params: { username: string };
}) {
  const user = await getUserDetails(params.username);
  if (!user) {
    return {
      title: 'Oups, utilisateur introuvable !',
    };
  }
  return {
    title: `${user.full_name} (@${user.username})`,
    description: `This is the page of @${user.username}`,
  };
}

export default async function UserPage({ params }: { params: { username: string } }) {
  const user = await getUserDetails(params.username);
  if (!user) notFound();

  return (
    <main>
      <UserHeader user={user} />
      <div className='p-4'>
        <UserPlaylists userId={user.$id} />
        <UserMovies userId={user.$id} />
      </div>
    </main>
  );
}

const UserHeader = ({ user } : { user: any }) => {
  return (
  <div className={`flex flex-col gap-4 p-4 bg-gradient-to-b from-[#468f]/40 to-background`}>
    <div className='flex gap-4'>
      <UserAvatar className='h-20 w-20 lg:h-[150px] lg:w-[150px]' user={user} />
      <section className='flex flex-col gap-2 w-full'>
        <div className='flex items-center justify-between'>
          <Link href={`/@${user.username}`} className='flex items-center gap-2'>
            <h2 className='text-xl font-semibold'>{user.full_name}</h2>
            {user.verify && <BsFillPatchCheckFill fill="#1D9BF0" size={16} />}
            <span className='text-muted-foreground'>@{user.username}</span>
          </Link>
          <div className='flex gap-2'>
            <Button variant={'ghost'}>
              followers
            </Button>
            <Button variant={'ghost'}>
              suivi(e)s
            </Button>
            <ModalSettingsUser userId={user.$id} />
          </div>
        </div>
        <div className='flex justify-between'>
          {/* USER EXTRADATA */}
          <div>
            {user.badge && <p className='text-accent-1 italic'>{user.badge}</p>}
            {user.bio && <p>{user.bio}</p>}
            {user.link && <Link href={user.link} className='flex gap-2 items-center' target='_blank'><LinkIcon width={15}/>{user.link.replace(/(^\w+:|^)\/\//, '')}</Link>}
          </div>
          {/* ACTION BUTTON */}
          <UserFollowButton followeeId={user.$id} />
        </div>
      </section>
    </div>
    <UserStats userId={user.$id} />
  </div>
  )
}

const UserStats = ({ userId } : { userId: string }) => {
  return (
    <div className='w-full bg-background grid grid-cols-3 text-center border-4 border-muted rounded-lg px-4'>
      <div>
        <p className='font-bold text-lg'>55K</p>
        <p className='text-sm'>HEURES</p>
      </div>
      <div>
        <p className='font-bold text-lg'>75</p>
        <p className='text-sm'>RÉALISATEURS</p>
      </div>
      <div>
        <p className='font-bold text-lg'>12</p>
        <p className='text-sm'>PAYS</p>
      </div>
    </div>
  )
}