import { useState, useEffect, useMemo } from 'react';
import { Tool } from '../types/tool';

export function useSearch(tools: Tool[], query: string, category: string = 'all') {
  const [results, setResults] = useState<Tool[]>([]);

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesCategory = category === 'all' || tool.category === category;
      const matchesQuery =
        !query ||
        tool.name.toLowerCase().includes(query.toLowerCase()) ||
        tool.description.toLowerCase().includes(query.toLowerCase());

      return matchesCategory && matchesQuery;
    });
  }, [tools, query, category]);

  useEffect(() => {
    setResults(filteredTools);
  }, [filteredTools]);

  return results;
}