import { useQuery } from '@tanstack/react-query';
import { getAllTools, getToolById, getToolsByCategory, searchTools } from '../lib/api/tools';

export function useTools() {
  return useQuery({
    queryKey: ['tools'],
    queryFn: getAllTools,
  });
}

export function useTool(id: string) {
  return useQuery({
    queryKey: ['tool', id],
    queryFn: () => getToolById(id),
  });
}

export function useToolsByCategory(category: string) {
  return useQuery({
    queryKey: ['tools', 'category', category],
    queryFn: () => getToolsByCategory(category),
    enabled: !!category && category !== 'all',
  });
}

export function useToolSearch(query: string) {
  return useQuery({
    queryKey: ['tools', 'search', query],
    queryFn: () => searchTools(query),
    enabled: !!query,
  });
}