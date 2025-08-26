import { ProfileFollowButton } from '@/app/[lang]/(app)/user/[username]/_components/ProfileFollowButton';
import { UserAvatar } from '@/components/User/UserAvatar';
import { Button } from '@/components/ui/button';
import { LinkIcon, Settings } from 'lucide-react';
import { Link } from "@/lib/i18n/routing";
import { createServerClient } from '@/lib/supabase/server';
import { HeaderBox } from '@/components/Box/HeaderBox';

// ICONS
import { Profile } from '@recomendapp/types/dist';
import { ProfileFollowersButton } from './ProfileFollowersButton';
import { ProfileFolloweesButton } from './ProfileFolloweesButton';
import { Icons } from '@/config/icons';

export default async function ProfileHeader({ profile }: { profile: Profile }) {
  const supabase = await createServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <HeaderBox className='!h-fit flex-col @lg/header-box:items-start @lg/header-box:flex-row gap-4' background={profile.background_url ? { src: profile.background_url, alt: profile.username ?? ''} : undefined}>
      <div className="flex gap-4 shrink-0 items-start justify-between w-full @lg/header-box:w-fit">
        {profile.username ? <UserAvatar
          className=" h-20 w-20 @md:h-28 @md:w-28 xl:h-36 xl:w-36"
          avatarUrl={profile.avatar_url}
          username={profile.username}
        /> : null}
        <div className="flex flex-col gap-2 items-end">
          <div className="flex items-center @lg/header-box:hidden">
            <ProfileFollowersButton userId={profile?.id!} disabled={!profile?.visible ? true : false} />
            <ProfileFolloweesButton userId={profile?.id!} disabled={!profile?.visible ? true : false} />
            {session?.user.id == profile?.id && (
              <Button variant={'action'} asChild>
                <Link href={'/settings/profile'}>
                  <Settings />
                </Link>
              </Button>
            )}
          </div>
          {session?.user.id !== profile?.id && <ProfileFollowButton profileId={profile?.id!} className="@lg/header-box:hidden" />}
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
                  <Icons.premium className='ml-1 fill-blue-400 inline w-3'/>
              )}
            </h2>
            <span className="text-muted-foreground">@{profile?.username}</span>
          </Link>
          <div className="hidden @lg/header-box:flex items-center gap-2">
            <ProfileFollowersButton userId={profile?.id!} className="hidden sm:block" disabled={!profile?.visible ? true : false} />
            <ProfileFolloweesButton userId={profile?.id!} className="hidden sm:block" disabled={!profile?.visible ? true : false} />
            {session?.user.id == profile?.id && (
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
            {/* {profile?.badge && <p className='text-accent-yellow italic'>{profile?.badge}</p>} */}
            {profile?.bio && (
              <p className="text-justify max-w-lg">{profile?.bio}</p>
            )}
            {profile?.website && (
              <Link
                href={profile?.website}
                className="flex gap-2 items-center text-accent-pink hover:text-accent-pink-hover"
                target="_blank"
              >
                <LinkIcon width={15} />
                {profile?.website.replace(/(^\w+:|^)\/\//, '')}
              </Link>
            )}
          </div>
          {/* ACTION BUTTON */}
          <ProfileFollowButton profileId={profile?.id!} className="hidden @lg/header-box:flex" />
        </section>
      </div>
    </HeaderBox>
  );
}
