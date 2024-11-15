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
import toast from 'react-hot-toast';
import { useSupabaseClient } from '@/context/supabase-context';
import { useNotifications } from '@/context/notifications-context';
import { Switch } from '@/components/ui/switch';

export function NotificationsForm() {
	const { permission } = useNotifications();
	const supabase = useSupabaseClient();
	const notificationsFormSchema = z.object({
		pushNotifications: z.boolean(),
	});

	type NotificationsFormValues = z.infer<typeof notificationsFormSchema>;

	const defaultValues: Partial<NotificationsFormValues> = {
		pushNotifications: permission.permission === 'granted',
	};

  const form = useForm<NotificationsFormValues>({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  async function onSubmit(data: NotificationsFormValues) {
    try {
      // updat permission
      data.pushNotifications ?
        await permission.enableNotifications() :
        permission.disableNotifications();
		  toast.success('Enregistré');
    } catch (error) {
    	toast.error("Une erreur s'est produite");
      form.reset();
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <h2>Push Notifications</h2>
		    {permission.permission === 'default' ? (
          <FormField
            control={form.control}
            name="pushNotifications"
            render={({ field }) => (
              <FormItem className='space-y-0 flex flex-row items-center gap-2'>
                <FormLabel>Activer</FormLabel>
                <FormControl>
                  <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : (
          <p className='text-muted-foreground'>
            Une demande de notification a déjà été faite, pour la modifier, veuillez aller dans les paramètres de votre navigateur.
          </p>
        )}
        <Button
        type="submit"
        disabled={form.formState.isSubmitting || (permission.permission === 'granted' || permission.permission === 'denied')}
        >
          Enregistrer
        </Button>
      </form>
    </Form>
  );
}
