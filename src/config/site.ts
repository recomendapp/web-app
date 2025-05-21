export type SiteConfig = typeof siteConfig;
import icon from '@/assets/recomend_icon.svg';
import logo from '@/assets/recomend_logo.svg';
import { Icons } from './icons';

export const siteConfig = {
  name: 'Recomend',
  description: 'An other way to discover movies',
  domain: 'recomend.app',
  mainNav: [
    {
      title: 'Accueil',
      href: '/',
    },
  ],
  seo: {
    description: {
      limit: 160,
    }
  },
  links: {
    twitter: 'https://twitter.com/xmesky',
    github: 'https://github.com/xmesky',
  },
  socials: {
    twitter: {
      username: 'recomendHD',
      url: 'https://x.com/recomendHD',
    }
  },
  colors: ['#eb4034', '#34cfeb', '#ebc034', '#ad00ab'],
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
  ]
};
