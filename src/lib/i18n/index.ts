import i18next, { i18nPromise } from './i18next'
import { TFunction } from 'i18next'
import { headerName, fallbackLng } from './settings'
import { headers } from 'next/headers'

type GetT = {
  t: TFunction
  i18n: typeof i18next
}

export async function getT(ns?: string | string[], options?: { keyPrefix?: string }): Promise<GetT> {
  await i18nPromise

  const headerList = await headers()
  const lng = headerList.get(headerName) || fallbackLng

  if (i18next.resolvedLanguage !== lng) {
    await i18next.changeLanguage(lng)
  }

  if (ns && !i18next.hasLoadedNamespace(Array.isArray(ns) ? ns[0] : ns)) {
    await i18next.loadNamespaces(ns)
  }

  return {
    t: i18next.getFixedT(lng, Array.isArray(ns) ? ns[0] : ns, options?.keyPrefix),
    i18n: i18next
  }
}
