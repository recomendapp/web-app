import { HeaderMinimal } from '@/components/Header/HeaderMinimal';

interface AboutLayoutProps {
  children: React.ReactNode;
  params: { lang: string }
}

export default async function AboutLayout({
  children,
  params: { lang }
}: AboutLayoutProps) {
  
  return (
    <>
      <HeaderMinimal />
      {children}
    </>
  );
}