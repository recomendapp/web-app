import { UserFollowButton } from "@/components/elements/ButtonFollowUser/UserFollowButton"
import ModalSettingsUser from "@/components/elements/ModalSettingsUser/ModalSettingsUser"
import UserAvatar from "@/components/elements/UserAvatar/UserAvatar"
import { Button } from "@/components/ui/button"
import { BarChart, LinkIcon } from "lucide-react"
import Link from "next/link"
import { BsFillPatchCheckFill } from "react-icons/bs"

export default function UserHeader({ user } : { user: any }) {
    return (
        <div className={`flex flex-col gap-4 p-4 bg-gradient-to-b from-[#468f]/40 to-background`}>
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
        {/* <UserStats userId={user.$id} /> */}
        </div>
    )
  }