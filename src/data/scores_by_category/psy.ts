// src/data/scores_by_category/psy.ts
import { Score, Category, ScoreInterpretation } from '../score_types';
import { createCalculationFunction } from '../score_helpers';

export const psyScores: Score[] = [
  {
    id: 'cage',
    name: 'Questionnaire CAGE',
    shortName: 'CAGE',
    category: Category.PSY,
    description: "Outil de dépistage rapide de la dépendance à l'alcool.",
    criteria: [
      {
        id: 'cut_down_cage',
        name: 'Cut down (Diminuer): Avez-vous déjà ressenti le besoin de diminuer votre consommation d\'alcool?',
        type: 'boolean',
        points: 1,
        defaultValue: false,
      },
      {
        id: 'annoyed_cage',
        name: 'Annoyed (Agacé): Votre entourage vous a-t-il déjà fait des remarques au sujet de votre consommation d\'alcool?',
        type: 'boolean',
        points: 1,
        defaultValue: false,
      },
      {
        id: 'guilty_cage',
        name: 'Guilty (Coupable): Vous êtes-vous déjà senti coupable à cause de votre consommation d\'alcool?',
        type: 'boolean',
        points: 1,
        defaultValue: false,
      },
      {
        id: 'eye_opener_cage',
        name: 'Eye-opener (Premier verre): Avez-vous déjà eu besoin d\'un premier verre d\'alcool le matin pour vous sentir en forme?',
        type: 'boolean',
        points: 1,
        defaultValue: false,
      },
    ],
    calculation: createCalculationFunction, // Each 'yes' (true) is 1 point
    interpretation: (score: number): ScoreInterpretation => {
      if (score === 0) return { level: 'low', text: `Score ${score}: Peu probable d'être un problème d'alcool.` };
      if (score === 1) return { level: 'low', text: `Score ${score}: Problème d'alcool possible.` }; // MDCalc suggests 'low suspicion' for 0-1
      if (score >= 2 && score <=3) return { level: 'moderate', text: `Score ${score}: Forte suspicion de problème d'alcool.` }; // MDCalc suggests 'high suspicion' for 2-3
      if (score === 4) return { level: 'high', text: `Score ${score}: Problème d'alcool très probable.` };
      return { level: 'severe', text: 'Score inattendu. Vérifier les données.' };
    },
    source: 'Ewing JA. Detecting alcoholism: The CAGE questionnaire. JAMA. 1984 Oct 12;252(14):1905-7.',
    moreInfoLink: 'https://www.mdcalc.com/calc/37/cage-questionnaire-alcohol-use',
    notes: 'Un score de 2 ou plus est considéré comme cliniquement significatif pour un dépistage positif. Chaque réponse affirmative vaut 1 point.',
  }
];
