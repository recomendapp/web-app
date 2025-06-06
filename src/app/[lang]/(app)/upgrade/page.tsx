import {
  getActiveProductsWithPrices,
  getSession,
} from '@/lib/supabase/server';
import { Upgrade } from './_components/Upgrade';
import { getTranslations } from 'next-intl/server';
import { upperFirst } from 'lodash';
import { siteConfig } from '@/config/site';
import { Metadata } from 'next';

export async function generateMetadata(
  props: {
      params: Promise<{
        lang: string;
      }>;
    }
): Promise<Metadata> {
  const params = await props.params;
  const t = await getTranslations({ locale: params.lang, namespace: 'pages' });
  return {
    title: upperFirst(t('upgrade.metadata.title')),
  description: upperFirst(t('upgrade.metadata.description', { app: siteConfig.name })),
  };
}

export default async function UpgradePage() {
  const [session, products] = await Promise.all([
    getSession(),
    getActiveProductsWithPrices(),
  ]);
  const product = products.find((product) => product.name?.toLowerCase() === 'premium');
  if (!product) throw new Error('Product not found');
  return <Upgrade session={session} product={product} />;
}
