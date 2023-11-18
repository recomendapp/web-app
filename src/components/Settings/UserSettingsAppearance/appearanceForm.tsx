"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { ChevronDownIcon } from "@radix-ui/react-icons"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button, buttonVariants } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"
import { useLocale, useTranslations } from "next-intl"
import { Lang } from "@/types/type.i18n"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTheme } from "next-themes"
// import { usePathname, useRouter } from "next-intl/client"
import {createSharedPathnamesNavigation} from 'next-intl/navigation';
import { Theme } from "@/types/type.theme"
import { usePathname, useRouter } from "@/lib/next-intl/navigation"

const appearanceFormSchema = z.object({
  theme: z.enum(["light", "dark"], {
    required_error: "Please select a theme.",
  }),
  language: z.enum(["en", "fr"], {
    invalid_type_error: "Select a language",
    required_error: "Please select a language.",
  }),
})

type AppearanceFormValues = z.infer<typeof appearanceFormSchema>

// This can come from your database or API.

export function AppearanceForm() {

  const t = useTranslations('settings');
  const locale = useLocale();
  const { setTheme, theme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const defaultValues: Partial<AppearanceFormValues> = {
    language: locale as Lang | undefined,
    theme: theme as Theme| undefined,
  }
  const form = useForm<AppearanceFormValues>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues,
  })

  function onSubmit(data: AppearanceFormValues) {
    if (data.theme != theme)
      setTheme(data.theme);
    if (locale != data.language)
      router.push(pathname, { locale: data.language });

  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('appearance.language.label')}</FormLabel>
              <div className="relative w-max">
                <FormControl>
                  <select
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "w-[200px] appearance-none bg-transparent font-normal"
                    )}
                    {...field}
                  >
                    <option value="en">English</option>
                    <option value="fr">Français</option>
                  </select>
                </FormControl>
                <ChevronDownIcon className="absolute right-3 top-2.5 h-4 w-4 opacity-50" />
              </div>
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

        <Button type="submit">{t('appearance.update_preferences')}</Button>
      </form>
    </Form>
  )
}