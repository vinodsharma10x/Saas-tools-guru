import { Hero } from '../components/Hero';
import { SearchBar } from '../components/ui/SearchBar';
import { ToolCard } from '../components/ToolCard';
import { useState, useEffect } from 'react';
import { CATEGORIES } from '../data/tools';
import { useToolsQuery, useToolSearchQuery, useToolsByCategoryQuery } from '../hooks/tools';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ErrorMessage } from '../components/ui/ErrorMessage';
import { useSearchParams } from 'react-router-dom';

const ITEMS_PER_PAGE = 9;

export function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);

  const { data: allTools, isLoading: isLoadingAll, error: allError } = useToolsQuery();
  const { data: searchResults, isLoading: isSearching } = useToolSearchQuery(searchQuery);
  const { data: categoryTools, isLoading: isLoadingCategory } = useToolsByCategoryQuery(selectedCategory);

  // Update URL when category changes
  useEffect(() => {
    if (selectedCategory === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', selectedCategory);
    }
    setSearchParams(searchParams);
  }, [selectedCategory, searchParams, setSearchParams]);

  // Set initial category from URL
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  const isLoading = isLoadingAll || isSearching || isLoadingCategory;
  const error = allError;

  const displayedTools = searchQuery 
    ? searchResults 
    : selectedCategory !== 'all'
    ? categoryTools
    : allTools;

  const featuredTools = allTools?.slice(0, 3) || [];
  const hasMore = displayedTools ? visibleItems < displayedTools.length : false;

  const loadMore = () => {
    setVisibleItems((prev) => Math.min(prev + ITEMS_PER_PAGE, displayedTools?.length || 0));
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setVisibleItems(ITEMS_PER_PAGE);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setVisibleItems(ITEMS_PER_PAGE);
  };

  if (error) {
    return <ErrorMessage message="Failed to load tools. Please try again later." />;
  }

  return (
    <>
      <Hero />
      <main className="container mx-auto px-4 py-12">
        <div className="flex justify-center mb-12">
          <SearchBar
            onSearch={handleSearch}
            categories={CATEGORIES}
            onCategoryChange={handleCategoryChange}
            initialCategory={selectedCategory}
          />
        </div>

        {!searchQuery && selectedCategory === 'all' && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Featured Tools</h2>
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredTools.map((tool) => (
                  <ToolCard 
                    key={tool.id} 
                    tool={tool} 
                    featured 
                    searchQuery={searchQuery}
                  />
                ))}
              </div>
            )}
          </section>
        )}

        <section>
          <h2 className="text-3xl font-bold mb-8">
            {searchQuery 
              ? 'Search Results' 
              : selectedCategory !== 'all'
              ? `${selectedCategory} Tools`
              : 'All Tools'}
          </h2>
          {isLoading ? (
            <LoadingSpinner />
          ) : displayedTools?.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No tools found matching your criteria.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedTools?.slice(0, visibleItems).map((tool) => (
                  <ToolCard 
                    key={tool.id} 
                    tool={tool} 
                    searchQuery={searchQuery}
                  />
                ))}
              </div>
              {hasMore && (
                <div className="flex justify-center mt-12">
                  <button
                    onClick={loadMore}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Load More Tools
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </main>
    </>
  );
}