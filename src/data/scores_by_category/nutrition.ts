import { Score, Category, ScoreInterpretation } from '../score_types.ts';

export const nutritionScores: Score[] = [
  {
    id: 'has-malnutrition',
    name: 'Critères de dénutrition de la HAS',
    shortName: 'Dénutrition HAS',
    category: Category.NUTRITION,
    description: "Diagnostiquer la dénutrition chez l'adulte selon les critères de la Haute Autorité de Santé (HAS) de 2019. Le diagnostic est posé par l'association d'au moins un critère phénotypique et un critère étiologique.",
    criteria: [
      // Phénotypiques
      { id: 'phenotypic_weight_loss', name: 'Perte de poids ≥ 5% en 1 mois, ou ≥ 10% en 6 mois', type: 'boolean', points: 1, defaultValue: false },
      { id: 'phenotypic_bmi', name: 'IMC < 18,5 kg/m² (ou < 21 kg/m² si âge ≥ 70 ans)', type: 'boolean', points: 1, defaultValue: false },
      { id: 'phenotypic_muscle_reduction', name: 'Réduction de la masse et/ou de la fonction musculaire', type: 'boolean', points: 1, defaultValue: false },
      // Étiologiques
      { id: 'etiologic_food_reduction', name: 'Réduction de la prise alimentaire ≥ 50% pendant > 1 sem', type: 'boolean', points: 10, defaultValue: false },
      { id: 'etiologic_absorption_reduction', name: 'Absorption réduite (maldigestion/malabsorption)', type: 'boolean', points: 10, defaultValue: false },
      { id: 'etiologic_aggression', name: 'Situation d\'agression (pathologie inflammatoire)', type: 'boolean', points: 10, defaultValue: false },
    ],
    calculation: (values: number[]): number => {
        const phenotypicScore = values.slice(0, 3).reduce((acc, val) => acc + val, 0);
        const etiologicScore = values.slice(3, 6).reduce((acc, val) => acc + val, 0);
        // Return 1 if at least one of each type is selected, otherwise 0.
        return (phenotypicScore > 0 && etiologicScore > 0) ? 1 : 0;
    },
    interpretation: (score: number): ScoreInterpretation => {
      if (score === 1) {
        return { level: 'high', text: 'Dénutrition confirmée. La sévérité (modérée ou sévère) est définie par les valeurs seuils des critères phénotypiques.' };
      }
      return { level: 'normal', text: 'Critères de dénutrition non remplis.' };
    },
    source: 'Haute Autorité de Santé (HAS) - Diagnostic de la dénutrition de l’enfant et de l’adulte - Novembre 2019',
    moreInfoLink: 'https://www.has-sante.fr/jcms/p_3152897/fr/diagnostic-de-la-denutrition-de-l-enfant-et-de-l-adulte',
    notes: 'La sévérité est ensuite déterminée par des seuils spécifiques pour les critères phénotypiques : par exemple IMC < 17 (ou < 20 si ≥ 70 ans) pour dénutrition sévère. Cette calculatrice confirme le diagnostic mais ne précise pas la sévérité. Mise à jour HAS 2021 : IMC < 18,5 (< 70 ans) ou < 21 (≥ 70 ans).'
  }
];
