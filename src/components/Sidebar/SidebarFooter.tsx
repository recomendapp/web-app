import { Button } from "@/components/ui/button"
import LanguageSwticher from "../Language/LanguageSwitcher"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Box } from "@/components/Box/Box";
import { SidebarContext } from "./Sidebar";
import { useContext } from "react";

export default function SidebarFooter() {
    const { sidebarExpanded, setSidebarExpanded } = useContext(SidebarContext);
    return (
        <Box className={`flex items-center px-3 py-2
            ${sidebarExpanded ? 'justify-between' : 'justify-center'}
        `}>
            {/* <div> */}
            {sidebarExpanded && <LanguageSwticher />}
            {/* <Link
                href={'/about'}
                className={` overflow-hidden transition-all flex gap-2
                    ${sidebarExpanded ? ' w-full px-3 py-2' : 'w-0'}
                `}
            >
                <Info />
                À propos
            </Link>
            </div> */}
            <Button
                onClick={() => setSidebarExpanded(!sidebarExpanded)}
                size={'icon'}
                variant={'ghost'}
                className="rounded-full"
            >
            {sidebarExpanded ? <ChevronLeft /> : <ChevronRight />}
            </Button>
        </Box>
    )
}