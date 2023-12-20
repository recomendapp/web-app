"use client"

import { useRightSidebar } from "@/context/right-sidebar-context";
import { Box } from "../Box/Box";
import { Button } from "../ui/button";
import { X } from "lucide-react";

export default function RightSidebar() {
    const { isOpen, closePanel, panelContent, panelTitle } = useRightSidebar();

    // if (!content)
    //     return null

    if (!isOpen)
        return null

    return (
        <Box className="h-full w-fit min-w-[280px] max-w-md hidden lg:block">
            <aside>
                <div className="h-header p-4 flex items-center justify-between">
                    <h3 className="text-3xl">{panelTitle}</h3>
                    <Button
                        variant={'ghost'}
                        size={"icon"}
                        className="rounded-full"
                        onClick={closePanel}
                    >
                        <X />
                    </Button>
                </div>
                <div className="p-4 overflow-y-auto">
                    {panelContent}
                </div>
            </aside>
        </Box>
    )
}