export type SiteConfig = typeof siteConfig;
import { Icons } from './icons';
import { getURL } from '@/lib/utils';

export const siteConfig = {
  name: 'Recomend',
  tagline: 'An other way to discover cinema',
  description: 'Recomend is a social network for cinema lovers. Discover, share and explore movies and series with your friends.',
  url: getURL(),
  seo: {
    description: {
      limit: 160,
    }
  },
  socials: {
    twitter: {
      username: 'recomendHD',
      url: 'https://x.com/recomendHD',
    },
    instagram: {
      username: 'recomendhd',
      url: 'https://instagram.com/recomendhd',
    }
  },
  oauth2: [
    {
      name: 'Github',
      icon: Icons.gitHub,
      enabled: true,
    },
    {
      name: 'Google',
      icon: Icons.google,
      enabled: false,
    },
  ],
  features: [
    { icon: Icons.check, key: 'tracking', iconClass: '' },
    { icon: Icons.send, key: 'recos', iconClass: '' },
    { icon: Icons.explore, key: 'explore', iconClass: '' },
    { icon: Icons.like, key: 'like', iconClass: '' },
    { icon: Icons.rating, key: 'rating', iconClass: '' },
    { icon: Icons.watchlist, key: 'watchlist', iconClass: '' },
    { icon: Icons.addPlaylist, key: 'playlists', iconClass: '' },
    { icon: Icons.movieReview, key: 'reviews', iconClass: '' },
    { icon: Icons.feed, key: 'feed', iconClass: '' },
    { icon: Icons.lock, key: 'adsFree', iconClass: '' },
  ],
  by: {
    name: 'Loup',
    job: 'Founder/Developer',
    twitter: 'xmesky',
    github: 'lxup',
  }
};
