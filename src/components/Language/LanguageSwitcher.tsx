'use client';

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useAuth } from "@/context/AuthContext/auth-context";
import { useLocale } from "next-intl";

import { useRouter, usePathname } from 'next-intl/client';

export default function LanguageSwticher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const handleChange = (e: string) => {
    router.push(pathname, { locale: e });
  };

  return (
    <Select onValueChange={handleChange} defaultValue={locale}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a language" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="fr">Français</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
    // <select value={locale} onChange={handleChange}>
    //   <option value="en">English</option>
    //   <option value="de">Deutsch</option>
    //   <option value="es">Español</option>
    //   <option value="ja">日本語</option>
    // </select>
  );
}