import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Se connecter",
};

interface LoginLayoutProps {
  children: React.ReactNode;
}

export default function LoginLayout({ children }: LoginLayoutProps) {
  return (children);
}
