import type {
  Category as ScoresCategory, 
  ScoreCriterion as ScoresScoreCriterion,
  CriterionOption as ScoresCriterionOption,
  ScoreInterpretation as ScoresScoreInterpretation,
  CalculationFunction as ScoresCalculationFunction,
  InterpretationFunction as ScoresInterpretationFunction,
  Score as ScoresScore
} from '../data/scores';

// Re-export the types for external use
export {
  ScoresCategory as Category,
  ScoresScoreCriterion as Criterion,
  ScoresCriterionOption as CriterionOption,
  ScoresScoreInterpretation as ScoreInterpretation,
  ScoresCalculationFunction as CalculationFunction,
  ScoresInterpretationFunction as InterpretationFunction,
  ScoresScore as Score
};

export interface ScoreResult {
  scoreId: string;
  value: number;
  interpretation: ScoresScoreInterpretation; 
  criteriaValues: Record<string, number | string | boolean | undefined>;
}