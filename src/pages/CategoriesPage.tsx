import { useNavigate } from 'react-router-dom';
import { useToolsQuery } from '../hooks/tools';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ErrorMessage } from '../components/ui/ErrorMessage';
import { ToolCard } from '../components/ToolCard';
import { CATEGORIES } from '../data/tools';
import { Tool } from '../types/tool';

function getTopToolsByCategory(tools: Tool[], category: string, limit: number = 6) {
  return tools
    .filter(tool => tool.category === category)
    .slice(0, limit);
}

export function CategoriesPage() {
  const navigate = useNavigate();
  const { data: tools, isLoading, error } = useToolsQuery();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message="Failed to load tools" />;
  if (!tools) return null;

  const handleViewAllClick = (category: string) => {
    // Navigate to home page with category filter
    navigate('/?category=' + encodeURIComponent(category));
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-12 text-center">Browse Tools by Category</h1>
      
      <div className="space-y-16">
        {CATEGORIES.map(category => {
          const categoryTools = getTopToolsByCategory(tools, category);
          if (categoryTools.length === 0) return null;

          return (
            <section key={category} className="scroll-mt-16" id={category.toLowerCase()}>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold">{category}</h2>
                {categoryTools.length >= 6 && (
                  <button 
                    onClick={() => handleViewAllClick(category)}
                    className="text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-2"
                  >
                    View all {category} tools 
                    <span aria-hidden="true">→</span>
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryTools.map(tool => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}