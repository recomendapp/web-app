"use client"

import { useAuth } from "@/context/AuthContext/AuthProvider"
import Loader from "@/components/Loader/Loader";
import { useTranslations } from "next-intl";
import PreviewWatchlist from "@/components/Dashboard/components/previewWatchlist";

export default function Dashboard() {
    const { user, loading } = useAuth();
    const t = useTranslations('word');

    if (!user || loading)
        return (
            <Loader />
        )
    return (
        <main className="flex flex-col gap-4 p-4">
            <div className="text-4xl font-bold">{t('hello')} {user.full_name}</div>
            <PreviewWatchlist />
        </main>
    )
}