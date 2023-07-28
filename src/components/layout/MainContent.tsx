"use client"
import { cn } from "@/lib/utils";
import { ScrollArea } from "../ui/scroll-area";

interface MainContentProps extends React.HTMLAttributes<HTMLDivElement> {
    
}

export default function MainContent({ children, className } : MainContentProps) {
    return (
        <ScrollArea className={cn(" ", className)}>
            {children}
        </ScrollArea>
    )
}