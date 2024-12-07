import { Search } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Tool } from '../../types/tool';
import { SearchResults } from './SearchResults';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../../hooks/useSearch';
import { TOOLS } from '../../data/tools';

interface SearchBarProps {
  onSearch: (query: string) => void;
  categories: string[];
  onCategoryChange: (category: string) => void;
  initialCategory?: string;
}

export function SearchBar({ onSearch, categories, onCategoryChange, initialCategory = 'all' }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const results = useSearch(TOOLS, query, selectedCategory);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (value: string) => {
    setQuery(value);
    onSearch(value);
    setIsOpen(true);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    onCategoryChange(category);
  };

  const handleToolSelect = (tool: Tool) => {
    setIsOpen(false);
    navigate(`/tools/${tool.id}`);
  };

  return (
    <div id="search-section" className="flex gap-2 w-full max-w-4xl" ref={searchRef}>
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          id="search-input"
          ref={searchInputRef}
          type="text"
          placeholder="Search for tools..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setIsOpen(true)}
        />
        {isOpen && (
          <SearchResults
            results={results}
            query={query}
            onSelect={handleToolSelect}
          />
        )}
      </div>
      <select
        className="px-4 py-2 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={selectedCategory}
        onChange={(e) => handleCategoryChange(e.target.value)}
      >
        <option value="all">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}