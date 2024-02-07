import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
	title: 'Guidelist',
};

export default function GuidelistLayout ({ children } : { children: ReactNode}) {
	return (children)
};