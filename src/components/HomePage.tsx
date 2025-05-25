import React, { useState, useMemo, useEffect } from 'react';
import { scores } from '../data/scores';
import { Category } from '../types';
import SearchBar from './SearchBar';
import CategoryFilter from './CategoryFilter';
import ScoreCard from './ScoreCard';

const SCORES_PER_PAGE = 9;

const HomePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredScores = useMemo(() => {
    return scores.filter(score => {
      const matchesSearch = score.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           score.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === null || score.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  const paginatedScores = useMemo(() => {
    const startIndex = (currentPage - 1) * SCORES_PER_PAGE;
    return filteredScores.slice(startIndex, startIndex + SCORES_PER_PAGE);
  }, [filteredScores, currentPage]);

  const totalPages = Math.ceil(filteredScores.length / SCORES_PER_PAGE);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Scores Médicaux</h1>
        <p className="text-gray-600">
          Calculez rapidement des scores médicaux validés pour votre pratique clinique.
        </p>
      </div>
      
      <div className="mb-6">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      
      <CategoryFilter 
        selectedCategory={selectedCategory} 
        setSelectedCategory={setSelectedCategory} 
      />
      
      {paginatedScores.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          Aucun score ne correspond à votre recherche.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedScores.map(score => (
            <ScoreCard key={score.id} score={score} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-8 flex justify-center items-center space-x-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 hover:bg-blue-600 transition-colors"
          >
            Précédent
          </button>
          <span className="text-gray-700">
            Page {currentPage} sur {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 hover:bg-blue-600 transition-colors"
          >
            Suivant
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;