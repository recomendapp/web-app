"use client"

import { UserFollowButton } from "@/components/elements/ButtonFollowUser/UserFollowButton"
import ModalSettingsUser from "@/components/elements/ModalSettingsUser/ModalSettingsUser"
import UserAvatar from "@/components/elements/UserAvatar/UserAvatar"
import { Button } from "@/components/ui/button"
import { useQuery } from "@apollo/client"
import { BarChart, LinkIcon } from "lucide-react"
import Link from "next/link"
import { BsFillPatchCheckFill } from "react-icons/bs"
import PROFILE_QUERY from "../ProfileDetails/queries/ProfileQuery"
import { User } from "@/types/type.user"
import hexToRgb from "@/lib/utils/hexToRgb"

export default function ({ username } : { username: string }) {

    const { data: userQuery, loading } = useQuery(PROFILE_QUERY, {
        variables: {
            username: username
        }
    })

    const user: User = userQuery?.userCollection?.edges[0]?.node;

    console.log('uxer', user?.favorite_color)

    if (loading)
        return null

    if (!loading && !userQuery)
        return null

    return (
        <div 
            className={`
            flex flex-col gap-4 p-4 
            `}
            style={{
                background: `linear-gradient(to bottom, ${hexToRgb(user.favorite_color, 0.4)}, black)`,
            }}
        >
            <div className='flex gap-4'>
                <UserAvatar className='h-20 w-20 lg:h-[150px] lg:w-[150px]' user={user} />
                <section className='flex flex-col gap-2 w-full'>
                    <div className='flex flex-col lg:items-center justify-between gap-2 lg:flex-row'>
                        <Link href={`/@${user.username}`} className='flex items-center gap-2'>
                            <h2 className='text-xl font-semibold'>{user.full_name}</h2>
                            {user.verify && <BsFillPatchCheckFill fill="#1D9BF0" size={16} />}
                            <span className='text-muted-foreground'>@{user.username}</span>
                        </Link>
                        <div className='flex items-center gap-2'>
                            <Button variant={'ghost'}>
                                followers
                            </Button>
                            <Button variant={'ghost'}>
                                suivi(e)s
                            </Button>
                            <Button variant={'action'} asChild>
                                <Link href={`/@${user.username}/stats`}>
                                <BarChart />
                                </Link>
                            </Button>
                            <ModalSettingsUser userId={user.id} />
                        </div>
                    </div>
                    <div className='flex justify-between'>
                        {/* USER EXTRADATA */}
                        <div>
                            {user.badge && <p className='text-accent-1 italic'>{user.badge}</p>}
                            {user.bio && <p>{user.bio}</p>}
                            {user.website && <Link href={user.website} className='flex gap-2 items-center' target='_blank'><LinkIcon width={15}/>{user.website.replace(/(^\w+:|^)\/\//, '')}</Link>}
                        </div>
                        {/* ACTION BUTTON */}
                        <UserFollowButton followeeId={user.id} />
                    </div>
                </section>
            </div>
        {/* <UserStats userId={user.$id} /> */}
        </div>
    )
  }