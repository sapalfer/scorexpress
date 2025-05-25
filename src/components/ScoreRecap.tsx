import React, { useState } from 'react';
import { ScoreResult } from '../types';
import { Share2 } from 'lucide-react';

interface ScoreRecapProps {
  scoreResult: ScoreResult;
}

const ScoreRecap: React.FC<ScoreRecapProps> = ({ scoreResult }) => {
  const [shareMessage, setShareMessage] = useState<string>('');

  const getInterpretationColor = (): string => {
    const level = scoreResult.interpretation.level.toLowerCase();
    if (level.includes('low') || level.includes('normal') || level.includes('class_a')) return 'bg-green-100 text-green-800';
    if (level.includes('moderate') || level.includes('intermediate') || level.includes('class_b')) return 'bg-yellow-100 text-yellow-800';
    if (level.includes('high') || level.includes('class_c')) return 'bg-orange-100 text-orange-800';
    if (level.includes('severe') || level.includes('very_high') || level.includes('critique')) return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800'; 
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Résultat de Score Médical',
      text: `Mon score est de ${scoreResult.value}. Interprétation: ${scoreResult.interpretation.text}`,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setShareMessage('Résultat partagé avec succès!');
      } else {
        navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}`);
        setShareMessage('Résultat copié dans le presse-papiers!');
      }
      setTimeout(() => setShareMessage(''), 3000); 
    } catch (err) {
      console.error('Error sharing:', err);
      setShareMessage('Erreur lors du partage.');
      setTimeout(() => setShareMessage(''), 3000);
    }
  };

  return (
    <div className="mt-8 p-6 rounded-lg border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Résultat</h3>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <div className="mb-4 md:mb-0">
          <div className="text-4xl font-bold text-blue-600 mb-1">{scoreResult.value}</div>
          <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getInterpretationColor()}`}>
            {scoreResult.interpretation.text}
          </div>
        </div>
        <button
          onClick={handleShare}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Share2 size={16} className="mr-2" />
          Partager
        </button>
      </div>
      {shareMessage && (
        <div className="text-green-600 text-sm animation-fade-in">
          {shareMessage}
        </div>
      )}
    </div>
  );
};

export default ScoreRecap;
