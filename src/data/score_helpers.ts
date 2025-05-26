// src/data/score_helpers.ts
import { CalculationFunction } from './score_types';

// Helper Functions
export const createCalculationFunction: CalculationFunction = (values: number[]): number => {
  return values.reduce((acc: number, val: number) => acc + (val || 0), 0); // Ensure val is a number, default to 0 if undefined/null
};

// Add any other general helper functions related to scores here in the future
