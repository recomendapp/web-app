'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import { useLocale, useTranslations } from 'next-intl';
import { Lang } from '@/types/type.i18n';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { useTheme } from 'next-themes';
import { Theme } from '@/types/type.theme';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '@/context/auth-context';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { Icons } from '@/config/icons';
import { useRouter } from 'next/navigation';
import Loader from '@/components/Loader/Loader';
import { useSupabaseClient } from '@/context/supabase-context';
import { routing } from '@/lib/i18n/routing';
import { useLocalizedLanguageName } from '@/hooks/use-localized-language-name';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ChevronsUpDown } from 'lucide-react';

const appearanceFormSchema = z.object({
  theme: z.enum(['light', 'dark'], {
    required_error: 'Please select a theme.',
  }),
  language: z.enum(routing.locales as [string, ...string[]], {
    invalid_type_error: 'Select a language',
    required_error: 'Please select a language.',
  }),
});

type AppearanceFormValues = z.infer<typeof appearanceFormSchema>;

// This can come from your database or API.

export function AppearanceForm() {
  const supabase = useSupabaseClient();
  const t = useTranslations('pages.settings');
  const common = useTranslations('common');
  const locale = useLocale();
  const [loading, setLoading] = useState(false);
  const { setTheme, theme } = useTheme();
  const router = useRouter();
  const { user, loading: userLoading } = useAuth();
  const locales = useLocalizedLanguageName(routing.locales);

  const { mutateAsync: updateProfile } = useMutation({
    mutationFn: async (payload: any) => {
      if (!user?.id) throw new Error('No user id');
      const {
        data,
        error
      } = await supabase
        .from('user')
        .update(payload)
        .eq('id', user?.id)
        .select('*');
      if (error) throw error;
      return data;
    }
  });

  const defaultValues: Partial<AppearanceFormValues> = {
    language: locale as Lang | undefined,
    theme: theme as Theme | undefined,
  };
  const form = useForm<AppearanceFormValues>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues,
  });

  useEffect(() => {
    form.reset(defaultValues);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale, theme, user, defaultValues]);


  async function onSubmit(data: AppearanceFormValues) {
    try {
      setLoading(true);
      if (data.theme != theme) setTheme(data.theme);
      if (locale != data.language)
      {
        await updateProfile({ language: data.language });
        router.refresh();
      }
      toast.success(common('word.saved'));
    } catch (error) {
      toast.error(common('error'));
    } finally {
      setLoading(false);
    }
  }

  if (!user) return <Loader />;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>{t('appearance.language.label')}</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      role="combobox"
                      className={cn(
                        "max-w-[250px] justify-between",
                        !field.value && 'text-muted-foreground',
                      )}
                    >
                      <span className='line-clamp-1'>
                      {field.value ? (
                        (() => {
                          const locale = locales.find((locale) => locale.language === field.value);
                          return `${locale?.flag} ${locale?.iso_639_1} (${locale?.iso_3166_1})`;
                        })()
                      ) : t('appearance.language.placeholder')}
                      </span>
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent align='start' className='max-w-xs p-0'>
                  <Command>
                    <CommandInput placeholder={t('appearance.language.placeholder')} />
                    <CommandList>
                      <CommandEmpty>{t('appearance.language.not_found')}</CommandEmpty>
                      <CommandGroup>
                        {locales.map((locale, i) => (
                          <CommandItem
                          key={i}
                          value={`${locale.iso_639_1} ${locale.iso_3166_1}`}
                          onSelect={() => form.setValue('language', locale.language)}
                          >
                            <Icons.check
                              className={cn(
                                "mr-2 h-4 w-4",
                                locale.language === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {locale.flag} {locale.iso_639_1} ({locale.iso_3166_1})
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
                {t('appearance.language.description')}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="theme"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>{t('appearance.theme.label')}</FormLabel>
              <FormDescription>
                {t('appearance.theme.description')}
              </FormDescription>
              <FormMessage />
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid max-w-md grid-cols-2 gap-8 pt-2"
              >
                <FormItem>
                  <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                    <FormControl>
                      <RadioGroupItem value="light" className="sr-only" />
                    </FormControl>
                    <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
                      <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                        <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                          <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                          <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                        </div>
                        <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                          <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                          <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                        </div>
                        <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                          <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                          <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                        </div>
                      </div>
                    </div>
                    <span className="block w-full p-2 text-center font-normal">
                      {t('appearance.theme.options.light')}
                    </span>
                  </FormLabel>
                </FormItem>
                <FormItem>
                  <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                    <FormControl>
                      <RadioGroupItem value="dark" className="sr-only" />
                    </FormControl>
                    <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
                      <div className="space-y-2 rounded-sm bg-background-border p-2">
                        <div className="space-y-2 rounded-md bg-background p-2 shadow-sm">
                          <div className="h-2 w-[80px] rounded-lg bg-muted" />
                          <div className="h-2 w-[100px] rounded-lg bg-muted" />
                        </div>
                        <div className="flex items-center space-x-2 rounded-md bg-background p-2 shadow-sm">
                          <div className="h-4 w-4 rounded-full bg-muted" />
                          <div className="h-2 w-[100px] rounded-lg bg-muted" />
                        </div>
                        <div className="flex items-center space-x-2 rounded-md bg-background p-2 shadow-sm">
                          <div className="h-4 w-4 rounded-full bg-muted" />
                          <div className="h-2 w-[100px] rounded-lg bg-muted" />
                        </div>
                      </div>
                    </div>
                    <span className="block w-full p-2 text-center font-normal">
                      {t('appearance.theme.options.dark')}
                    </span>
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading}>
          {loading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          {common('word.save')}
        </Button>
      </form>
    </Form>
  );
}
