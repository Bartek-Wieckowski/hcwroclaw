import { pathnames, getPath } from './pathnames';

const getRoute = (path: keyof typeof pathnames, lng: string) =>
  lng === 'pl' ? getPath(path, 'pl') : `/${lng}${getPath(path, 'en')}`;

export const ROUTES = {
  HOME: (lng: string) => (lng === 'pl' ? '/' : `/${lng}`),
  NEWS: (lng: string) => getRoute('/news', lng),
  SINGLENEWS: (lng: string, slug: string) =>
    `${getRoute('/news', lng)}/${slug}`,
  TEAM: (lng: string) => getRoute('/team', lng),
  CLUB: (lng: string) => getRoute('/club', lng),
  CONTACT: (lng: string) => getRoute('/contact', lng),
  SUPPORT: (lng: string) => getRoute('/support', lng),
  CALENDARALL: (lng: string) => getRoute('/calendar-all', lng),
  GALLERY: (lng: string) => getRoute('/gallery', lng),
  INFO: (lng: string) => getRoute('/info', lng),
  TRAININGS: (lng: string) => getRoute('/trainings', lng),
};
