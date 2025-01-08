import { QUERY_KEYS } from '@/api/constants';
import { getCalendarGames } from '@/api/gameCalendarApi';
import { useQuery } from '@tanstack/react-query';

export function useGameCalendar() {
  const {
    isLoading,
    data: gamesCalendar,
    isError,
  } = useQuery({
    queryKey: [QUERY_KEYS.gamesCalendar],
    queryFn: getCalendarGames,
    initialData: [],
  });

  return { isLoading, gamesCalendar, isError };
}
