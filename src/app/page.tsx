"use client"
import { AspectRatio } from '@/components/ui/aspect-ratio'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Home() {
  const router = useRouter();
  return (
    <main className='p-4 h-full'>
      {/* TITLE */}
      <div className='text-4xl font-bold'>
        Bonjour
      </div>
      {/* CONTAINER MAP */}
      <div className='w-full flex flex-col items-center gap-4'>
        <div className=' text-4xl'>
          LA CARTE
        </div>
        <div onClick={() => router.push('/map')} className=' cursor-zoom-in h-[500px] w-[1000px] rounded-3xl overflow-hidden'>
          <Image 
              src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
              alt="Photo by Drew Beamer"
              className="object-cover"
              width={1000}
              height={1000}
            />
        </div>
          
      </div>
    </main>
  )
}
