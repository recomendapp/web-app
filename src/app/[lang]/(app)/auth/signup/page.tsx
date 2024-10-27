
"use client"

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
  } from "@/components/ui/card"
import { Icons } from '@/config/icons';
import { Images } from '@/config/images';
import { useRandomImage } from '@/hooks/use-random-image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { use, useEffect, useMemo, useState } from 'react';
import { useSupabaseClient } from '@/context/supabase-context';
import { useLocale } from 'next-intl';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import toast from 'react-hot-toast';
import { AuthError } from '@supabase/supabase-js';
import { useAuth } from '@/context/auth-context';
import { Input } from '@/components/ui/input';
import useDebounce from '@/hooks/use-debounce';
import { useCheckUsernameAvailability } from '@/hooks/use-check-username-availability';
import { InputPassword } from '@/components/ui/input-password';

const USERNAME_MIN_LENGTH = 3;
const USERNAME_MAX_LENGTH = 15;
const FULL_NAME_MIN_LENGTH = 1;
const FULL_NAME_MAX_LENGTH = 50;
const PASSWORD_MIN_LENGTH = 8;

const signupSchema = z.object({
	email: z.string().email({
	  message: 'Adresse email invalide.',
	}),
	username: z
	  .string()
	  .min(USERNAME_MIN_LENGTH, {
		message: `${USERNAME_MIN_LENGTH} caractères minimum.`,
	  })
	  .max(USERNAME_MAX_LENGTH, {
		message: `${USERNAME_MAX_LENGTH} caractères maximum.`,
	  })
	  .regex(/^[^\W]/, {
		message: "Le premier caractère doit être une lettre ou un chiffre.",
	  })
	  .regex(/^(?!.*\.\.)/, {
		message: "Deux points consécutifs ne sont pas autorisés.",
	  })
	  .regex(/^(?!.*\.$)/, {
		message: "Un point à la fin n'est pas autorisé.",
	  })
	  .regex(/^[\w.]+$/, {
		message: "Seules les lettres, les chiffres et les symboles '_' et '.' sont autorisés.",
	  }),
	full_name: z
	  .string()
	  .min(FULL_NAME_MIN_LENGTH, {
		message: `${FULL_NAME_MIN_LENGTH} caractère minimum.`,
	  })
	  .max(FULL_NAME_MAX_LENGTH, {
		message: `${FULL_NAME_MAX_LENGTH} caractères maximum.`,
	  })
	  .regex(/^[a-zA-Z0-9\s\S]*$/, {
		message: 'Seules les lettres, les chiffres et les espaces sont autorisés.',
	  }),
	password: z
	  .string()
	  .min(PASSWORD_MIN_LENGTH, {
		message: `${PASSWORD_MIN_LENGTH} caractères minimum.`,
	  })
	  .regex(/[A-Z]/, {
		message: 'Au moins une lettre majuscule est requise.',
	  })
	  .regex(/[a-z]/, {
		message: 'Au moins une lettre minuscule est requise.',
	  })
	  .regex(/[0-9]/, {
		message: 'Au moins un chiffre est requis.',
	  })
	  .regex(/[\W_]/, {
		message: 'Au moins un caractère spécial est requis.',
	  }),
	confirm_password: z
	  .string()
}).refine(data => data.password === data.confirm_password, {
	message: 'Les mots de passe ne correspondent pas.',
	path: ['confirm_password'],
});

type SignupFormValues = z.infer<typeof signupSchema>;

const defaultValues: Partial<SignupFormValues> = {
	email: '',
	full_name: '',
	username: '',
	password: '',
	confirm_password: '',
};

