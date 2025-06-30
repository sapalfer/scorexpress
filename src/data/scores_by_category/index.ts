// src/data/scores_by_category/index.ts
import type { Score, ScoreCriterion, CriterionOption, ScoreInterpretation, CalculationFunction, InterpretationFunction } from '../score_types.ts';
import { Category } from '../score_types.ts'; // Import Category enum directly

// Re-export Category enum and other relevant types
export { Category }; // Make sure Category is exported from score_types.ts
export type { Score, ScoreCriterion, CriterionOption, ScoreInterpretation, CalculationFunction, InterpretationFunction };

export const getScoresForCategory = async (category: Category): Promise<Score[]> => {
  switch (category) {
    case Category.CARDIO:
      return (await import('./cardio.ts')).cardioScores;
    case Category.GASTRO:
      return (await import('./gastro.ts')).gastroScores;
    case Category.GERIA:
      return (await import('./geria.ts')).geriaScores;
    case Category.NEURO:
      return (await import('./neuro.ts')).neuroScores;
    case Category.PED:
      return (await import('./ped.ts')).pedScores;
    case Category.PNEUMO:
      return (await import('./pneumo.ts')).pneumoScores;
    case Category.PSY:
      return (await import('./psy.ts')).psyScores;
    case Category.REA:
      return (await import('./rea.ts')).reaScores;
    case Category.URGENCE:
      return (await import('./urgence.ts')).urgenceScores;
    case Category.NUTRITION:
      return (await import('./nutrition.ts')).nutritionScores;
    // Add cases for other categories if they have dedicated files
    // e.g., CHIRURGIE, INFECTO, HEMA, NEPHRO, GYNECO, ENDO, ONCO, DERMA, RHUMA, URO, ORL, OPHTA, AUTRES
    // For now, unhandled categories will return an empty array implicitly by falling through.
    default:
      // console.warn(`No specific score file for category: ${category}`);
      return [];
  }
};

export const getAllScores = async (): Promise<Score[]> => {
  // List all categories that have corresponding score files
  const categoriesWithFiles: Category[] = [
    Category.CARDIO,
    Category.GASTRO,
    Category.GERIA,
    Category.NEURO,
    Category.PED,
    Category.PNEUMO,
    Category.PSY,
    Category.REA,
    Category.URGENCE,
    Category.NUTRITION,
    // Add other Category enum members here if they have corresponding files
  ];

  const scoreArrays = await Promise.all(
    categoriesWithFiles.map(category => 
      getScoresForCategory(category).catch(error => {
        console.error(`Error loading scores for category ${category}:`, error instanceof Error ? error.message : String(error));
        return [] as Score[]; // Return empty array on error for a specific category
      })
    )
  );
  return scoreArrays.flat();
};

// Note: The old 'allScores' static array and 'scoresByCategory' static map are removed
// as scores will now be loaded dynamically.
