const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development'
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
        source: '/:lang/settings',
        destination: '/:lang/settings/profile',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/:lang/@:username',
        destination: '/:lang/user/:username',
      },
      {
        source: '/:lang/@:username/playlists',
        destination: '/:lang/user/:username/playlists',
      },
      {
        source: '/:lang/@:username/films',
        destination: '/:lang/user/:username/films',
      },
      {
        source: '/:lang/@:username/stats',
        destination: '/:lang/user/:username/stats',
      },
      {
        source: '/:lang/@:username/film/:film',
        destination: '/:lang/user/:username/film/:film',
      },
    ];
  },
};

module.exports = withPWA(withNextIntl(nextConfig));
