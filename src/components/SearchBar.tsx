import React from 'react';
import { Search } from 'lucide-react';
import { Score } from '../data/scores_by_category'; // Import Score type

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  suggestions: Score[];
  onSuggestionClick: (scoreId: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm, suggestions, onSuggestionClick }) => {
  return (
    // The parent component will now need a ref to this container to handle clicks outside
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white placeholder-gray-400 
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        placeholder="Rechercher un score médical..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        autoComplete="off" // Disable browser's default autocomplete
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map(score => (
            <li
              key={score.id}
              className="px-4 py-2 cursor-pointer hover:bg-blue-100"
              onClick={() => onSuggestionClick(score.id)}
            >
              <p className="font-semibold text-gray-800">{score.name}</p>
              <p className="text-sm text-gray-500">{score.category}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;