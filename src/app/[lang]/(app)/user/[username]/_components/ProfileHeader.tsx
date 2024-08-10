import { ProfileFollowButton } from '@/app/[lang]/(app)/user/[username]/_components/ProfileFollowButton';
import UserAvatar from '@/components/User/UserAvatar/UserAvatar';
import { Button } from '@/components/ui/button';
import { LinkIcon, Settings } from 'lucide-react';
import Link from 'next/link';
import { createServerClient } from '@/lib/supabase/server';
import { HeaderBox } from '@/components/Box/HeaderBox';

// ICONS
import { HiSparkles } from "react-icons/hi2";
import { UserProfile } from '@/types/type.db';
import { ProfileFollowersButton } from './ProfileFollowersButton';
import { ProfileFolloweesButton } from './ProfileFolloweesButton';

export default async function ProfileHeader({ profile }: { profile: UserProfile }) {
  const supabase = createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <HeaderBox
      style={{ backgroundImage: `url(${profile?.background_url})` }}
      className="!h-fit @container/profile-header"
      classNameChild="flex-col @lg/profile-header:items-start @lg/profile-header:flex-row gap-4"
    >
      <div className="flex gap-4 shrink-0 items-start justify-between w-full @lg/profile-header:w-fit">
        <UserAvatar
          className=" h-20 w-20 @md:h-28 @md:w-28 xl:h-36 xl:w-36"
          user={profile}
        />
        <div className="flex flex-col gap-2 items-end">
          <div className="flex items-center @lg/profile-header:hidden">
            <ProfileFollowersButton userId={profile?.id!} disabled={!profile.visible ? true : false} />
            <ProfileFolloweesButton userId={profile?.id!} disabled={!profile.visible ? true : false} />
            {user?.id == profile?.id && (
              <Button variant={'action'} asChild>
                <Link href={'/settings/profile'}>
                  <Settings />
                </Link>
              </Button>
            )}
          </div>
          <ProfileFollowButton profileId={profile?.id!} className="@lg/profile-header:hidden" />
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full">
        {/* SECTION 1 */}
        <section className="flex items-center justify-between gap-2">
          <Link
            href={`/@${profile?.username}`}
            className="flex items-center gap-1"
          >
            
            <h2 className="text-xl font-semibold">
              {profile?.full_name}
              {profile?.premium && (
                  <sup><HiSparkles size={15} className=' fill-accent-1 inline'/></sup>
              )}
            </h2>
            <span className="text-muted-foreground">@{profile?.username}</span>
          </Link>
          <div className="hidden @lg/profile-header:flex items-center gap-2">
            <ProfileFollowersButton userId={profile?.id!} className="hidden sm:block" disabled={!profile.visible ? true : false} />
            <ProfileFolloweesButton userId={profile?.id!} className="hidden sm:block" disabled={!profile.visible ? true : false} />
            {/* <Button variant={'action'}>
              suivi(e)s
            </Button> */}
            {user?.id == profile?.id && (
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
            {profile?.bio && (
              <p className="text-justify max-w-lg">{profile?.bio}</p>
            )}
            {profile?.website && (
              <Link
                href={profile?.website}
                className="flex gap-2 items-center"
                target="_blank"
              >
                <LinkIcon width={15} />
                {profile?.website.replace(/(^\w+:|^)\/\//, '')}
              </Link>
            )}
          </div>
          {/* ACTION BUTTON */}
          <ProfileFollowButton profileId={profile?.id!} className="hidden @lg/profile-header:flex" />
        </section>
      </div>
    </HeaderBox>
  );
}
