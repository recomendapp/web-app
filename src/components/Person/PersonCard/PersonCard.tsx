import Link from 'next/link';
import { getInitiales } from '@/lib/utils';

// UI
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function PersonCard({ person }: { person: any }) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <UserLink person={person} />
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src={person.avatar} alt={person.username} />
            <AvatarFallback className="text-[15px]">
              {getInitiales(person.name)}
            </AvatarFallback>
          </Avatar>
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
  );
}

function UserLink({ person }: { person: any }) {
  return (
    <Link href={'/@' + person.name} className="flex items-center gap-2 w-fit">
      <Avatar className="w-[25px] h-[25px]">
        <AvatarImage src={person.avatar} alt={person.username} />
        <AvatarFallback className="text-[15px]">
          {getInitiales(person.name)}
        </AvatarFallback>
      </Avatar>
      <div className="flex justify-center items-center gap-1">
        <span className="hover:underline">{person.name}</span>
      </div>
    </Link>
  );
}
