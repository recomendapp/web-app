import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Une erreur s\'est produite",
};

interface AuthErrorLayoutProps {
  children: React.ReactNode;
}

export default function AuthErrorLayout({ children }: AuthErrorLayoutProps) {
  return (children);
}
