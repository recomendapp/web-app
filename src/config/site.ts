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
  // logo: {
  //   href: '/recomend_logo.svg',
  //   alt: 'Recomend Logo',
  //   file: logo,
  // },
  // icon: {
  //   href: '/recomend_icon.svg',
  //   alt: 'Recomend Logo',
  //   file: icon,
  // },
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
    { icon: Icons.check, label: 'Tracking', description: 'Keep an eye on the films you have seen', iconClass: '' },
		{ icon: Icons.send, label: 'Recos', description: 'Send films recommendations to your friends', iconClass: '' },
		{ icon: Icons.explore, label: 'Explore', description: 'Discover new films on Paradise Pictures, an interactive map with more than 1400 films', iconClass: '' },
		{ icon: Icons.like, label: 'Like', description: 'Show your love for your favorite films, playlists and critics', iconClass: '' },
		{ icon: Icons.rating, label: 'Rating', description: 'Rate the films you have seen', iconClass: '' },
		{ icon: Icons.watchlist, label: 'Watchlist', description: 'Save films you want to see', iconClass: '' },
		{ icon: Icons.addPlaylist, label: 'Playlists', description: 'Organize your films in playlists and share them', iconClass: '' },
		{ icon: Icons.movieReview, label: 'Review', description: 'Write critics on films', iconClass: '' },
		{ icon: Icons.feed, label: 'Feed', description: 'Follow your friends\'s activities', iconClass: '' },
		{ icon: Icons.lock, label: 'Ads free', description: 'Enjoy Recomend without ads, forever', iconClass: '' },
  ]
};