export default function Signup() {
	const supabase = useSupabaseClient();
	const { signup, loginWithOtp } = useAuth();
	const locale = useLocale();
	const router = useRouter();
	const searchParams = useSearchParams();
	const redirectTo = searchParams.get('redirect');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const bgImage = useRandomImage(Images.auth.signup.background);
	const form = useForm<SignupFormValues>({
		resolver: zodResolver(signupSchema),
		defaultValues: defaultValues,
		mode: 'onChange',
	});
	// OTP
	const numberOfDigits = 6;
	const [showOtp, setShowOtp] = useState<boolean>(false);
	const usernameAvailability = useCheckUsernameAvailability();
	const usernameToCheck = useDebounce(form.watch('username'), 500);

	useEffect(() => {
		if (!form.formState.errors.username?.message && usernameToCheck) {
			usernameAvailability.check(usernameToCheck);
		}
	}, [usernameToCheck]);

	useEffect(() => {
		if (usernameAvailability.isAvailable === false) {
			form.setError('username', {
				message: "Ce nom d'utilisateur n'est pas disponible.",
			});
		}
	}, [usernameAvailability.isAvailable]);
	
	const handleSubmit = async (data: SignupFormValues) => {
		try {
			setIsLoading(true);
			await signup({
				email: data.email,
				name: data.full_name,
				username: data.username,
				password: data.password,
				language: locale,
			});
			toast.success('Un email de confirmation vient de vous être envoyé');
			setShowOtp(true);
		} catch (error) {
			if (error instanceof AuthError) {
				switch (error.status) {
					case 422:
						toast.error('Cette adresse email est déjà utilisée');
						break;
					case 500:
						toast.error('Ce nom d\'utilisateur n\'est pas disponible');
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

	const resendOtp = async () => {
		try {
			setIsLoading(true);
			await loginWithOtp(form.getValues('email'), redirectTo);
			toast.success('Code renvoyé');
		} catch (error) {
			if (error instanceof AuthError) {
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
			email: form.getValues('email'),
			token: otp,
			type: 'email',
		  });
		  if (error) throw error;
		  toast.success('Email vérifié');
		  router.push(redirectTo || '/');
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
		className="h-full w-full flex flex-col items-center justify-center"
		style={{
			backgroundImage: `url(${bgImage?.src})`,
			backgroundSize: 'cover',
			backgroundPosition: 'center',
			backgroundRepeat: 'no-repeat',
		}}
    >
	{!showOtp ? (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)}>
				<Card className="w-full max-w-[400px]">
					<CardHeader className='gap-2'>
					<CardTitle className='inline-flex gap-2 items-center justify-center'>
						<Icons.site.icon className='fill-accent-1 w-8' />
						S&apos;inscrire
					</CardTitle>
					<CardDescription>
						Créez un compte pour recomender un film a ton pote qui oublie toujours le titre du film.
					</CardDescription>
					</CardHeader>
					<CardContent className='grid gap-2'>
						<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
						<FormItem>
							<FormLabel>Adresse email</FormLabel>
							<FormControl>
								<Input
								autoComplete="email"
								disabled={isLoading}
								placeholder="jeanluc.godard@gmail.com"
								{...field}
								/>
							</FormControl>
							<FormMessage className='sr-only' />
						</FormItem>
						)}
						/>
						<FormField
						control={form.control}
						name="username"
						render={({ field }) => (
							<FormItem>
							<FormLabel className='w-full flex justify-between gap-2'>
							Nom d&apos;utilisateur
							<span className='text-xs text-destructive'>{field?.value?.length > USERNAME_MAX_LENGTH ? `${field.value.length} / ${USERNAME_MAX_LENGTH}` : ''}</span>
							</FormLabel>
								<FormControl>
									<div className='relative'>
										<Input
										autoComplete="username"
										disabled={isLoading}
										placeholder="@jlgodard"
										className={usernameAvailability.isLoading ? 'pr-8' : ''}
										{...field}
										/>
										{usernameAvailability.isLoading ?
										<div className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full flex justify-center items-center h-6 w-6">
											<Icons.loader className='w-4' />
										</div>
										: null}
									</div>
								</FormControl>
							<FormDescription></FormDescription>
							<FormMessage />
							</FormItem>
						)}
						/>
						<FormField
						control={form.control}
						name="full_name"
						render={({ field }) => (
							<FormItem>
							<FormLabel className="w-full flex justify-between gap-2">
							Nom
							<span className='text-xs text-destructive'>{field?.value?.length > FULL_NAME_MAX_LENGTH ? `${field.value.length} / ${FULL_NAME_MAX_LENGTH}` : ''}</span>
							</FormLabel>
							<FormControl>
								<Input
								autoComplete="given-name"
								disabled={isLoading}
								placeholder="Jean-Luc Godard"
								{...field}
								/>
							</FormControl>
							<FormDescription></FormDescription>
							<FormMessage />
							</FormItem>
						)}
						/>
						<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
							<FormLabel>Mot de passe</FormLabel>
							<FormControl>
								<InputPassword
								disabled={isLoading}
								type="password"
								autoComplete="new-password"
								placeholder="Mot de passe"
								{...field}
								/>
							</FormControl>
							<FormDescription></FormDescription>
							<FormMessage />
							</FormItem>
						)}
						/>
						<FormField
						control={form.control}
						name="confirm_password"
						render={({ field }) => (
							<FormItem>
							<FormLabel>Confirmer le mot de passe</FormLabel>
							<FormControl>
								<InputPassword
								disabled={isLoading}
								type="password"
								autoComplete="new-password"
								placeholder="Confirmer le mot de passe"
								{...field}
								/>
							</FormControl>
							<FormDescription></FormDescription>
							<FormMessage />
							</FormItem>
						)}
						/>

					</CardContent>
					<CardFooter className='grid gap-2'>
						<Button className="w-full" disabled={isLoading}>
							{isLoading ? (<Icons.loader />) : null}
							Envoyer
						</Button>
						<p className="px-8 text-center text-sm text-muted-foreground">
							Oups, finalement j&apos;ai déjà un compte.{' '}
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
		</Form>
	) : (
		<Card className='w-full max-w-[400px]'>
			<CardHeader className='gap-2'>
				<CardTitle className='inline-flex gap-2 items-center justify-center'>
					<Icons.site.icon className='fill-accent-1 w-8' />
					Confirmation de l&apos;email
				</CardTitle>
				<CardDescription>
					Un email contenant un code de vérification a été envoyé à votre adresse email.
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
			</CardContent>
			<CardFooter>
				<p className="px-8 text-center text-sm text-muted-foreground">
					Vous n&apos;avez pas reçu de code ?{' '}
					<Button
					variant={"link-accent-1"}
					className='p-0'
					disabled={isLoading}
					onClick={resendOtp}
					>
						Renvoyer le code
					</Button>
				</p>
			</CardFooter>
		</Card>
	)}
	</div>
	)
}
