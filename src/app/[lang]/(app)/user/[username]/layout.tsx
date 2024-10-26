import { Fragment } from 'react';
import { getProfile } from './_components/getProfile';

export async function generateMetadata({
  params,
}: {
  params: { username: string };
}) {
  const user = await getProfile(params.username);
  if (!user) return {
      title: 'Oups, utilisateur introuvable !',
  };
  return {
    title: `${user.full_name} (@${user.username})`,
    description: `This is the page of @${user.username}`,
  };
}

interface UserLayoutProps {
  params: { username: string };
  children: React.ReactNode;
}

export default async function UserLayout({
  children,
}: UserLayoutProps) {

  return <Fragment>{children}</Fragment>;
}
