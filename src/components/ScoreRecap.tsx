import React from 'react';
import { ScoreResult } from '../types';
import { Printer } from 'lucide-react';
import PdfTools from './PdfTools';

interface ScoreRecapProps {
  scoreResult: ScoreResult;
  scoreName: string;
}

const ScoreRecap: React.FC<ScoreRecapProps> = ({ scoreResult, scoreName }) => {

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
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 no-print">
          <button
            onClick={handlePrint}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Printer size={16} className="mr-2" />
            Imprimer
          </button>
          <PdfTools scoreName={scoreName} />
        </div>
      </div>


    </div>
  );
};

export default ScoreRecap;
