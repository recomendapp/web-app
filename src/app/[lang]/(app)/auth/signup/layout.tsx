import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "S\'inscrire",
};

interface SignupLayoutProps {
  children: React.ReactNode;
}

export default function SignupLayout({ children }: SignupLayoutProps) {
  return (children);
}
