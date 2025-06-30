import React from 'react';
import { Score, ScoreResult } from '../types';
import { Printer } from 'lucide-react';
import PdfTools from './PdfTools';

interface ScoreRecapProps {
  score: Score;
  scoreResult: ScoreResult;
}

const ScoreRecap: React.FC<ScoreRecapProps> = ({ score, scoreResult }) => {

  const getInterpretationColor = (): string => {
    const level = scoreResult.interpretation.level.toLowerCase();
    if (level.includes('low') || level.includes('normal') || level.includes('class_a')) return 'bg-green-100 text-green-800';
    if (level.includes('moderate') || level.includes('intermediate') || level.includes('class_b')) return 'bg-yellow-100 text-yellow-800';
    if (level.includes('high') || level.includes('class_c')) return 'bg-orange-100 text-orange-800';
    if (level.includes('severe') || level.includes('very_high') || level.includes('critique')) return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800'; 
  };

  const handlePrint = () => {
    window.print();
  };

  // If interpretation text starts with "Grade X", display the letter instead of numeric score
  const displayValue = React.useMemo(() => {
    const m = /^Grade\s+([A-E])/i.exec(scoreResult.interpretation.text);
    if (m) return m[1];
    return scoreResult.value;
  }, [scoreResult]);

  return (
    <div className="mt-8 p-6 rounded-xl bg-white shadow-md ring-1 ring-gray-100">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Résultat</h3>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <div className="mb-4 md:mb-0">
          <div className="text-4xl font-bold text-blue-600 mb-1 md:text-5xl">{displayValue}</div>
          <div className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium shadow-sm ${getInterpretationColor()}`}>
            {scoreResult.interpretation.text}
          </div>
        </div>
        <div className="flex flex-row items-center gap-3 ml-auto mt-2 md:mt-6 no-print">
          <button
            onClick={handlePrint}
            className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            aria-label="Imprimer"
          >
            <Printer size={18} />
          </button>
          <PdfTools score={score} scoreResult={scoreResult} />
        </div>
      </div>
    </div>
  );
};

export default ScoreRecap;
