import { useQuery } from '@tanstack/react-query';
import { client } from '@/sanity/lib/client';
import { getPlayersNextToTheFormQuery } from '@/sanity/lib/queries';
import { QUERY_KEYS } from '@/lib/queryKeys';

export const usePlayersNextToTheForm = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.playersNextToTheForm],
    queryFn: () => client.fetch(getPlayersNextToTheFormQuery),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });
};
