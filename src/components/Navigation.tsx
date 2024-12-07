import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export function Navigation() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Sparkles className="h-6 w-6 text-blue-600" />
            <span className="font-bold text-xl">SaaS Tools</span>
          </Link>
          <div className="flex items-center space-x-6">
            <Link 
              to="/" 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/categories" 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Categories
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}