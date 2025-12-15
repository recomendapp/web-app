import { getT } from "@/lib/i18n";
import { upperFirst } from "lodash";
import { Metadata } from "next";
import { ReactNode } from "react";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getT();
  return {
	  title: upperFirst(t('common.messages.heart_pick', { count: 2 })),
  };
}

export default function LikesLayout ({ children } : { children: ReactNode}) {
	return (children)
};