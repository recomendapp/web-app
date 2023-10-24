import { Separator } from '@/components/ui/separator';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'À propos',
};

export default function About() {
  return (
    <main className='px-4 flex flex-col gap-4 items-center'>
      <section className='flex flex-col gap-4 max-w-5xl'>
        <h2 className='text-center font-semibold text-3xl'>À propos</h2>
        <p className='text-justify'>
          Are.na is a place to save content, create collections over time and connect ideas. Privately or with other people.
          Students (highly curious and open to new information), hobbyists (deeply into a topic or topics, narrowly focused) or what we call connected knowledge collectors (those more experienced but highly curious information gatherers who can make disparate connections between disciplines) have been the core of our community for 12 years and 76 days
          With no ads, likes, or recommendations, Are.na is a more mindful space where you can work through any project over time. It&apos;s a place to structure your ideas and build new forms of knowledge together.
        </p>
      </section>
    </main>
  );
}
