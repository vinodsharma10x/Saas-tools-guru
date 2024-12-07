import { ExternalLink, Pencil } from 'lucide-react';
import { Tool } from '../types/tool';
import { cn } from '../lib/utils';
import { HighlightedText } from './ui/HighlightedText';
import { Link } from 'react-router-dom';

interface ToolCardProps {
  tool: Tool;
  featured?: boolean;
  searchQuery?: string;
}

export function ToolCard({ tool, featured, searchQuery }: ToolCardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]',
        featured && 'border-2 border-blue-500'
      )}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <img src={tool.logo} alt={tool.name} className="h-12 w-12 object-contain" />
          <div className="flex items-center space-x-2">
            {featured && (
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                Featured
              </span>
            )}
            <Link
              to={`/admin/tools/${tool.id}`}
              className="p-1 text-gray-500 hover:text-blue-600"
              title="Edit tool"
            >
              <Pencil className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-2">
          <HighlightedText text={tool.name} query={searchQuery || ''} />
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          <HighlightedText text={tool.description} query={searchQuery || ''} />
        </p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            Starting from {tool.pricing.startingPrice}
          </span>
          <Link
            to={`/tools/${tool.id}`}
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            Learn more
            <ExternalLink className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}