import { ProfileFollowButton } from '@/components/Profile/ProfileFollowButton/ProfileFollowButton';
import UserAvatar from '@/components/User/UserAvatar/UserAvatar';
import { Button } from '@/components/ui/button';
import { useQuery } from '@apollo/client';
import { BarChart, LinkIcon, Settings } from 'lucide-react';
import Link from 'next/link';
import { BsFillPatchCheckFill } from 'react-icons/bs';
import PROFILE_QUERY from '../ProfileDetails/queries/ProfileQuery';
import { User } from '@/types/type.user';
import hexToRgb from '@/lib/utils/hexToRgb';
import { notFound } from 'next/navigation';
import { createServerClient } from '@/lib/supabase/server';
import { HeaderBox } from '@/components/Box/HeaderBox';
import ProfileNavbar from '../ProfileNavbar/ProfileNavbar';
import { UserFragment } from '@/graphql/__generated__/graphql';

// ICONS
import { HiSparkles } from "react-icons/hi2";

export default async function ProfileHeader({ profile }: { profile: UserFragment }) {
  const supabase = createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <HeaderBox
      style={{ backgroundImage: `url(${profile.background_url})` }}
      className="!h-fit"
      classNameChild="flex-col @lg:items-start @lg:flex-row gap-4"
    >
      <div className="flex gap-4 shrink-0 items-start justify-between w-full @lg:w-fit">
        <UserAvatar
          className=" h-20 w-20 @md:h-36 @md:w-36 @5xl:h-48 @5xl:w-48"
          user={profile}
        />
        <div className="flex flex-col gap-2 items-end">
          <div className="flex items-center @lg:hidden">
            <Button variant={'action'}>followers</Button>
            <Button variant={'action'}>suivi(e)s</Button>
            {user?.id == profile.id && (
              <Button variant={'action'} asChild>
                <Link href={'/settings/profile'}>
                  <Settings />
                </Link>
              </Button>
            )}
          </div>
          <ProfileFollowButton profile={profile} className="@lg:hidden" />
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full">
        {/* SECTION 1 */}
        <section className="flex items-center justify-between gap-2">
          <Link
            href={`/@${profile.username}`}
            className="flex items-center gap-1"
          >
            
            <h2 className="text-xl font-semibold">
              {profile.full_name}
              {profile.subscriptions?.edges.length! > 0 && (
                  <sup><HiSparkles size={15} className=' fill-accent-1 inline'/></sup>
              )}
            </h2>
            <span className="text-muted-foreground">@{profile.username}</span>
          </Link>
          <div className="hidden @lg:flex items-center gap-2">
            <Button variant={'action'} className="hidden sm:block">
              {/* {profile.followers_count} */}
              followers
            </Button>
            <Button variant={'action'}>
              {/* {profile.following_count} */}
              suivi(e)s
            </Button>
            {user?.id == profile.id && (
              <Button variant={'action'} asChild>
                <Link href={'/settings/profile'}>
                  <Settings />
                </Link>
              </Button>
            )}
          </div>
        </section>
        {/* SECTION 2 */}
        <section className="flex justify-between h-full">
          {/* PROFILE EXTRADATA */}
          <div>
            {/* {profile.badge && <p className='text-accent-1 italic'>{profile.badge}</p>} */}
            {profile.bio && (
              <p className="text-justify max-w-lg">{profile.bio}</p>
            )}
            {profile.website && (
              <Link
                href={profile.website}
                className="flex gap-2 items-center"
                target="_blank"
              >
                <LinkIcon width={15} />
                {profile.website.replace(/(^\w+:|^)\/\//, '')}
              </Link>
            )}
          </div>
          {/* ACTION BUTTON */}
          <ProfileFollowButton profile={profile} className="hidden @lg:flex" />
        </section>
      </div>
    </HeaderBox>
  );
}
