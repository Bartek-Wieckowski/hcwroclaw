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
      title: t('calendar'),
      path: ROUTES.CALENDARALL(locale),
    },
    {
      title: t('club'),
      path: ROUTES.CLUB(locale),
    },
    {
      title: t('trainings'),
      path: ROUTES.TRAININGS(locale),
    },
    {
      title: t('gallery'),
      path: ROUTES.GALLERY(locale),
    },

    {
      title: t('contact'),
      path: ROUTES.CONTACT(locale),
    },
    {
      title: t('info'),
      path: ROUTES.INFO(locale),
    },
    {
      title: t('support'),
      path: ROUTES.SUPPORT(locale),
    },
  ];
}
