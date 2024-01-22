import { siteConfig } from '@/config/site';
import Image from 'next/image';
import React from 'react';

export async function generateMetadata() {
	return {
	  title: `Maintenance`,
	};
}

const MaintenancePage: React.FC = () => {
	return (
		<div className='h-screen w-screen p-4'>
			<div className='w-full h-full bg-background p-4 rounded-md flex flex-col items-center justify-center'>
				<Image
					src={siteConfig.logo.href}
					alt={siteConfig.logo.alt}
					width={400}
					height={400}
				/>
				<h1 className=' text-muted-foreground text-2xl'>Maintenance Mode</h1>
			</div>
		</div>
	);
};

export default MaintenancePage;
