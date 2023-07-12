'use client' // Error components must be Client Components
 
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div className='w-full flex flex-col items-center'>
      <h2>Oups, l&apos;utilisateur est introuvable !</h2>
      <Button asChild>
        <Link href={'/'} >
          Retour à l&apos;Accueil
        </Link>
      </Button>
    </div>
  )
}