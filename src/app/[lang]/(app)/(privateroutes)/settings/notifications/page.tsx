'use client'

import { Separator } from "@/components/ui/separator";
import { NotificationsForm } from "./_components/notificationsForm";
import { useT } from "@/lib/i18n/client";

export default function SettingsNotificationsPage() {
  const { t } = useT();
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{t('pages.settings.notifications.label')}</h3>
        <p className="text-sm text-muted-foreground text-justify">
          {t('pages.settings.notifications.description')}
        </p>
      </div>
      <Separator />
      <NotificationsForm />
    </div>
  );
}