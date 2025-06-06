import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getAllScores, getScoresForCategory, Score, Category } from '../data/scores_by_category';
import SearchBar from './SearchBar';
import CategoryFilter from './CategoryFilter';
import ScoreCard from './ScoreCard';

const SCORES_PER_PAGE = 9;

const HomePage: React.FC = () => {
  const location = useLocation();
  const [scoresToDisplay, setScoresToDisplay] = useState<Score[]>([]);
  const [isLoadingScores, setIsLoadingScores] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  // On mount and when location changes, set category from query string
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get('category');
    if (cat && Object.values(Category).includes(cat as Category)) {
      setSelectedCategory(cat as Category);
    }
  }, [location.search]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchScores = async () => {
      setIsLoadingScores(true);
      try {
        let fetchedScores: Score[];
        if (selectedCategory) {
          fetchedScores = await getScoresForCategory(selectedCategory);
        } else {
          fetchedScores = await getAllScores();
        }
        setScoresToDisplay(fetchedScores);
        setCurrentPage(1); // Reset to first page when category or scores change
      } catch (error) {
        console.error("Failed to load scores:", error);
        setScoresToDisplay([]); // Set to empty on error
      } finally {
        setIsLoadingScores(false);
      }
    };

    fetchScores();
  }, [selectedCategory]);

  const filteredScores = useMemo(() => {
    return scoresToDisplay.filter(score => {
      const matchesSearch = score.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           score.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesSearch;
    });
  }, [scoresToDisplay, searchTerm]);

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

  let content;
  if (isLoadingScores) {
    content = <div className="py-6 text-center"><p className="text-xl text-gray-700">Chargement des scores...</p></div>;
  } else if (scoresToDisplay.length === 0 && !selectedCategory) {
    // This case means getAllScores returned empty, or an error occurred
    content = <p className="text-center text-gray-500">Aucun score disponible pour le moment.</p>;
  } else if (scoresToDisplay.length > 0 && filteredScores.length === 0 && searchTerm !== '') {
    // Scores for category are loaded, but search term yields no results
    content = <p className="text-center text-gray-500">Aucun score trouvé pour "{searchTerm}"{selectedCategory ? ` dans la catégorie ${selectedCategory}` : ''}.</p>;
  } else if (scoresToDisplay.length === 0 && selectedCategory) {
    // No scores found for the specific selected category
    content = <p className="text-center text-gray-500">Aucun score disponible pour la catégorie {selectedCategory}.</p>;
  } else if (filteredScores.length === 0 && searchTerm === '') {
    // This case implies scoresToDisplay might have items, but after default filtering (which is now minimal as category is handled by fetch)
    // it results in zero. This might happen if a category was selected, scores were fetched, then category deselected and searchTerm is empty.
    // Or if scoresToDisplay was empty from the start for 'All Categories'.
    content = <p className="text-center text-gray-500">Aucun score à afficher.</p>;
  } else {
    content = (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedScores.map(score => (
          <ScoreCard key={score.id} score={score} />
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Helmet>
        <title>Accueil - ScoreXpress | Calculateur de Scores Médicaux</title>
        <meta name="description" content="Trouvez et utilisez une vaste gamme de calculateurs de scores médicaux sur ScoreXpress. Simplifiez votre pratique clinique avec des outils précis et faciles à utiliser." />
        {/* Open Graph for homepage */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Accueil - ScoreXpress | Calculateur de Scores Médicaux" />
        <meta property="og:description" content="Trouvez et utilisez une vaste gamme de calculateurs de scores médicaux sur ScoreXpress. Simplifiez votre pratique clinique avec des outils précis et faciles à utiliser." />
        <meta property="og:url" content="https://scorexp.netlify.app/" />
        <meta property="og:image" content="https://scorexp.netlify.app/apple-touch-icon.png" />
        {/* Twitter Card for homepage */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Accueil - ScoreXpress | Calculateur de Scores Médicaux" />
        <meta name="twitter:description" content="Trouvez et utilisez une vaste gamme de calculateurs de scores médicaux sur ScoreXpress. Simplifiez votre pratique clinique avec des outils précis et faciles à utiliser." />
        <meta name="twitter:image" content="https://scorexp.netlify.app/apple-touch-icon.png" />
        <link rel="canonical" href="https://scorexp.netlify.app/" />
        <script type="application/ld+json">
          {JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://scorexp.netlify.app/#website",
              "name": "ScoreXpress",
              "url": "https://scorexp.netlify.app/",
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://scorexp.netlify.app/?search={search_term_string}"
                },
                "query-input": "required name=search_term_string"
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Accueil - ScoreXpress | Calculateur de Scores Médicaux",
              "description": "Trouvez et utilisez une vaste gamme de calculateurs de scores médicaux sur ScoreXpress. Simplifiez votre pratique clinique avec des outils précis et faciles à utiliser.",
              "url": "https://scorexp.netlify.app/",
              "isPartOf": {
                "@id": "https://scorexp.netlify.app/#website"
              }
            }
          ])}
        </script>
      </Helmet>
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
      
      {content}

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