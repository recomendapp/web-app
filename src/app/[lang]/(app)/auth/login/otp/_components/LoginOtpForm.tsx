'use client';
import Link from 'next/link';

import { Icons } from '@/config/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import toast from 'react-hot-toast';
import * as z from 'zod';
import { AuthError } from '@supabase/supabase-js';
import { useAuth } from '@/context/auth-context';
import { useState } from 'react';
import { useSupabaseClient } from '@/context/supabase-context';
import { useRouter } from 'next/navigation';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { ArrowLeftIcon } from 'lucide-react';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const emailSchema = z
  .string()
  .email({
    message: 'Adresse email invalide',
  });
export function LoginOtpForm({
  className,
  redirectTo,
  ...props
} : React.HTMLAttributes<HTMLDivElement> & { redirectTo: string | null }) {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const { loginWithOtp } = useAuth();
  const [email, setEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // OTP
  const numberOfDigits = 6;
  const [showOtp, setShowOtp] = useState<boolean>(false);

  const handleSubmit = async (event?: React.SyntheticEvent) => {
    event?.preventDefault();
    try {
      setIsLoading(true);
      emailSchema.parse(email);
      await loginWithOtp(email, redirectTo);
      toast.success('Code envoyé');
      setShowOtp(true);
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.map((currError) => {
          toast.error(currError.message);
        });
      } else if (error instanceof AuthError) {
        switch (error.status) {
          case 500:
            toast.error('Aucun utilisateur trouvé avec cet e-mail');
            break;
          default:
            toast.error(error.message);
        }
      } else {
        toast.error("Une erreur s'est produite");
      }
    } finally {
      setIsLoading(false);
    }
  }

  const handleVerifyOtp = async (otp: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.verifyOtp({
        email: email,
        token: otp,
        type: 'email',
      });
      if (error) throw error;
      toast.success('Connecté');
      router.push(redirectTo || '/');
      router.refresh();
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.status) {
          case 400:
            toast.error('Code OTP invalide');
            break;
          default:
            toast.error(error.message);
        }
      } else {
        toast.error("Une erreur s'est produite");
      }
    } finally {
      setIsLoading(false);
    }
  }

  if (showOtp) return (
    <>
      <CardHeader className='p-0'>
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
      <CardContent className='p-0 grid gap-2 justify-items-center'>
        <InputOTP disabled={isLoading} maxLength={numberOfDigits} onChange={(e) => e.length === numberOfDigits && handleVerifyOtp(e)}>
          <InputOTPGroup>
            {Array.from({ length: numberOfDigits }).map((_, index) => (
              <InputOTPSlot key={index} index={index}/>
            ))}
          </InputOTPGroup>
        </InputOTP>
        <p className="px-8 text-center text-sm text-muted-foreground">
          Vous n&apos;avez pas reçu de code ?{' '}
          <Button variant={"link"} className='p-0' onClick={() => handleSubmit()} disabled={isLoading}>
            Renvoyer le code
          </Button>
        </p>
      </CardContent>
    </>
  )

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-2">
        <div className="grid gap-1">
          <Label htmlFor="email">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="jeanluc.godard@gmail.com"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            disabled={isLoading}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <Button disabled={isLoading}>
          {isLoading ? (<Icons.loader />) : null}
          Recevoir le code
        </Button>
      </div>
    </form>
  );
}
