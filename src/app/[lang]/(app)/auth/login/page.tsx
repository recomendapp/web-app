"use client";

import { LoginPasswordForm } from './_components/LoginPasswordForm';
import { Icons } from '@/config/icons';
import { Images } from '@/config/images';
import { siteConfig } from '@/config/site';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Provider } from '@supabase/supabase-js';
import { useAuth } from '@/context/auth-context';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { useRandomImage } from '@/hooks/use-random-image';
import { RectangleEllipsisIcon } from 'lucide-react';

export default function Login() {
  const { loginOAuth2 } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect');
  const bgImage = useRandomImage(Images.auth.login.background);

  async function handleLoginOAuth2(provider: Provider) {
    try {
      setIsLoading(true);
      await loginOAuth2(provider);
    } catch (error) {
      toast.error("Une erreur s'est produite");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div
      className="h-full w-full flex flex-col items-center justify-center"
      style={{
        backgroundImage: `url(${bgImage?.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Card className="@container w-full max-w-[400px]">
        <CardHeader className='gap-2'>
          <CardTitle className='inline-flex gap-2 items-center justify-center'>
            <Icons.site.icon className='fill-accent-1 w-8' />
            Se connecter
          </CardTitle>
          <CardDescription>
            Découvrez les meilleures recommandations de films.
          </CardDescription>
        </CardHeader>
        <CardContent className='grid gap-4'>
          <LoginPasswordForm redirectTo={redirectTo} />
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Ou continuer avec
              </span>
            </div>
          </div>
          <div className="grid @xs:grid-cols-2 gap-2 @xs:gap-4">
            <Button
              variant={'outline'}
              disabled={isLoading}
              className='col-span-2'
              asChild
            >
              <Link
                href={{
                  pathname: '/auth/login/otp',
                  query: redirectTo ? { redirect: redirectTo } : undefined,
                }}
              >
                <RectangleEllipsisIcon className="mr-2 h-4 w-4" />
                OTP
              </Link>
            </Button>
            {siteConfig.oauth2.map((provider, i) => (
              <Button
                key={provider.name}
                variant={'outline'}
                onClick={() => handleLoginOAuth2(provider.name.toLowerCase() as Provider)}
                disabled={!provider.enabled || isLoading}
                className={siteConfig.oauth2.length % 2 !== 0 && i === siteConfig.oauth2.length - 1 ? 'col-span-2' : ''}
              >
                <provider.icon className="mr-2 h-4 w-4" />
                {provider.name}
              </Button>
            ))}
          </div>
          <p className="px-8 text-center text-sm text-muted-foreground">
            Pas encore de compte ?{' '}
            <Button
              variant={'link-accent-1'}
              className='inline p-0' 
              asChild
            >
              <Link
                href={{
                  pathname: '/auth/signup',
                  query: redirectTo ? { redirect: redirectTo } : undefined,
                }}
              >
                S&apos;inscrire
              </Link>
            </Button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
