import { Header } from "@/components/Header/Header";
import AppLayout from "@/components/Layout/AppLayout";
import { Navbar } from "@/components/Navbar/Navbar";
import { cookies } from "next/headers";

interface AppLayoutProps {
  children: React.ReactNode;
}
export default function RootLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex flex-col h-screen w-screen bg-background-border">
      <AppLayout
        header={<Header/>}
        className={`
          h-[calc(100%-(var(--height-navbar)))]
          lg:p-2
          lg:h-full
        `}
      >
        {children}
      </AppLayout>
      <Navbar className=" z-[50] fixed w-full bottom-0 lg:hidden h-navbar" />
    </div>
  );
}

// import { Box } from '@/components/Box/Box';
// import { Header } from '@/components/Header/Header';
// import { Navbar } from '@/components/Navbar/Navbar';
// import RightSidebar from '@/components/RightSidebar/RightSidebar';
// import { Sidebar } from '@/components/Sidebar/Sidebar';
// import { ResizablePanelGroup } from '@/components/ui/resizable';
// import { TooltipProvider } from '@/components/ui/tooltip';

// export default function RootLayout({ children }: AppLayoutProps) {
//   return (
//     <div className="h-screen w-screen flex flex-col">
//       <div
//         className={`
//                     flex
//                     h-[calc(100%-(var(--height-navbar)))]
//                     gap-2
//                     lg:p-2
//                     lg:h-full
//                 `}
//       >
//         <Sidebar />
//         <Box className="h-full overflow-auto p-0">
//           <Header />
//           <div
//             className="flex-grow relative lg:pb-0
//                         h-full
//                         lg:h-[calc(100%-(var(--height-header)))]
//                     "
//           >
//             {children}
//           </div>
//         </Box>
//         <RightSidebar />
//       </div>
//         <Navbar className=" z-[50] fixed w-full bottom-0 lg:hidden h-navbar" />
//     </div>
//   );
// }
