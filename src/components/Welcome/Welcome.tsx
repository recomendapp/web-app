"use client"
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Button } from "../ui/button";

export default function Welcome() {
    return (
        <main className="h-full flex items-center justify-center">
            <div className="flex flex-col gap-4 items-center">
                <h3 className="text-lg font-bold">
                    Bienvenue sur
                </h3>
                <div className="flex gap-4">
                    <Image
                        src={siteConfig.logo.href}
                        alt={siteConfig.logo.alt}
                        width={150}
                        height={150}
                    />
                    <h1 className=" text-9xl font-bold text-accent-1">
                        {siteConfig.name}
                    </h1>
                </div>
                <Button asChild>
                    <Link href={'/login'}>
                        Getting started
                    </Link>
                </Button>
            </div>
        </main>
    )
}