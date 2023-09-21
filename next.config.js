/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
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
    ];
  },
  async rewrites() {
    return [
      {
        source: '/@:username',
        destination: '/user/:username',
      },
      {
        source: '/@:username/playlists',
        destination: '/user/:username/playlists',
      },
      {
        source: '/@:username/films',
        destination: '/user/:username/films',
      },
      {
        source: '/@:username/stats',
        destination: '/user/:username/stats',
      },
    ];
  },
};

module.exports = nextConfig;
