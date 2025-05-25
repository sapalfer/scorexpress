import React, { useState, useRef, useEffect } from 'react';
import { Heart, Brain, ShieldAlert, FlaskConical, Activity, Baby, Bone, Ear, Eye, MoreHorizontal, ChevronDown, AirVent, Droplets, Filter as NephroFilter, PersonStanding, BrainCog, Zap, Ribbon, Sparkles, Droplet as UroDroplet, Scissors, CakeSlice, Bug } from 'lucide-react';
import { Category } from '../data/scores';

interface CategoryFilterProps {
  selectedCategory: Category | null;
  setSelectedCategory: (category: Category | null) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  selectedCategory, 
  setSelectedCategory 
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // For detecting outside clicks

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const internalCategories = [
    { value: Category.URGENCE, label: 'Urgence', icon: ShieldAlert },
    { value: Category.CARDIO, label: 'Cardio', icon: Heart },
    { value: Category.REA, label: 'Réa', icon: Activity },
    { value: Category.CHIRURGIE, label: 'Chirurgie', icon: Scissors }, 
    { value: Category.PNEUMO, label: 'Pneumo', icon: AirVent }, 
    { value: Category.NEURO, label: 'Neuro', icon: Brain },
    { value: Category.GASTRO, label: 'Gastro', icon: FlaskConical },
    { value: Category.INFECTO, label: 'Infectio', icon: Bug }, 
    { value: Category.HEMA, label: 'Héma', icon: Droplets }, 
    { value: Category.NEPHRO, label: 'Néphro', icon: NephroFilter }, 
    { value: Category.GERIA, label: 'Géria', icon: PersonStanding }, 
    { value: Category.GYNECO, label: 'Gynéco', icon: Baby }, 
    { value: Category.PED, label: 'Pédia', icon: CakeSlice }, 
    { value: Category.PSY, label: 'Psy', icon: BrainCog }, 
    { value: Category.ENDO, label: 'Endoc', icon: Zap }, 
    { value: Category.ONCO, label: 'Onco', icon: Ribbon }, 
    { value: Category.DERMA, label: 'Derma', icon: Sparkles }, 
    { value: Category.RHUMA, label: 'Rhuma', icon: Bone }, 
    { value: Category.URO, label: 'Uro', icon: UroDroplet }, 
    { value: Category.ORL, label: 'ORL', icon: Ear }, 
    { value: Category.OPHTA, label: 'Ophta', icon: Eye }, 
    { value: Category.AUTRES, label: 'Autres', icon: MoreHorizontal }, 
  ];

  const currentSelection = selectedCategory 
    ? internalCategories.find(c => c.value === selectedCategory)?.label 
    : 'Toutes les catégories';

  const handleSelectCategory = (category: Category | null) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative w-full md:w-72 my-4" ref={dropdownRef}> 
      <button 
        type="button"
        className="w-full bg-white border border-gray-300 rounded-lg shadow-sm px-4 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 flex items-center justify-between transition-colors hover:bg-gray-50"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <span className="block truncate text-gray-700">{currentSelection}</span>
        <ChevronDown className={`w-5 h-5 text-gray-400 transform transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isDropdownOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg border border-gray-300 rounded-md max-h-60 overflow-auto py-1">
          <button
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white flex items-center space-x-2"
            onClick={() => handleSelectCategory(null)}
          >
            <span>Toutes les catégories</span>
          </button>
          {internalCategories.map((categoryItem) => {
            const Icon = categoryItem.icon;
            return (
              <button 
                key={categoryItem.value}
                className={`w-full text-left px-4 py-2 text-sm flex items-center space-x-2 transition-colors
                          ${selectedCategory === categoryItem.value 
                            ? 'bg-blue-500 text-white' 
                            : 'text-gray-700 hover:bg-blue-100 hover:text-blue-600'}`}
                onClick={() => handleSelectCategory(categoryItem.value)}
              >
                <Icon size={16} className={`${selectedCategory === categoryItem.value ? 'text-white' : 'text-gray-500'}`} />
                <span>{categoryItem.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CategoryFilter;