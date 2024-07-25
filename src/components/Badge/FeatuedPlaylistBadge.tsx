import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { Info, Sparkles } from 'lucide-react';

export default function FeaturedPlaylistBadge() {
  return (
    <Tooltip>
      <TooltipTrigger className="absolute z-[1] top-2 right-3">
        <Badge className="p-0.5">
          <Sparkles size={10}/>
        </Badge>
      </TooltipTrigger>
      <TooltipContent align="center" side="bottom">
        <p className=" max-w-[100px]">Featured playlist</p>
      </TooltipContent>
    </Tooltip>
  );
}
