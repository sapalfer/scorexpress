// src/data/score_types.ts

// Type Definitions
export type CalculationFunction = (values: number[]) => number;
export type InterpretationFunction = (score: number) => ScoreInterpretation;

// Interface Definitions
export interface CriterionOption {
  value: number;
  label: string;
}

export interface ScoreInterpretation {
  level: 'low' | 'moderate' | 'high' | 'severe' | 'very_low' | 'very_high' | 'normal' | 'abnormal' | 'intermediate' | 'class_i' | 'class_ii' | 'class_iii' | 'class_iv' | 'stage_1' | 'stage_2' | 'stage_3' | 'stage_4' | 'stage_5' | 'class_a' | 'class_b' | 'class_c'; // Expanded for flexibility
  text: string;
}

export interface ScoreCriterion {
  id: string;
  name: string;
  type: 'number' | 'select' | 'boolean' | 'info'; // Added 'info' for non-scoring criteria
  options?: CriterionOption[];
  points?: number | ((value: number | boolean | string) => number); // value can be number, boolean, or string from select
  defaultValue?: number | boolean | string | undefined;
  unit?: string; // Optional unit for number types
  description?: string; // Optional description for the criterion
}

export interface Score {
  id: string;
  name: string;
  shortName?: string; // Optional short name for display
  category: Category;
  description: string;
  referenceValues?: Record<string, string>; // Kept as string for flexibility, can be parsed
  criteria: ScoreCriterion[];
  calculation: CalculationFunction;
  interpretation: InterpretationFunction;
  source: string;
  moreInfoLink?: string; // Optional link for more details
  notes?: string; // General notes about the score
}

// Enum Definition
export enum Category {
  URGENCE = 'Urgence',
  CARDIO = 'Cardiologie',
  REA = 'Réanimation',
  CHIRURGIE = 'Chirurgie',
  PNEUMO = 'Pneumologie',
  NEURO = 'Neurologie',
  GASTRO = 'Gastro-entérologie',
  INFECTO = 'Infectiologie',
  HEMA = 'Hématologie',
  NEPHRO = 'Néphrologie',
  GERIA = 'Gériatrie',
  GYNECO = 'Gynécologie',
  PED = 'Pédiatrie',
  PSY = 'Psychiatrie',
  ENDO = 'Endocrinologie',
  ONCO = 'Oncologie',
  DERMA = 'Dermatologie',
  RHUMA = 'Rhumatologie',
  URO = 'Urologie',
  ORL = 'ORL',
  OPHTA = 'Ophtalmologie',
  AUTRES = 'Autres',
}
