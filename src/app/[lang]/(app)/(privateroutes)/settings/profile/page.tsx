'use client';
import { Separator } from '@/components/ui/separator';
import { ProfileForm } from '@/app/[lang]/(app)/(privateroutes)/settings/profile/components/profileForm';
import { useTranslations } from 'next-intl';

export default function SettingsProfilePage() {
  const t = useTranslations('settings');
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{t('profile.label')}</h3>
        <p className="text-sm text-muted-foreground text-justify">
          {t('profile.description')}
        </p>
      </div>
      <Separator />
      <ProfileForm />
    </div>
  );
}
