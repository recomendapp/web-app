import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
	title: 'Coups de coeur',
};

export default function LikesLayout ({ children } : { children: ReactNode}) {
	return (children)
};