'use client';

import { Icons } from '@/config/icons';
import { Images } from '@/config/images';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import * as z from 'zod';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { useSupabaseClient } from '@/context/supabase-context';
import { useRandomImage } from '@/hooks/use-random-image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { ArrowLeftIcon } from 'lucide-react';
import { AuthError } from '@supabase/supabase-js';

const emailSchema = z
  .string()
  .email({
    message: 'Adresse email invalide',
  });

export default function ForgotPassword() {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect');
  const [email, setEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const bgImage = useRandomImage(Images.auth.forgotPassword.background);
  // OTP
  const numberOfDigits = 6;
  const [showOtp, setShowOtp] = useState<boolean>(false);

  const handleSubmit = async (event?: React.SyntheticEvent) => {
    event?.preventDefault();
    try {
      setIsLoading(true);
      emailSchema.parse(email);
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${location.origin}/auth/reset-password`,
      });
      if (error) throw error;
      toast.success('Demande envoyée');
      setShowOtp(true);
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.map((currError) => {
          toast.error(currError.message);
        });
      } else if (error instanceof AuthError) {
        switch (error.status) {
          case 429:
            toast.error('Trop de tentatives, réessayez plus tard');
            break;
          default:
            toast.error(error.message);
        }
      } else {
        toast.error("Une erreur s\'est produite");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (otp: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.verifyOtp({
        email: email,
        token: otp,
        type: 'recovery',
      });
      if (error) throw error;
      toast.success('Code vérifié');
      router.push('/settings/security');
      router.refresh();
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.status) {
          case 403:
            toast.error('Code invalide');
            break
          default:
            toast.error(error.message);
        }
      } else {
        toast.error("Une erreur s\'est produite");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="h-full w-full flex items-center justify-center"
      style={{
        backgroundImage: `url(${bgImage?.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
    {!showOtp ? (
    <form onSubmit={handleSubmit}>
      <Card className="w-full max-w-[400px]">
        <CardHeader className='gap-2'>
          <CardTitle className='inline-flex gap-2 items-center justify-center'>
            <Icons.site.icon className='fill-accent-1 w-8' />
            Mot de passe oublié ?
          </CardTitle>
          <CardDescription>
            Utilises un gestionnaire de mot de passe, c&apos;est vachement pratique.
          </CardDescription>
        </CardHeader>
        <CardContent className='grid gap-2'>
              <Label htmlFor="email">Email</Label>
              <Input
              id="email"
              type="email"
              placeholder="jason.bourne@cia.com"
              autoCapitalize='none'
              autoComplete='email'
              autoCorrect='off'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />
        </CardContent>
        <CardFooter className='grid gap-2'>
          <Button className="w-full" disabled={isLoading}>
            {isLoading ? (<Icons.loader />) : null}
            Envoyer
          </Button>
          <p className="px-8 text-center text-sm text-muted-foreground">
            Oups, finalement je connais mon mot de passe.{' '}
            <Button
              variant={'link-accent-1'}
              className='inline p-0' 
              asChild
            >
              <Link
                href={{
                  pathname: '/auth/login',
                  query: redirectTo ? { redirect: redirectTo } : undefined,
                }}
              >
                Se connecter
              </Link>

            </Button>
          </p>
        </CardFooter>
      </Card>
    </form>
    ) : (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Button variant={"ghost"} onClick={() => setShowOtp(false)}>
            <ArrowLeftIcon className='w-6' />
          </Button>
          Code de vérification
        </CardTitle>
        <CardDescription>
          Un code de vérification a été envoyé à l&apos;adresse <strong>{email}</strong>
        </CardDescription>
      </CardHeader>
      <CardContent className='grid gap-2 justify-items-center'>
        <InputOTP disabled={isLoading} maxLength={numberOfDigits} onChange={(e) => e.length === numberOfDigits && handleVerifyOtp(e)}>
          <InputOTPGroup>
            {Array.from({ length: numberOfDigits }).map((_, index) => (
              <InputOTPSlot key={index} index={index}/>
            ))}
          </InputOTPGroup>
        </InputOTP>
        <p className="px-8 text-center text-sm text-muted-foreground">
          Vous n&apos;avez pas reçu de code ?{' '}
          <Button variant={"link-accent-1"} className='p-0' onClick={() => handleSubmit()} disabled={isLoading}>
            Renvoyer le code
          </Button>
        </p>
      </CardContent>

    </Card>
    )}

    </div>
  );
}