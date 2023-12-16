export type SiteConfig = typeof siteConfig;

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
  },
  icon: {
    href: '/recomend_icon.svg',
    alt: 'Recomend Logo',
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
