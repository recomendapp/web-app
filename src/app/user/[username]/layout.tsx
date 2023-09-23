import UserHeader from "@/components/modules/UserHeader/UserHeader";
import { getUserDetails } from "@/lib/appwrite";
import { notFound } from "next/navigation";
import GET_PROFILE_DETAILS_QUERY from '@/components/modules/ProfileDetails/queries/ProfileQuery'
import { getClient } from "@/lib/ApolloClient";


interface UserLayoutProps {
    params: { username: string };
    children: React.ReactNode;
  }
  

export default async function UserLayout({ params, children } : UserLayoutProps) {
    const user = await (await getClient().query({
        query: GET_PROFILE_DETAILS_QUERY,
        variables: {
        username: params.username
        }
    })).data?.userCollection?.edges[0]?.node;

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