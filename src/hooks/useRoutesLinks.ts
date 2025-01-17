import { ROUTES } from '@/lib/routes';
import { useLocale, useTranslations } from 'next-intl';

export function useRoutesLinks() {
  const t = useTranslations('routesLink');
  const locale = useLocale();

  return [
    {
      title: t('news'),
      path: ROUTES.NEWS(locale),
    },
    {
      title: t('team'),
      path: ROUTES.TEAM(locale),
    },
    {
      title: t('club'),
      path: ROUTES.CLUB(locale),
    },
    {
      title: t('contact'),
      path: ROUTES.CONTACT(locale),
    },
    {
      title: t('becomePartner'),
      path: ROUTES.BECOMEPARTNER(locale),
    },
  ];
}
