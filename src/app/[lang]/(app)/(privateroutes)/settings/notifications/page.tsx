'use client';

import { Separator } from "@/components/ui/separator";
import { useTranslations } from "next-intl";
import { Importer } from "../../../../../../components/Settings/Data/Importer/Importer";
import { Exporter } from "@/components/Settings/Data/Exporter/Exporter";

export default function SettingsNotificationsPage() {
  const t = useTranslations('settings');
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{t('notifications.label')}</h3>
        <p className="text-sm text-muted-foreground text-justify">
          {t('notifications.description')}
        </p>
      </div>
      <div>
        Work in progress...
      </div>
    </div>
  );
}