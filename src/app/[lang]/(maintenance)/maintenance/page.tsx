import { Icons } from '@/config/icons';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
	title: 'Maintenance',
}
const MaintenancePage: React.FC = () => {
	return (
		<div className='h-screen w-screen p-4'>
			<div className='w-full h-full bg-background p-4 rounded-md flex flex-col items-center justify-center'>
				<Icons.site.logo className="fill-accent-1 w-96" />
				<h1 className=' text-muted-foreground text-2xl'>Maintenance Mode</h1>
			</div>
		</div>
	);
};

export default MaintenancePage;
