import { ROUTES } from '@/lib/routes';
import { Locale } from '@/i18n/config';
import { getTranslations } from '@/i18n/getTranslations';

export const getRoutesLinks = (lng: Locale) => {
  const translations = getTranslations(lng);

  return [
    {
      title: translations.routesLink.news,
      path: ROUTES.NEWS(lng),
    },
    {
      title: translations.routesLink.team,
      path: ROUTES.TEAM(lng),
    },
    {
      title: translations.routesLink.club,
      path: ROUTES.CLUB(lng),
    },
    {
      title: translations.routesLink.contact,
      path: ROUTES.CONTACT(lng),
    },
    {
      title: translations.routesLink.becomePartner,
      path: ROUTES.BECOMEPARTNER(lng),
    },
  ];
};
