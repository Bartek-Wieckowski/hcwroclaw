'use client';

import { LeagueTablesProvider } from '@/contexts/LeagueTablesContext';

type LeagueTablesWrapperProps = {
  children: React.ReactNode;
};

export default function LeagueTablesWrapper({
  children,
}: LeagueTablesWrapperProps) {
  return <LeagueTablesProvider>{children}</LeagueTablesProvider>;
}
