import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withPWA = require('@ducanh2912/next-pwa').default({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});

const withNextIntl = createNextIntlPlugin('./src/lib/i18n/request.ts');

const nextConfig: NextConfig = {
  reactStrictMode: true,
  reactCompiler: true,
  output: 'standalone',
  images: {
    // unoptimized: true, // Issue: https://github.com/vercel/next.js/issues/54482
    remotePatterns: [
      new URL('https://api.recomend.app/**'),
      new URL('https://image.tmdb.org/**'),
      new URL('https://images.justwatch.com/**'),
      new URL('https://s.ltrbxd.com/**'),
      new URL('https://media.giphy.com/**'),
    ]
  },
  async redirects() {
    return [
      {
        source: '/settings',
        destination: '/settings/profile',
        permanent: true,
      },
      {
        source: '/legal',
        destination: '/legal/terms-of-use',
        permanent: true,
      },
      {
        source: '/auth',
        destination: '/auth/login',
        permanent: true,
      },
      {
        source: '/user/:username/:path*',
        destination: '/@:username/:path*',
        permanent: true,
      },
      // TV Series
      {
        source: '/tv_series/:path*',
        destination: '/tv-series/:path*',
        permanent: true,
      }
    ];
  },
  async rewrites() {
    return [
      {
        source: '/:lang/@:username/:path*',
        destination: '/:lang/user/:username/:path*',
      },
    ];
  },
};

export default withPWA(withNextIntl(nextConfig));