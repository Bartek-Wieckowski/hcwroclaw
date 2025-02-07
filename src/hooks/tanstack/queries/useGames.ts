import { useQuery } from '@tanstack/react-query';
import { client } from '@/sanity/lib/client';
import { getAllGamesByYearQuery } from '@/sanity/lib/queries';
import { QUERY_KEYS } from '@/lib/queryKeys';
import { GetAllGamesByYearQueryResult } from '../../../../sanity.types';

type UseGamesProps = {
  selectedYear: number;
  currentYear: number;
  initialGames: GetAllGamesByYearQueryResult;
};

export const useGames = ({
  selectedYear,
  currentYear,
  initialGames,
}: UseGamesProps) => {
  return useQuery({
    queryKey: [QUERY_KEYS.gamesYears, selectedYear],
    queryFn: () =>
      client.fetch(getAllGamesByYearQuery, {
        startDate: `${selectedYear}-01-01T00:00:00Z`,
        endDate: `${selectedYear + 1}-01-01T00:00:00Z`,
      }),
    initialData: selectedYear === currentYear ? initialGames : undefined,
  });
};
