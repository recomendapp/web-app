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
    <div className='h-screen w-screen'>
      <HeaderMinimal />
      <div className="flex-grow relative p-4
          overflow-y-auto
          h-[calc(100%-(var(--height-header)))]
      ">
        {children}
      </div>
    </div>
  );
}