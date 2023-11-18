import { ProfileFollowButton } from "@/components/Profile/ProfileFollowButton/ProfileFollowButton"
import UserAvatar from "@/components/User/UserAvatar/UserAvatar"
import { Button } from "@/components/ui/button"
import { useQuery } from "@apollo/client"
import { BarChart, LinkIcon, Settings } from "lucide-react"
import Link from "next/link"
import { BsFillPatchCheckFill } from "react-icons/bs"
import PROFILE_QUERY from "../ProfileDetails/queries/ProfileQuery"
import { User } from "@/types/type.user"
import hexToRgb from "@/lib/utils/hexToRgb"
import { notFound } from "next/navigation"
import { createServerClient } from "@/lib/supabase/supabase-server"
import { HeaderBox } from "@/components/Box/HeaderBox"
import ProfileNavbar from "../ProfileNavbar/ProfileNavbar"

export default async function ProfileHeader({ profile } : { profile: User }) {
    const supabaseServer = createServerClient()
    const { data: { user } } = await supabaseServer.auth.getUser();

    return (
        <HeaderBox
            style={{backgroundImage: `url(${profile.background_url})`}}
            className="!h-fit flex-col @lg:items-start @lg:flex-row gap-4"
        >
            <div className="flex gap-4 items-start justify-between w-full @lg:w-fit">
                <UserAvatar className=' h-20 w-20 @md:h-36 @md:w-36 @5xl:h-48 @5xl:w-48' user={profile} />
                <div className="flex flex-col gap-2 items-end">
                    <div className='flex items-center @lg:hidden'>
                        <Button variant={'action'}>
                            {/* {profile.followers_count} */}
                            followers
                        </Button>
                        <Button variant={'action'}>
                            {/* {profile.following_count} */}
                            suivi(e)s
                        </Button>
                        {user?.id == profile.id &&
                            <Button variant={'action'} asChild>
                                <Link href={'/settings/profile'}>
                                    <Settings />
                                </Link>
                            </Button>
                        }
                    </div>
                    <ProfileFollowButton profile={profile} className="@lg:hidden"/>
                </div>
            </div>
            <div className='flex flex-col gap-2 w-full'>
                {/* SECTION 1 */}
                <section className='flex items-center justify-between gap-2'>
                    <Link href={`/@${profile.username}`} className='flex items-center gap-2'>
                        <h2 className='text-xl font-semibold'>{profile.full_name}</h2>
                        {profile.verified && <BsFillPatchCheckFill fill="#1D9BF0" size={16} />}
                        <span className='text-muted-foreground'>@{profile.username}</span>
                    </Link>
                    <div className='hidden @lg:flex items-center gap-2'>
                        <Button variant={'action'} className="hidden sm:block">
                            {/* {profile.followers_count} */}
                            followers
                        </Button>
                        <Button variant={'action'}>
                            {/* {profile.following_count} */}
                            suivi(e)s
                        </Button>
                        {user?.id == profile.id &&
                            <Button variant={'action'} asChild>
                                <Link href={'/settings/profile'}>
                                    <Settings />
                                </Link>
                            </Button>
                        }
                    </div>
                </section>
                {/* SECTION 2 */}
                <section className='flex justify-between h-full'>
                    {/* PROFILE EXTRADATA */}
                    <div>
                        {profile.badge && <p className='text-accent-1 italic'>{profile.badge}</p>}
                        {profile.bio && <p className="text-justify max-w-lg">{profile.bio}</p>}
                        {profile.website && <Link href={profile.website} className='flex gap-2 items-center' target='_blank'><LinkIcon width={15}/>{profile.website.replace(/(^\w+:|^)\/\//, '')}</Link>}
                    </div>
                    {/* ACTION BUTTON */}
                    <ProfileFollowButton profile={profile} className="hidden @md:flex"/>
                </section>
            </div>
        </HeaderBox>
    )

    return (
        <div 
            className={`
            flex flex-col gap-4 p-4 
            `}
            style={{
                background: `linear-gradient(to bottom, ${hexToRgb(profile?.favorite_color, 0.4)}, var(--background))`,
            }}
        >
            <div className='flex gap-4'>
                <UserAvatar className='h-20 w-20 lg:h-[150px] lg:w-[150px]' user={profile} />
                <section className='flex flex-col gap-2 w-full'>
                    <div className='flex flex-col lg:items-center justify-between gap-2 lg:flex-row'>
                        <Link href={`/@${profile.username}`} className='flex items-center gap-2'>
                            <h2 className='text-xl font-semibold'>{profile.full_name}</h2>
                            {profile.verify && <BsFillPatchCheckFill fill="#1D9BF0" size={16} />}
                            <span className='text-muted-foreground'>@{profile.username}</span>
                        </Link>
                        <div className='flex items-center gap-2'>
                            <Button variant={'action'}>
                                {/* {profile.followers_count} */}
                                followers
                            </Button>
                            <Button variant={'action'}>
                                {/* {profile.following_count} */}
                                suivi(e)s
                            </Button>
                            <Button variant={'action'} asChild>
                                <Link href={`/@${profile.username}/stats`}>
                                <BarChart />
                                </Link>
                            </Button>
                            {user?.id == profile.id &&
                                <Button variant={'action'} asChild>
                                    <Link href={'/settings/profile'}>
                                        <Settings />
                                    </Link>
                                </Button>
                            }
                        </div>
                    </div>
                    <div className='flex justify-between h-full'>
                        {/* PROFILE EXTRADATA */}
                        <div>
                            {profile.badge && <p className='text-accent-1 italic'>{profile.badge}</p>}
                            {profile.bio && <p>{profile.bio}</p>}
                            {profile.website && <Link href={profile.website} className='flex gap-2 items-center' target='_blank'><LinkIcon width={15}/>{profile.website.replace(/(^\w+:|^)\/\//, '')}</Link>}
                        </div>
                        {/* ACTION BUTTON */}
                        <ProfileFollowButton profile={profile} />
                    </div>
                </section>
            </div>
        </div>
    )
  }