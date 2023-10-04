import { UserNav } from '@/components/User/UserNav/UserNav';
import React from 'react';

export default function Collection() {
  return (
    <main className="h-full">
      <div className="flex justify-between items-center w-full lg:hidden p-4">
        <div className="text-4xl font-bold">Bibliothèque</div>
        <UserNav />
      </div>
      <div className="bg-emerald-400  flex justify-center items-center h-full">
        ICI PROCHAINEMENT : LIBRARY
      </div>
    </main>
  );
}
