import { Search, Sparkles } from 'lucide-react';

export function Hero() {
  const handleExploreClick = () => {
    const searchInput = document.querySelector<HTMLInputElement>('#search-input');
    const searchSection = document.querySelector('#search-section');
    
    if (searchSection) {
      searchSection.scrollIntoView({ behavior: 'smooth' });
      // Focus the search input after scrolling
      setTimeout(() => {
        searchInput?.focus();
      }, 800); // Wait for scroll animation to complete
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <div className="flex items-center justify-center mb-6">
          <Sparkles className="h-12 w-12" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Find the Perfect Tools for Your SaaS
        </h1>
        <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Discover and compare the best tools to build, grow, and scale your SaaS business
        </p>
        <div className="flex justify-center">
          <button
            onClick={handleExploreClick}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-flex items-center"
          >
            <Search className="mr-2 h-5 w-5" />
            Explore Tools
          </button>
        </div>
      </div>
    </div>
  );
}