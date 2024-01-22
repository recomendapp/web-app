import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { Info, Sparkles } from 'lucide-react';

export default function FeaturedPlaylistBadge() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="absolute z-[1] top-4 right-4">
          <Badge className="p-1.5">
            <Sparkles />
          </Badge>
        </TooltipTrigger>
        <TooltipContent align="center" side="bottom">
          <p className=" max-w-[100px]">Featured playlist</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
