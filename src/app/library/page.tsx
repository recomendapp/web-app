import React from 'react'
import { UserNav } from '@/components/userNav';

export default function Library() {
  return (
    <main className='h-full'>
      <div className="flex justify-between items-center w-full lg:hidden p-4">
          <div className='text-3xl'>
              Bibliothèque
          </div>
          <UserNav />
      </div>
      <div className='bg-emerald-400  flex justify-center items-center h-full'>
        ICI PROCHAINEMENT : LIBRARY
      </div>

    </main>
  )
}
