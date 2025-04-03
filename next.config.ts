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
  reactStrictMode: false,
  output: 'standalone',
  images: {
    // unoptimized: true, // Issue: https://github.com/vercel/next.js/issues/54482
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.recomend.app',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'huecemdnsnivsvwhkiqz.supabase.co',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'images.justwatch.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'cloud.appwrite.io',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'mosaic.scdn.co',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'misc.scdn.co',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 's.ltrbxd.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'media.giphy.com',
        port: '',
        pathname: '**',
      },
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
        source: '/auth',
        destination: '/auth/login',
        permanent: true,
      },
      {
        source: '/user/:username/:path*',
        destination: '/@:username/:path*',
        permanent: true,
      },
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