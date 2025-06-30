import React from 'react';
import { Star, StarOff, ArrowRight } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { Link, useNavigate } from 'react-router-dom';
import { Score, Category } from '../data/scores_by_category';

interface ScoreCardProps {
  score: Score;
}

const ScoreCard: React.FC<ScoreCardProps> = ({ score }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const navigate = useNavigate();

  const handleCategoryClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    navigate(`/?category=${score.category}`);
  };


  const getCategoryColor = () => {
    switch (score.category) {
      case Category.URGENCE:
        return 'bg-blue-100 text-blue-800';
      case Category.CARDIO:
        return 'bg-red-100 text-red-800';
      case Category.REA:
        return 'bg-pink-100 text-pink-800';
      case Category.CHIRURGIE:
        return 'bg-slate-100 text-slate-800';
      case Category.PNEUMO:
        return 'bg-cyan-100 text-cyan-800';
      case Category.NEURO:
        return 'bg-purple-100 text-purple-800';
      case Category.GASTRO:
        return 'bg-orange-100 text-orange-800';
      case Category.INFECTO:
        return 'bg-green-100 text-green-800';
      case Category.HEMA:
        return 'bg-rose-100 text-rose-800';
      case Category.NEPHRO:
        return 'bg-indigo-100 text-indigo-800';
      case Category.GERIA:
        return 'bg-lime-100 text-lime-800';
      case Category.GYNECO:
        return 'bg-fuchsia-100 text-fuchsia-800';
      case Category.PED:
        return 'bg-teal-100 text-teal-800';
      case Category.PSY:
        return 'bg-amber-100 text-amber-800';
      case Category.ENDO:
        return 'bg-yellow-100 text-yellow-800';
      case Category.ONCO:
        return 'bg-violet-100 text-violet-800';
      case Category.DERMA:
        return 'bg-sky-100 text-sky-800';
      case Category.RHUMA:
        return 'bg-stone-100 text-stone-800';
      case Category.URO:
        return 'bg-sky-200 text-sky-900';
      case Category.ORL:
        return 'bg-emerald-100 text-emerald-800';
      case Category.OPHTA:
        return 'bg-indigo-200 text-indigo-900';
      case Category.NUTRITION:
        return 'bg-green-200 text-green-900';
      case Category.AUTRES:
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Link to={`/score/${score.id}`} className="block group">
      <div className="relative bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full flex flex-col justify-between">
        <div className="p-5">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1 pr-8">
              <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">{score.name}</h3>
              {score.shortName && <p className="text-sm text-gray-500">{score.shortName}</p>}
            </div>
            <button
               onClick={(e)=>{e.preventDefault(); e.stopPropagation(); toggleFavorite(score.id);}}
               className="absolute top-3 right-3 text-gray-400 hover:text-yellow-400 transition transform hover:scale-110 z-10"
               aria-label="Basculer favori"
             >
               {isFavorite(score.id) ? <Star className="w-6 h-6 fill-current text-yellow-400" /> : <StarOff className="w-6 h-6" />}
             </button>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
            {score.description}
          </p>
        </div>
        <div className="p-4 bg-gray-50 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <button 
              onClick={handleCategoryClick} 
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor()} hover:opacity-80 transition-opacity`}>
              {score.category}
            </button>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ScoreCard;