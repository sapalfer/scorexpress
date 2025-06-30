import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ExternalLink } from 'lucide-react';
import { Score, ScoreResult } from '../types';
import ScoreCalculator from './ScoreCalculator';
import ScoreRecap from './ScoreRecap';

interface ScoreDetailProps {
  score: Score;
  allScores: Score[];
}

const ScoreDetail: React.FC<ScoreDetailProps> = ({ score, allScores }) => {
  const navigate = useNavigate();
  const [scoreResult, setScoreResult] = useState<ScoreResult | null>(null);

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-5 md:p-8 printable-content-area">
      <div className="flex items-center mb-6">
        <button 
          className="mr-3 text-gray-600 hover:text-blue-500 transition-colors no-print"
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
        <ScoreRecap 
          score={score}
          scoreResult={scoreResult} 
        />
      )}

      {/* Related Scores Section */}
      <div className="mt-10 no-print">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Autres scores dans la catégorie {score.category.charAt(0).toUpperCase() + score.category.slice(1)}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {allScores.filter(s => s.category === score.category && s.id !== score.id).slice(0, 4).map(rel => (
            <a key={rel.id} href={`/score/${rel.id}`} className="block p-4 bg-gray-50 rounded shadow hover:bg-blue-50 transition-colors">
              <div className="font-bold text-blue-700">{rel.name}</div>
              <div className="text-gray-600 text-sm mt-1 line-clamp-2">{rel.description}</div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScoreDetail;