import i18next from 'i18next'
import { initReactI18next } from 'react-i18next/initReactI18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import resourcesToBackend from 'i18next-resources-to-backend'
import { fallbackLng, languages, defaultNS } from './settings'
import deepmerge from 'deepmerge'

const runsOnServerSide = typeof window === 'undefined'

const i18n = i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(resourcesToBackend(async (language: string, namespace: string) => {
    const langFile = await import(`./dictionaries/${language}/${namespace}.json`).catch(() => ({ default: {} }));
    
    if (language === fallbackLng) {
        return langFile.default;
    }

    const fallbackFile = await import(`./dictionaries/${fallbackLng}/${namespace}.json`);

    return deepmerge(fallbackFile.default, langFile.default);
  }))
  
const i18nPromise = i18n.init({
    // debug: true,
    supportedLngs: languages,
    fallbackLng,
    lng: undefined, // let detect the language on client side
    fallbackNS: defaultNS,
    defaultNS,
    detection: {
      order: ['path', 'htmlTag', 'cookie', 'navigator']
    },
    preload: runsOnServerSide ? languages : []
  })

// The default export is the instance, for compatibility with client.ts
export default i18n
// The named export is the promise, to be awaited in server components
export { i18nPromise }
