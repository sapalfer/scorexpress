import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getAllScores, getScoresForCategory, Score, Category } from '../data/scores_by_category';
import SearchBar from './SearchBar';
import CategoryFilter from './CategoryFilter';
import { useFavorites } from '../context/FavoritesContext';
import ScoreCard from './ScoreCard';

const SCORES_PER_PAGE = 9;

const HomePage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const [allScoresForSearch, setAllScoresForSearch] = useState<Score[]>([]);
  const [scoresToDisplay, setScoresToDisplay] = useState<Score[]>([]);
  const [isLoadingScores, setIsLoadingScores] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<Score[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const { favorites } = useFavorites();

  // On mount, fetch ALL scores for the search functionality
  useEffect(() => {
    const fetchAllScoresForSearch = async () => {
      try {
        const allScores = await getAllScores();
        setAllScoresForSearch(allScores);
      } catch (error) {
        console.error("Failed to load all scores for search:", error);
      }
    };
    fetchAllScoresForSearch();
  }, []);

  // On mount and when location changes, set category from query string
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get('category');
    if (cat && Object.values(Category).includes(cat as Category)) {
      setSelectedCategory(cat as Category);
    } else {
      setSelectedCategory(null);
    }
  }, [location.search]);

  const [currentPage, setCurrentPage] = useState(1);

  // Fetch scores for display based on selected category
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
        setCurrentPage(1);
      } catch (error) {
        console.error("Failed to load scores:", error);
        setScoresToDisplay([]);
      } finally {
        setIsLoadingScores(false);
      }
    };

    fetchScores();
  }, [selectedCategory]);

  // Generate autocomplete suggestions
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSuggestions([]);
      return;
    }
    const filtered = allScoresForSearch.filter(score =>
      score.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (score.shortName && score.shortName.toLowerCase().includes(searchTerm.toLowerCase()))
    ).slice(0, 5);
    setSuggestions(filtered);
  }, [searchTerm, allScoresForSearch]);

  // Handle clicking outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setSuggestions([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const filteredScores = useMemo(() => {
    return scoresToDisplay.filter(score => {
      const matchesSearch = score.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           score.description.toLowerCase().includes(searchTerm.toLowerCase());
      const passesFav = showFavoritesOnly ? favorites.includes(score.id) : true;
      return matchesSearch && passesFav;
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

  const handleSuggestionClick = (scoreId: string) => {
    navigate(`/score/${scoreId}`);
    setSearchTerm('');
    setSuggestions([]);
  };

  let content;
  if (isLoadingScores) {
    content = <div className="py-6 text-center"><p className="text-xl text-gray-700">Chargement des scores...</p></div>;
  } else if (scoresToDisplay.length === 0 && !selectedCategory) {
    content = <p className="text-center text-gray-500">Aucun score disponible pour le moment.</p>;
  } else if (filteredScores.length === 0 && searchTerm !== '' && suggestions.length === 0) {
    content = <p className="text-center text-gray-500">Aucun score trouvé pour "{searchTerm}"{selectedCategory ? ` dans la catégorie ${selectedCategory}` : ''}.</p>;
  } else if (scoresToDisplay.length === 0 && selectedCategory) {
    content = <p className="text-center text-gray-500">Aucun score disponible pour la catégorie {selectedCategory}.</p>;
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
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Accueil - ScoreXpress | Calculateur de Scores Médicaux" />
        <meta property="og:description" content="Trouvez et utilisez une vaste gamme de calculateurs de scores médicaux sur ScoreXpress. Simplifiez votre pratique clinique avec des outils précis et faciles à utiliser." />
        <meta property="og:url" content="https://scorexp.netlify.app/" />
        <meta property="og:image" content="https://scorexp.netlify.app/apple-touch-icon.png" />
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
      
      <div className="mb-6" ref={searchContainerRef}>
        <SearchBar 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          suggestions={suggestions}
          onSuggestionClick={handleSuggestionClick}
        />
      </div>
      
      <div className="flex flex-wrap gap-2 items-center mb-4">
        <CategoryFilter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        <button
          onClick={()=>setShowFavoritesOnly(prev=>!prev)}
          className={`px-3 py-1 rounded-full text-sm border ${showFavoritesOnly?'bg-yellow-400 text-white':'bg-white text-gray-700'} hover:bg-yellow-300 transition-colors`}
        >{showFavoritesOnly ? 'Tous les scores' : 'Favoris ⭐'}</button>
      </div>
      
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