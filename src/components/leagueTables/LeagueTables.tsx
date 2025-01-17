import styles from './leagueTables.module.css';
import TableContent from './TableContent';
import dynamic from 'next/dynamic';
import { client } from '@/sanity/lib/client';
import { getLeagueTablesQuery } from '@/sanity/lib/queries';
import { Locale } from '@/i18n/i18n';
import { getLocale } from 'next-intl/server';

const LeagueTablesModal = dynamic(() => import('./LeagueTablesModal'), {
  ssr: false,
});

export const revalidate = 300;

type LeagueTablesProps = {
  isModal?: boolean;
};

export default async function LeagueTables({
  isModal = false,
}: LeagueTablesProps) {
  const data = await client.fetch(getLeagueTablesQuery);
  const lng = (await getLocale()) as Locale;

  if (isModal) {
    return <LeagueTablesModal data={data} lng={lng} />;
  }

  return (
    <div className={styles.leagueTables}>
      <TableContent data={data} lng={lng} />
    </div>
  );
}
