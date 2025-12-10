import { ProfileFollowButton } from '@/app/[lang]/(app)/user/[username]/_components/ProfileFollowButton';
import { UserAvatar } from '@/components/User/UserAvatar';
import { Button } from '@/components/ui/button';
import { LinkIcon, Settings } from 'lucide-react';
import { Link } from "@/lib/i18n/navigation";
import { createServerClient } from '@/lib/supabase/server';
import { HeaderBox } from '@/components/Box/HeaderBox';
import { Profile } from '@recomendapp/types';
import { ProfileFollowersButton } from './ProfileFollowersButton';
import { ProfileFolloweesButton } from './ProfileFolloweesButton';
import { Icons } from '@/config/icons';
import { ButtonGroup } from '@/components/ui/button-group';

export const ProfileHeader = async ({ profile }: { profile: Profile }) => {
  const supabase = await createServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <HeaderBox className='h-fit!' background={profile.background_url ? { src: profile.background_url, alt: profile.username ?? ''} : undefined}>
      <div className='max-w-7xl w-full flex flex-col @lg/header-box:items-start @lg/header-box:flex-row gap-4'>
        <div className="flex gap-4 shrink-0 items-start justify-between w-full @lg/header-box:w-fit">
          {profile.username ? <UserAvatar
            className=" h-20 w-20 @md:h-28 @md:w-28 xl:h-36 xl:w-36"
            avatarUrl={profile.avatar_url}
            username={profile.username}
          /> : null}
          <div className="flex flex-col gap-2 items-end">
            <ButtonGroup className="@lg/header-box:hidden">
              <ButtonGroup>
                <ProfileFollowersButton userId={profile?.id!} disabled={!profile?.visible ? true : false} />
                <ProfileFolloweesButton userId={profile?.id!} disabled={!profile?.visible ? true : false} />
              </ButtonGroup>
              {session?.user.id == profile?.id && (
                <ButtonGroup>
                  <Button variant={'outline'} asChild>
                    <Link href={'/settings/profile'}>
                      <Settings />
                    </Link>
                  </Button>
                </ButtonGroup>
              )}
            </ButtonGroup>
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
            <ButtonGroup className="hidden @lg/header-box:flex">
              <ButtonGroup>
                <ProfileFollowersButton userId={profile?.id!} className="hidden sm:block" disabled={!profile?.visible ? true : false} />
                <ProfileFolloweesButton userId={profile?.id!} className="hidden sm:block" disabled={!profile?.visible ? true : false} />
              </ButtonGroup>
              {session?.user.id == profile?.id && (
                <ButtonGroup>
                  <Button variant={'outline'} asChild>
                    <Link href={'/settings/profile'}>
                      <Settings />
                    </Link>
                  </Button>
                </ButtonGroup>
              )}
            </ButtonGroup>
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
      </div>
    </HeaderBox>
  );
}
