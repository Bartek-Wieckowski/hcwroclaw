import styles from './leagueTables.module.css';
import TableContent from './TableContent';
import dynamic from 'next/dynamic';
import { client } from '@/sanity/lib/client';
import {
  getLeagueTablesQuery,
  getLeagueTablesOrderQuery,
} from '@/sanity/lib/queries';
import { Locale } from '@/i18n/i18n';
import { getLocale } from 'next-intl/server';

const LeagueTablesModal = dynamic(() => import('./LeagueTablesModal'), {
  ssr: false,
});

export const revalidate = 30;

type LeagueTablesProps = {
  isModal?: boolean;
};

export default async function LeagueTables({
  isModal = false,
}: LeagueTablesProps) {
  const lng = (await getLocale()) as Locale;

  const data = await client.fetch(getLeagueTablesOrderQuery);
  const tables = data?.tables || (await client.fetch(getLeagueTablesQuery));

  if (isModal) {
    return <LeagueTablesModal data={tables} lng={lng} />;
  }

  return (
    <div className={styles.leagueTables}>
      <TableContent data={tables} lng={lng} />
    </div>
  );
}
