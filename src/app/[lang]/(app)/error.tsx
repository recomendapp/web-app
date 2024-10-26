'use client';

import { Images } from "@/config/images";
import { useRandomImage } from "@/hooks/use-random-image";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Icons } from "@/config/icons";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function Error({
	error,
	reset,
} : {
	error: Error & { digest?: string },
	reset: () => void,
}) {
	const bgImage = useRandomImage(Images.auth.error.background);
	return (
		<div
		className="h-full w-full flex flex-col items-center justify-center"
		style={{
		  backgroundImage: `url(${bgImage?.src})`,
		  backgroundSize: 'cover',
		  backgroundPosition: 'center',
		  backgroundRepeat: 'no-repeat',
		}}
	  >
		<Card className="w-full max-w-[400px]">
		  <CardHeader className='gap-2'>
			<CardTitle className='inline-flex gap-2 items-center justify-center'>
			  <Icons.site.icon className='fill-accent-1 w-8' />
			  Erreur
			</CardTitle>
			<CardDescription>
			  Une erreur s&apos;est produite.
			</CardDescription>
		  </CardHeader>
		  <CardContent className='grid gap-4'>
			<Alert>
			  <AlertTitle>{error.message}</AlertTitle>
			</Alert>
		  </CardContent>
		  <CardFooter>
			<Button className='w-full' onClick={reset}>
				Try again
			</Button>
		  </CardFooter>
		</Card>
	  </div>
	);
}