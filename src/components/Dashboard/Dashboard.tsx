"use client"

import { useAuth } from "@/context/AuthContext/AuthProvider"
import Loader from "@/components/Loader/Loader";

export default function Dashboard() {
    const { user, loading } = useAuth();

    if (!user || loading)
        return (
            <Loader />
        )
    return (
        <main>
            {user && <div className="text-4xl font-bold">Bonjour {user.full_name}</div>}
        </main>
    )
}