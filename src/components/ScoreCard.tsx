import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Heart, Brain, Activity, MoreHorizontal, AirVent, Droplets, Filter as NephroFilter, PersonStanding, BrainCog, Zap, Ribbon, Sparkles, Droplet as UroDroplet, Scissors, CakeSlice, Bug, FlaskConical, Baby, Bone, Ear, Eye, ShieldAlert } from 'lucide-react'; // Removed Stethoscope
import { Score, Category } from '../data/scores_by_category';

interface ScoreCardProps {
  score: Score;
}

const ScoreCard: React.FC<ScoreCardProps> = ({ score }) => {
  const navigate = useNavigate();

  const handleCategoryClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    navigate(`/?category=${score.category}`);
  };

  const getCategoryIcon = () => {
    switch (score.category) {
      case Category.URGENCE:
        return <ShieldAlert className="w-5 h-5 text-blue-500" />; // Ensured ShieldAlert is used, was Stethoscope before general update
      case Category.CARDIO:
        return <Heart className="w-5 h-5 text-red-500" />;
      case Category.REA:
        return <Activity className="w-5 h-5 text-pink-500" />;
      case Category.CHIRURGIE:
        return <Scissors className="w-5 h-5 text-slate-500" />;
      case Category.PNEUMO:
        return <AirVent className="w-5 h-5 text-cyan-500" />; // Updated icon to AirVent
      case Category.NEURO:
        return <Brain className="w-5 h-5 text-purple-500" />;
      case Category.GASTRO:
        return <FlaskConical className="w-5 h-5 text-orange-500" />;
      case Category.INFECTO:
        return <Bug className="w-5 h-5 text-green-500" />; // Updated icon to Bug
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
        return <Eye className="w-5 h-5 text-indigo-600" />; // Slightly different indigo
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
        return 'bg-sky-100 text-sky-700'; // Slightly different text for URO
      case Category.ORL:
        return 'bg-emerald-100 text-emerald-800';
      case Category.OPHTA:
        return 'bg-indigo-100 text-indigo-700'; // Slightly different text for OPHTA
      case Category.AUTRES:
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Link to={`/score/${score.id}`} className="block hover:no-underline">
      <div 
        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col justify-between"
      >
        <div className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              {getCategoryIcon()}
              <span
                className={`ml-2 text-sm font-medium px-2 py-1 rounded-full underline text-blue-700 cursor-pointer ${getCategoryColor()}`}
                onClick={handleCategoryClick}
                title={`Voir tous les scores de la catégorie ${score.category.charAt(0).toUpperCase() + score.category.slice(1)}`}
                tabIndex={0}
                role="button"
                onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && handleCategoryClick(e as any)}
              >
                {score.category.charAt(0).toUpperCase() + score.category.slice(1)}
              </span>
            </div>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{score.name}</h3>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {score.description}
          </p>
          
          <div className="flex items-center text-blue-500 group">
            <span className="text-sm font-medium">Calculer ce score</span>
            <ArrowRight 
              size={16} 
              className="ml-1 transform group-hover:translate-x-1 transition-transform" 
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ScoreCard;