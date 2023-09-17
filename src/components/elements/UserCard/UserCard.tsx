import { Models } from "appwrite";
import Link from "next/link";
import { cn, getInitiales } from "@/lib/utils/utils";

// UI
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar";

// ICONS
import { BsFillPatchCheckFill } from 'react-icons/bs'
import UserAvatar from "../UserAvatar/UserAvatar";
import { User } from "@/types/type.user";

interface UserCardProps
    extends React.HTMLAttributes<HTMLDivElement> {
    user: User;
    icon?: boolean
}

export default function UserCard({ user, className, icon } : UserCardProps) {
    return (
        <HoverCard >
            <HoverCardTrigger asChild>
                <UserLink user={user} className={cn("", className)} icon={icon} />
            </HoverCardTrigger>
            <HoverCardContent>
                <div className="flex justify-between space-x-4">
                    <UserAvatar user={user} />
                    <div className="space-y-1">
                        <h4 className="text-sm font-semibold">@nextjs</h4>
                        <p className="text-sm">
                        The React Framework – created and maintained by @vercel.
                        </p>
                        <div className="flex items-center pt-2">
                        {/* <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "} */}
                        <span className="text-xs text-muted-foreground">
                            Joined December 2021
                        </span>
                        </div>
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>
    )
}

interface UserLinkProps
    extends React.HTMLAttributes<HTMLDivElement> {
    user: User;
    icon?: boolean
}

function UserLink({ user, className, icon } : UserLinkProps) {
    return (
        <Link href={'/@' + user?.username} className={cn("flex items-center gap-2 w-fit", className)}>
            <UserAvatar className="w-[25px] h-[25px]" user={user} />
            <div 
                className={`flex justify-center items-center gap-1
                    ${icon && 'hidden lg:flex'}
                `}
            >
                <span className='hover:underline'>
                {user?.username}
                </span>
                {user?.verify && <BsFillPatchCheckFill fill="#1D9BF0" size={16} />}
            </div>
        </Link>
    )
}