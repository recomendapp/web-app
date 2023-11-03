import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Info, Sparkles } from "lucide-react";

export default function FeaturedPlaylistBadge() {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger className="absolute z-[1] top-4 right-4">
                    <Badge className=" p-1">
                        <Sparkles />
                    </Badge>
                </TooltipTrigger>
                <TooltipContent align='center' side="bottom">
                    <p className=" max-w-[100px]">Mise en avant : Lorsqu'une playliste est mise en avant elle est visible par tous dans la section Recherche</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}