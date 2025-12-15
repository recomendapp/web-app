'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import i18next from './i18next'
import { useTranslation, UseTranslationOptions } from 'react-i18next'
import { fallbackLng } from './settings'

const runsOnServerSide = typeof window === 'undefined'

export function useT(ns?: string | string[], options?: UseTranslationOptions<undefined>) {
  const params = useParams()
  const lng = (params.lang as string) || fallbackLng
  
  // This logic is adapted from the official i18next example for Next.js App Router.
  // It appears to violate the rules of hooks by calling them conditionally,
  // but it's a deliberate workaround to handle the i18next instance state
  // in different rendering environments (SSR vs. client-side).
  if (runsOnServerSide && i18next.resolvedLanguage !== lng) {
    i18next.changeLanguage(lng)
  } else {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [activeLng, setActiveLng] = useState(i18next.resolvedLanguage)
    
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (activeLng === i18next.resolvedLanguage) return
      setActiveLng(i18next.resolvedLanguage)
    }, [activeLng, i18next.resolvedLanguage])

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (!lng || i18next.resolvedLanguage === lng) return
      i18next.changeLanguage(lng)
    }, [lng])
  }

  return useTranslation(ns, options)
}

export function useFormatter() {
  const { i18n } = useTranslation();

  const locale = i18n.resolvedLanguage || 'en-US';

  return {
    dateTime(
      date: Date,
      options?: Intl.DateTimeFormatOptions
    ) {
      return new Intl.DateTimeFormat(locale, options).format(date);
    },

    number(
      value: number,
      options?: Intl.NumberFormatOptions
    ) {
      return new Intl.NumberFormat(locale, options).format(value);
    },

    relativeTime(
      value: Date,
      unit: Intl.RelativeTimeFormatUnit,
      options?: Intl.RelativeTimeFormatOptions
    ) {
      return new Intl.RelativeTimeFormat(locale, options).formatToParts(
        (() => {
          const now = new Date();
          const diff = value.getTime() - now.getTime();
          switch (unit) {
            case 'year':
              return Math.round(diff / (1000 * 60 * 60 * 24 * 365));
            case 'month':
              return Math.round(diff / (1000 * 60 * 60 * 24 * 30));
            case 'week':
              return Math.round(diff / (1000 * 60 * 60 * 24 * 7));
            case 'day':
              return Math.round(diff / (1000 * 60 * 60 * 24));
            case 'hour':
              return Math.round(diff / (1000 * 60 * 60));
            case 'minute':
              return Math.round(diff / (1000 * 60));
            case 'second':
              return Math.round(diff / 1000);
            default:
              return 0;
          }
        })(),
        unit
      );
    }
  };
}
