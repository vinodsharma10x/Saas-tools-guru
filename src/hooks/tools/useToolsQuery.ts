import { useQuery } from '@tanstack/react-query';
import { getAllTools } from '../../lib/api/tools';

export function useToolsQuery() {
  return useQuery({
    queryKey: ['tools'],
    queryFn: getAllTools,
  });
}