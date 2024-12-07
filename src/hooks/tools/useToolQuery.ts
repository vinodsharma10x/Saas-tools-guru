import { useQuery } from '@tanstack/react-query';
import { getToolById } from '../../lib/api/tools';

export function useToolQuery(id: string) {
  return useQuery({
    queryKey: ['tool', id],
    queryFn: () => getToolById(id),
  });
}