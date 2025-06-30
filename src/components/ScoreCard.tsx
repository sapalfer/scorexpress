import React from 'react';
import { Star, StarOff } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Heart, Brain, Activity, MoreHorizontal, AirVent, Droplets, Filter as NephroFilter, PersonStanding, BrainCog, Zap, Ribbon, Sparkles, Droplet as UroDroplet, Scissors, CakeSlice, Bug, FlaskConical, Baby, Bone, Ear, Eye, ShieldAlert, Leaf } from 'lucide-react';
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

  const getCategoryIcon = () => {
    switch (score.category) {
      case Category.URGENCE:
        return <ShieldAlert className="w-5 h-5 text-blue-500" />;
      case Category.CARDIO:
        return <Heart className="w-5 h-5 text-red-500" />;
      case Category.REA:
        return <Activity className="w-5 h-5 text-pink-500" />;
      case Category.CHIRURGIE:
        return <Scissors className="w-5 h-5 text-slate-500" />;
      case Category.PNEUMO:
        return <AirVent className="w-5 h-5 text-cyan-500" />;
      case Category.NEURO:
        return <Brain className="w-5 h-5 text-purple-500" />;
      case Category.GASTRO:
        return <FlaskConical className="w-5 h-5 text-orange-500" />;
      case Category.INFECTO:
        return <Bug className="w-5 h-5 text-green-500" />;
      case Category.HEMA:
        return <Droplets className="w-5 h-5 text-rose-500" />;
      case Category.NEPHRO:
        return <NephroFilter className="w-5 h-5 text-indigo-500" />;
      case Category.GERIA:
        return <PersonStanding className="w-5 h-5 text-lime-500" />;
      case Category.GYNECO:
        return <Baby className="w-5 h-5 text-fuchsia-500" />;
      case Category.PED:
        return <CakeSlice className="w-5 h-5 text-teal-500" />;
      case Category.PSY:
        return <BrainCog className="w-5 h-5 text-amber-500" />;
      case Category.ENDO:
        return <Zap className="w-5 h-5 text-yellow-500" />;
      case Category.ONCO:
        return <Ribbon className="w-5 h-5 text-violet-500" />;
      case Category.DERMA:
        return <Sparkles className="w-5 h-5 text-sky-500" />;
      case Category.RHUMA:
        return <Bone className="w-5 h-5 text-stone-500" />;
      case Category.URO:
        return <UroDroplet className="w-5 h-5 text-sky-600" />;
      case Category.ORL:
        return <Ear className="w-5 h-5 text-emerald-500" />;
      case Category.OPHTA:
        return <Eye className="w-5 h-5 text-indigo-600" />;
      case Category.NUTRITION:
        return <Leaf className="w-5 h-5 text-green-600" />;
      case Category.AUTRES:
      default:
        return <MoreHorizontal className="w-5 h-5 text-gray-500" />;
    }
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
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full flex flex-col">
        <div className="p-5 flex-grow">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">{score.name}</h3>
              {score.shortName && <p className="text-sm text-gray-500">{score.shortName}</p>}
            </div>
            <button
                onClick={(e)=>{e.preventDefault(); e.stopPropagation(); toggleFavorite(score.id);}}
                className="mr-2 text-yellow-400 hover:scale-105 transition-transform"
                aria-label="Toggle favorite"
              >
                {isFavorite(score.id) ? <Star className="w-5 h-5 fill-yellow-400" /> : <StarOff className="w-5 h-5" />}
              </button>
            <div className="flex-shrink-0">
              {getCategoryIcon()}
            </div>
          </div>
          <p className="mt-2 text-gray-600 text-sm leading-relaxed">{score.description}</p>
        </div>
        <div className="p-5 bg-gray-50 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <button 
              onClick={handleCategoryClick} 
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor()} hover:opacity-80 transition-opacity`}>
              {score.category}
            </button>
            <div className="text-blue-500 group-hover:text-blue-700 flex items-center">
              <span className="text-sm font-semibold">Calculer</span>
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ScoreCard;