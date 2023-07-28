"use client"
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ImageWithFallback } from '@/components/ImageWithFallback';
import { Button } from '../ui/button';
import Link from 'next/link';
import { useUser } from '@/context/user';
import { MovieAction } from './action/MovieAction';

import { format } from "date-fns"
import { fr } from "date-fns/locale";

export function MovieReview({ movie } : { movie: any }) {
    const { user } = useUser();

    


    
    return (
        <div className=' w-full'>
            REVIEW
            
        </div>
    )
}