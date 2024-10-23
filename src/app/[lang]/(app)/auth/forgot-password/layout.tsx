import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Mot de passe oublié",
};

interface ForgotPasswordLayoutProps {
  children: React.ReactNode;
}

export default function ForgotPasswordLayout({ children }: ForgotPasswordLayoutProps) {
  return (children);
}
