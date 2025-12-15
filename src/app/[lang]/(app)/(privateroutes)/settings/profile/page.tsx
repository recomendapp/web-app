'use client'

import { Separator } from '@/components/ui/separator';
import { ProfileForm } from '@/app/[lang]/(app)/(privateroutes)/settings/profile/_components/profileForm';
import { useT } from '@/lib/i18n/client';
// import { FavoriteMovies } from '@/components/Settings/UserSettingsProfile/FavoriteFilms/FavoriteMovies';

export default function SettingsProfilePage() {
  const { t } = useT();
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{t('pages.settings.profile.label')}</h3>
        <p className="text-sm text-muted-foreground text-justify">
          {t('pages.settings.profile.description')}
        </p>
      </div>
      <Separator />
      <ProfileForm />
      {/* <Separator /> */}
      {/* <FavoriteMovies /> */}
    </div>
  );
}
