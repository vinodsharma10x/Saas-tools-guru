import { Hero } from './components/Hero';
import { SearchBar } from './components/ui/SearchBar';
import { ToolCard } from './components/ToolCard';
import { useState } from 'react';

// Mock data - In a real app, this would come from an API
const CATEGORIES = ['Marketing', 'Development', 'Design', 'Analytics', 'Productivity'];

const FEATURED_TOOLS = [
  {
    id: '1',
    name: 'ToolFinder',
    logo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=128&h=128&fit=crop',
    description: 'All-in-one tool management platform for modern SaaS businesses',
    founder: 'John Doe',
    features: ['Feature 1', 'Feature 2', 'Feature 3'],
    pricing: {
      startingPrice: '$29',
      hasFreeplan: true,
      pricingModel: 'subscription',
    },
    website: 'https://example.com',
    screenshots: [],
    howToUse: '',
    pros: [],
    cons: [],
    bestFor: [],
    category: 'Productivity',
  },
  // Add more mock tools here
];

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />
      
      <main className="container mx-auto px-4 py-12">
        <div className="flex justify-center mb-12">
          <SearchBar
            onSearch={setSearchQuery}
            categories={CATEGORIES}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Featured Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURED_TOOLS.map((tool) => (
              <ToolCard key={tool.id} tool={tool} featured />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-8">All Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURED_TOOLS.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;