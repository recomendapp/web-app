const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  customWorkerSrc: "service-worker",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});

const withNextIntl = require('next-intl/plugin')(
  './src/i18n.ts'
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      'huecemdnsnivsvwhkiqz.supabase.co',
      'image.tmdb.org',
      'images.justwatch.com',
      'cloud.appwrite.io',
      'images.unsplash.com',
      'mosaic.scdn.co',
      'misc.scdn.co',
      'localhost',
      's.ltrbxd.com',
      'media.giphy.com'
    ],
  },
  async redirects() {
    return [
      {
        source: '/settings',
        destination: '/settings/profile',
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

module.exports = withPWA(withNextIntl(nextConfig));
