import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ExternalLink } from 'lucide-react';
import { Score, ScoreResult } from '../types';
import ScoreCalculator from './ScoreCalculator';
import ScoreRecap from './ScoreRecap';

interface ScoreDetailProps {
  score: Score;
}

const ScoreDetail: React.FC<ScoreDetailProps> = ({ score }) => {
  const navigate = useNavigate();
  const [scoreResult, setScoreResult] = useState<ScoreResult | null>(null);

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-5 md:p-8">
      <div className="flex items-center mb-6">
        <button 
          className="mr-3 text-gray-600 hover:text-blue-500 transition-colors"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-2xl font-bold text-gray-800">{score.name}</h2>
      </div>
      
      <div className="mb-6">
        <p className="text-gray-700 mb-4">{score.description}</p>
        <div className="flex items-center text-sm">
          <a 
            href={score.source} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700 flex items-center"
          >
            Source <ExternalLink size={14} className="ml-1" />
          </a>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Calculateur</h3>
        <ScoreCalculator score={score} setScoreResult={setScoreResult} />
      </div>
      
      {scoreResult && (
        <ScoreRecap scoreResult={scoreResult} />
      )}
    </div>
  );
};

export default ScoreDetail;