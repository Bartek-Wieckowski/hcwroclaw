export const pathnames = {
  '/': '/',
  '/team': {
    en: '/team',
    pl: '/druzyna',
  },
  '/news': {
    en: '/news',
    pl: '/news',
  },
  '/contact': {
    en: '/contact',
    pl: '/kontakt',
  },
  '/club': {
    en: '/club',
    pl: '/klub',
  },
  '/support': {
    en: '/support',
    pl: '/wsparcie',
  },
  '/calendar-all': {
    en: '/calendar-all',
    pl: '/kalendarz',
  },
  '/gallery': {
    en: '/gallery',
    pl: '/galeria',
  },
  '/info': {
    en: '/info',
    pl: '/info',
  },
  '/trainings': {
    en: '/trainings',
    pl: '/treningi',
  },
} as const;

export const getPath = (path: keyof typeof pathnames, locale: 'en' | 'pl') => {
  const pathConfig = pathnames[path];
  return pathConfig === '/' ? '/' : pathConfig[locale];
};
