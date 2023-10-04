"use client"

import Link from "next/link"

export default function MovieNavbar ({ focus, movieId } : { focus: string, movieId: string }) {
    const routes = [
        {
        label: 'Description',
        active: focus === 'description',
        href: `/film/${movieId}`,
        },
        {
        label: 'Critiques',
        active: focus === 'reviews',
        href: `/film/${movieId}/reviews`,
        },
        {
        label: 'Playlists',
        active: focus === 'playlists',
        href: `/film/${movieId}/playlists`,
        }
    ];

    return (
        <div className="inline-flex h-10 items-center justify-center bg-muted p-1 text-muted-foreground w-full rounded-full mb-4">
            {routes.map((item) => (
                <Link key={item.label} href={item.href} 
                    className={`w-full rounded-full inline-flex items-center justify-center px-3 py-1.5 text-sm font-medium ring-offset-background transition-all 
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
                    disabled:pointer-events-none disabled:opacity-50 
                    ${item.active && 'bg-accent-1 text-background shadow-sm'}`}
                >
                    {item.label}
                </Link>
            ))}
        </div>
    )
}

