import { Box } from '@/components/Box/Box';
import { siteConfig } from '@/config/site';
import Image from 'next/image';
import Link from 'next/link';
import { SidebarContext } from './Sidebar';
import { useContext } from 'react';

export default function SidebarHeader() {
  const { sidebarExpanded } = useContext(SidebarContext);
  return (
    <Box>
      <Link
        href={'/'}
        className={`
            relative flex items-center p-2 my-1
            rounded-md
            ${!sidebarExpanded && 'justify-center'}
        `}
      >
        <Image
          priority
          src={siteConfig.icon.file}
          alt={siteConfig.icon.alt}
          className={`
              overflow-hidden transition-all
              ${sidebarExpanded ? 'w-0' : 'w-6'}
          `}
        />
        <Image
          priority
          src={siteConfig.logo.file}
          alt={siteConfig.logo.alt}
          className={`
              overflow-hidden transition-all
              ${sidebarExpanded ? 'w-52' : 'w-0'}
          `}
        />
      </Link>
    </Box>
  );
}
