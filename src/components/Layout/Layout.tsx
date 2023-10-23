import { Box } from '@/components/Box/Box';
import { Sidebar } from '../Sidebar/Sidebar';
import { Header } from '../Header/Header';
import RightSidebar from '../RightSidebar/RightSidebar';
import { Fragment } from 'react';

export default function Layout({
    children
} : {
    children: React.ReactNode
}) {
    return (
        <Fragment>
            <Sidebar />
            <Box className='h-full overflow-y-auto'>
                <Header />
                <div className="flex-grow relative lg:pb-0
                    h-full
                    lg:h-[calc(100%-(var(--height-header)))]
                ">
                    {children}
                </div>
            </Box>
            <RightSidebar /> 
        </Fragment>
    )
}