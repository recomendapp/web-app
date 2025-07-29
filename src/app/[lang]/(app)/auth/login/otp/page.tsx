"use client";

import { Icons } from '@/config/icons';
import { Images } from '@/config/images';
import { Link } from "@/lib/i18n/routing";
import { useSearchParams } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import { useRandomImage } from '@/hooks/use-random-image';
import { LoginOtpForm } from './_components/LoginOtpForm';
import { useTranslations } from 'next-intl';
import { upperFirst } from 'lodash';

export default function Login() {
  const t = useTranslations('pages.auth.login');
  const common = useTranslations('common');
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect');
  const bgImage = useRandomImage(Images.auth.login.background);

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
            <Icons.site.icon className='fill-accent-yellow w-8' />
            {t('label')}
          </CardTitle>
          <CardDescription className='text-center'>{t('description')}</CardDescription>
        </CardHeader>
        <CardContent className='grid gap-4'>
          <LoginOtpForm redirectTo={redirectTo} />
        </CardContent>
        <CardFooter>
          <p className="px-8 text-center text-sm text-muted-foreground">
            {t('otp.password_login')}{' '}
            <Button
              variant={'link-accent-yellow'}
              className='inline p-0' 
              asChild
            >
              <Link
                href={{
                  pathname: '/auth/login',
                  query: redirectTo ? { redirect: redirectTo } : undefined,
                }}
              >
                {upperFirst(common('click_here'))}
              </Link>
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
