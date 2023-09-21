import UserHeader from "@/components/modules/UserHeader/UserHeader";
import { getUserDetails } from "@/db/appwrite";
import { notFound } from "next/navigation";

interface UserLayoutProps {
    params: { username: string };
    children: React.ReactNode;
  }
  

export default async function UserLayout({ params, children } : UserLayoutProps) {
    const user = await getUserDetails(params.username);
    if (!user) notFound();
    return (
        <main>
            <UserHeader user={user} />
            <div className='p-4 flex flex-col gap-4'>
                {children}
            </div>
        </main>
    )
}