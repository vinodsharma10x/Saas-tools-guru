import { Tool } from '../../types/tool';
import { HighlightedText } from './HighlightedText';

interface SearchResultsProps {
  results: Tool[];
  query: string;
  onSelect: (tool: Tool) => void;
}

export function SearchResults({ results, query, onSelect }: SearchResultsProps) {
  if (results.length === 0 || !query) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto z-50">
      {results.map((tool) => (
        <button
          key={tool.id}
          className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center space-x-3 border-b border-gray-100 last:border-0"
          onClick={() => onSelect(tool)}
        >
          <img src={tool.logo} alt={tool.name} className="w-8 h-8 object-contain" />
          <div>
            <div className="font-medium">
              <HighlightedText text={tool.name} query={query} />
            </div>
            <div className="text-sm text-gray-600 line-clamp-1">
              <HighlightedText text={tool.description} query={query} />
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}