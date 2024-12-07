import { useQuery } from '@tanstack/react-query';
import { getToolsByCategory } from '../../lib/api/tools';

export function useToolsByCategoryQuery(category: string) {
  return useQuery({
    queryKey: ['tools', 'category', category],
    queryFn: () => getToolsByCategory(category),
    enabled: !!category && category !== 'all',
  });
}