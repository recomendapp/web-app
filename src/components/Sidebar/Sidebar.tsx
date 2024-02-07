'use client';
import React, { createContext, useState } from 'react';
import { SidebarRoutes } from './SidebarRoutes';
import SidebarCollection from './Collection/SidebarCollection';
import SidebarFooter from './SidebarFooter';
import SidebarHeader from './SidebarHeader';
import { TooltipProvider } from '../ui/tooltip';
import { useUiContext } from '@/context/ui-context';

export function Sidebar() {
  const { isSidebarCollapsed } = useUiContext();
  return (
    <TooltipProvider delayDuration={0}>
      <aside
        data-collapsed={isSidebarCollapsed}
        className="group flex flex-col gap-4 data-[collapsed=true]:py-0 w-full"
      >
        <nav className='flex flex-col gap-2 h-full'>
        {/* <nav className="grid gap-1 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2"> */}
          <SidebarHeader className='grid group-[[data-collapsed=true]]:justify-center'/>
          <SidebarRoutes className='grid group-[[data-collapsed=true]]:justify-center'/>
          <SidebarCollection className='flex flex-col group-[[data-collapsed=true]]:items-center'/>
          {/* <SidebarFooter /> */}
          
          {/* {links.map((link, index) =>
            isCollapsed ? (
              <Tooltip key={index} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href="#"
                    className={cn(
                      buttonVariants({ variant: link.variant, size: "icon" }),
                      "h-9 w-9",
                      link.variant === "default" &&
                        "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                    )}
                  >
                    <link.icon className="h-4 w-4" />
                    <span className="sr-only">{link.title}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="flex items-center gap-4">
                  {link.title}
                  {link.label && (
                    <span className="ml-auto text-muted-foreground">
                      {link.label}
                    </span>
                  )}
                </TooltipContent>
              </Tooltip>
            ) : (
              <Link
                key={index}
                href="#"
                className={cn(
                  buttonVariants({ variant: link.variant, size: "sm" }),
                  link.variant === "default" &&
                    "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                  "justify-start"
                )}
              >
                <link.icon className="mr-2 h-4 w-4" />
                {link.title}
                {link.label && (
                  <span
                    className={cn(
                      "ml-auto",
                      link.variant === "default" &&
                        "text-background dark:text-white"
                    )}
                  >
                    {link.label}
                  </span>
                )}
              </Link>
            )
          )} */}
        </nav>
      </aside>  
    </TooltipProvider>
  );
}

