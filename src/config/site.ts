export type SiteConfig = typeof siteConfig;
import icon from '@/assets/recomend_icon.svg';
import logo from '@/assets/recomend_logo.svg';

export const siteConfig = {
  name: 'Recomend',
  description: 'An other way to discover movies',
  mainNav: [
    {
      title: 'Accueil',
      href: '/',
    },
  ],
  logo: {
    href: '/recomend_logo.svg',
    alt: 'Recomend Logo',
    file: logo,
  },
  icon: {
    href: '/recomend_icon.svg',
    alt: 'Recomend Logo',
    file: icon,
  },
  links: {
    twitter: 'https://twitter.com/xmesky',
    github: 'https://github.com/xmesky',
  },
  colors: [
    "#eb4034",
    "#34cfeb",
    "#ebc034",
    "#ad00ab",
    
  ]
};
