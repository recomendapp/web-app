"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn, getInitiales } from "@/lib/utils";
import { User } from "@/types/type.user";
import { UserIcon } from "lucide-react";

interface UserAvatarProps
    extends React.HTMLAttributes<HTMLDivElement> {
    user: User;
}

export default function UserAvatar({ user, className } : UserAvatarProps) {
    return (
        <Avatar className={cn("h-8 w-8", className)}>
          <AvatarImage src={user.avatar_url ?? ''} alt={user.username}/>
          <AvatarFallback className="text-clamp">
            <UserIcon color="#fff" className='w-2/4 h-2/4'/>
          </AvatarFallback>
          {/* <AvatarFallback className="text-clamp">{getInitiales(user.username)}</AvatarFallback> */}
        </Avatar>
    )
}