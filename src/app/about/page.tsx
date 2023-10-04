import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'À propos',
};

export default function About() {
  return (
    <main className="container h-full relative flex flex-col items-center justify-center">
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col items-center justify-center space-y-6 sm:w-[350px]">
          ABOUT
        </div>
      </div>
    </main>
  );
}
