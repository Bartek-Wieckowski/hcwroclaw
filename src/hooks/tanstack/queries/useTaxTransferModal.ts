import { useQuery } from '@tanstack/react-query';
import { client } from '@/sanity/lib/client';
import { getTaxTransferModalImgQuery } from '@/sanity/lib/queries';
import { QUERY_KEYS } from '@/lib/queryKeys';

export const useTaxTransferModal = (isModalOpen: boolean) => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.taxTransferModalImg],
    queryFn: () => client.fetch(getTaxTransferModalImgQuery),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
    enabled: isModalOpen, // Pobierz dane tylko gdy modal jest otwarty
  });

  return {
    ...query,
    isLoading: query.isLoading || query.isFetching,
  };
};
