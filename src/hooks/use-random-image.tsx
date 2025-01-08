import { useState } from "react"

export type ImageObject = {
	src: string;
	alt?: string;
};

export function useRandomImage(images: ImageObject[]) {
	const randomer = (min: number, max: number) => {
	  return Math.floor(Math.random() * (max - min + 1) + min);
	};
	const [image] = useState<ImageObject | null>(images[randomer(0, images.length - 1)] ?? null);
	return image;
}
