// src/data/scores_by_category/neuro.ts
import { Score, Category, ScoreInterpretation } from '../score_types';
import { createCalculationFunction } from '../score_helpers';

export const neuroScores: Score[] = [
  {
    id: 'glasgow',
    name: 'Score de Glasgow (GCS)',
    shortName: 'GCS',
    category: Category.NEURO,
    description: "Évalue le niveau de conscience d'un patient après un traumatisme crânien.",
    referenceValues: {
      severe: 'Score ≤ 8 (Traumatisme crânien sévère)',
      moderate: 'Score 9-12 (Traumatisme crânien modéré)',
      mild: 'Score 13-15 (Traumatisme crânien léger)',
    },
    criteria: [
      {
        id: 'eye_opening',
        name: 'Ouverture des yeux (Y)',
        type: 'select',
        options: [
          { value: 4, label: 'Spontanée' },
          { value: 3, label: 'À la demande (stimulus verbal)' },
          { value: 2, label: 'À la douleur (stimulus nociceptif)' },
          { value: 1, label: 'Aucune' },
        ],
        defaultValue: 4,
      },
      {
        id: 'verbal_response',
        name: 'Réponse verbale (V)',
        type: 'select',
        options: [
          { value: 5, label: 'Orientée, cohérente' },
          { value: 4, label: 'Confuse' },
          { value: 3, label: 'Mots inappropriés' },
          { value: 2, label: 'Sons incompréhensibles' },
          { value: 1, label: 'Aucune' },
        ],
        defaultValue: 5,
      },
      {
        id: 'motor_response',
        name: 'Réponse motrice (M)',
        type: 'select',
        options: [
          { value: 6, label: 'Obéit aux ordres' },
          { value: 5, label: 'Localise la douleur (orientée)' },
          { value: 4, label: 'Retrait à la douleur (non orientée)' },
          { value: 3, label: 'Flexion anormale (décortication)' },
          { value: 2, label: 'Extension anormale (décérébration)' },
          { value: 1, label: 'Aucune' },
        ],
        defaultValue: 6,
      },
    ],
    calculation: createCalculationFunction,
    interpretation: (score: number): ScoreInterpretation => {
      if (score >= 13) return { level: 'low', text: 'Traumatisme crânien léger (GCS 13-15)' };
      if (score >= 9) return { level: 'moderate', text: 'Traumatisme crânien modéré (GCS 9-12)' };
      return { level: 'severe', text: 'Traumatisme crânien sévère (GCS ≤ 8)' };
    },
    source: 'Teasdale G, Jennett B. Assessment of coma and impaired consciousness. A practical scale. Lancet. 1974 Jul 13;2(7872):81-4.',
    moreInfoLink: 'https://www.mdcalc.com/calc/119/glasgow-coma-scale-score-gcs',
    notes: 'Le score GCS varie de 3 (coma profond) à 15 (personne parfaitement consciente). Additionner Y + V + M.',
  }
];
