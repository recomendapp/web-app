'use client';
import { Separator } from '@/components/ui/separator';
import { ProfileForm } from '@/components/modules/UserSettings/UserSettingsProfile/profileForm';

export default function SettingsProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profil</h3>
        <p className="text-sm text-muted-foreground text-justify">
          C&apos;est ainsi que les autres vous verront sur le site.
        </p>
      </div>
      <Separator />
      <ProfileForm />
    </div>
  );
}
