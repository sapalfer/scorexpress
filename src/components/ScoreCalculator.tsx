import React, { useState, useEffect } from 'react';
import { Criterion, Score, ScoreResult } from '../types';

interface ScoreCalculatorProps {
  score: Score;
  setScoreResult: (result: ScoreResult) => void;
}

const ScoreCalculator: React.FC<ScoreCalculatorProps> = ({ score, setScoreResult }) => {
  const [criteriaValues, setCriteriaValues] = useState<Record<string, number | string | boolean | undefined>>({});

  // Initialize default values
  useEffect(() => {
    const initialValues: Record<string, number | string | boolean | undefined> = {};
    score.criteria.forEach(criterion => {
      initialValues[criterion.id] = criterion.defaultValue;
    });
    setCriteriaValues(initialValues);
  }, [score]);

  // Calculate score whenever criteria values change
  useEffect(() => {
    if (Object.keys(criteriaValues).length === 0) return;

    const valuesForCalculation = score.criteria.map(criterion => {
      const rawValue = criteriaValues[criterion.id];
      if (criterion.type === 'boolean') {
        return rawValue ? (criterion.points || 0) : 0;
      }
      if (criterion.type === 'number' || criterion.type === 'select') {
        const numValue = Number(rawValue);
        return isNaN(numValue) ? 0 : numValue;
      }
      return 0; // Fallback for unknown types, though should not be reached
    });

    const calculatedValue = score.calculation(valuesForCalculation);
    const interpretation = score.interpretation(calculatedValue);

    setScoreResult({
      scoreId: score.id,
      value: calculatedValue,
      interpretation,
      criteriaValues
    });
  }, [criteriaValues, score, setScoreResult]);

  const handleCriterionChange = (criterionId: string, value: number | string | boolean | undefined) => {
    setCriteriaValues(prev => ({
      ...prev,
      [criterionId]: value
    }));
  };

  const renderCriterion = (criterion: Criterion) => {
    switch (criterion.type) {
      case 'select':
        return (
          <div key={criterion.id} className="mb-4">
            <label htmlFor={criterion.id} className="block text-sm font-medium text-gray-700">{criterion.name}</label>
            <select
              id={criterion.id}
              name={criterion.id}
              value={typeof criteriaValues[criterion.id] === 'string' || typeof criteriaValues[criterion.id] === 'number' ? String(criteriaValues[criterion.id]) : ''}
              onChange={(e) => handleCriterionChange(criterion.id, parseInt(e.target.value, 10))}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              {criterion.options?.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label} ({option.value})
                </option>
              ))}
            </select>
          </div>
        );
      
      case 'boolean':
        return (
          <div key={criterion.id} className="mb-4 flex items-center">
            <input
              type="checkbox"
              id={criterion.id}
              name={criterion.id}
              checked={!!criteriaValues[criterion.id]} // Double negation to ensure boolean
              onChange={(e) => handleCriterionChange(criterion.id, e.target.checked)}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <div className="ml-3 text-sm">
              <label htmlFor={criterion.id} className="font-medium text-gray-700">{criterion.name}</label>
              {criterion.points && (
                <span className="ml-2 text-xs text-gray-500">
                  ({criterion.points > 0 ? '+' : ''}{criterion.points} points)
                </span>
              )}
            </div>
          </div>
        );
      
      case 'number':
        return (
          <div key={criterion.id} className="mb-4">
            <label htmlFor={criterion.id} className="block text-sm font-medium text-gray-700">{criterion.name}</label>
            <input
              type="number"
              id={criterion.id}
              name={criterion.id}
              value={(() => {
                const val = criteriaValues[criterion.id];
                if (typeof val === 'number') return val;
                if (typeof val === 'string') {
                  return !isNaN(parseFloat(val)) ? val : '';
                }
                return ''; // Handles boolean, undefined, and other non-numeric/non-string types
              })()}
              onChange={(e) => handleCriterionChange(criterion.id, e.target.value === '' ? undefined : parseFloat(e.target.value))}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      {score.criteria.map(criterion => renderCriterion(criterion))}
    </div>
  );
};

export default ScoreCalculator;