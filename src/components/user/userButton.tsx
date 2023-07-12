import { useEffect, useState } from "react"

import { CreditCard, LogOut, PlusCircle, Settings, User } from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

import { useUser } from "@/context/user"
import { Skeleton } from "@/components/ui/skeleton"

interface UserButtonProps extends React.HTMLAttributes<HTMLDivElement> {
    skeleton?: boolean;
}

export function UserButton({ skeleton }: UserButtonProps) {
    const { user, userLoading, logout } = useUser()

    const [userInitiales, setUserInitiales] = useState('');

    useEffect(() => {
        if(user) {
            const words = user.name.normalize('NFKC').toUpperCase().split(' ');
            let initials = '';
            if (words.length === 1) {
                initials = words[0].charAt(0);
            } else if (words.length >= 2) {
                for (let i = 0; i < 2; i++) {
                    initials += words[i].charAt(0);
                }
            }
            setUserInitiales(initials);
        }
      }, [user]);

    if (skeleton) {
        return (
            <Skeleton className="h-8 w-8 rounded-full" />
        )
    }

    return (
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Link href={'/@'+user.username}>
                <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{userInitiales}</AvatarFallback>
                </Avatar>
            </Link>
        </Button>
    )
}