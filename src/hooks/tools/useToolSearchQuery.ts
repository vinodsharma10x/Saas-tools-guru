import { useQuery } from '@tanstack/react-query';
import { searchTools } from '../../lib/api/tools';

export function useToolSearchQuery(query: string) {
  return useQuery({
    queryKey: ['tools', 'search', query],
    queryFn: () => searchTools(query),
    enabled: !!query,
  });
}