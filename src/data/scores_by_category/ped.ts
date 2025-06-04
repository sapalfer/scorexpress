// src/data/scores_by_category/ped.ts
import { Score, Category, ScoreInterpretation } from '../score_types.ts';
import { createCalculationFunction } from '../score_helpers.ts';

export const pedScores: Score[] = [
  {
    id: 'apgar',
    name: "Score d'Apgar",
    shortName: 'Apgar',
    category: Category.PED,
    description: "Évaluation rapide de l'état de santé d'un nouveau-né immédiatement après la naissance.",
    criteria: [
      {
        id: 'appearance_apgar',
        name: 'Apparence (Couleur de la peau)',
        type: 'select',
        options: [
          { value: 0, label: 'Bleue, pâle (0 pts)' },
          { value: 1, label: 'Corps rose, extrémités bleues (1 pt)' },
          { value: 2, label: 'Complètement rose (2 pts)' },
        ],
        defaultValue: 2,
      },
      {
        id: 'pulse_apgar',
        name: 'Pouls (Fréquence cardiaque)',
        type: 'select',
        options: [
          { value: 0, label: 'Absente (0 pts)' },
          { value: 1, label: '< 100 bpm (1 pt)' },
          { value: 2, label: '≥ 100 bpm (2 pts)' },
        ],
        defaultValue: 2,
      },
      {
        id: 'grimace_apgar',
        name: 'Grimace (Réactivité aux stimulations)',
        type: 'select',
        options: [
          { value: 0, label: 'Pas de réponse (0 pts)' },
          { value: 1, label: 'Grimace (1 pt)' },
          { value: 2, label: 'Toux, éternuement, pleurs (2 pts)' },
        ],
        defaultValue: 2,
      },
      {
        id: 'activity_apgar',
        name: 'Activité (Tonus musculaire)',
        type: 'select',
        options: [
          { value: 0, label: 'Flaccidité (0 pts)' },
          { value: 1, label: 'Quelque flexion (1 pt)' },
          { value: 2, label: 'Mouvements actifs (2 pts)' },
        ],
        defaultValue: 2,
      },
      {
        id: 'respiration_apgar',
        name: 'Respiration (Effort respiratoire)',
        type: 'select',
        options: [
          { value: 0, label: 'Absente (0 pts)' },
          { value: 1, label: 'Lente, irrégulière (1 pt)' },
          { value: 2, label: 'Bonne, cri vigoureux (2 pts)' },
        ],
        defaultValue: 2,
      },
    ],
    calculation: createCalculationFunction,
    interpretation: (score: number): ScoreInterpretation => {
      if (score >= 7) return { level: 'normal', text: `Score ${score}: Normal (7-10)` };
      if (score >= 4) return { level: 'moderate', text: `Score ${score}: Modérément déprimé (4-6)` };
      return { level: 'severe', text: `Score ${score}: Sévèrement déprimé (0-3)` };
    },
    source: 'Apgar V. A proposal for a new method of evaluation of the newborn infant. Curr Res Anesth Analg. 1953.',
    moreInfoLink: 'https://www.mdcalc.com/calc/203/apgar-score',
    notes: 'Évalué à 1 et 5 minutes après la naissance. Un score bas à 5 minutes peut indiquer la nécessité de mesures de réanimation continues.',
  }
,
  {
    id: 'tanner',
    name: 'Stades de Tanner',
    shortName: 'Tanner',
    category: Category.PED,
    description: "Échelle de développement pubertaire physique.",
    criteria: [
      {
        id: 'pubic_hair_tanner',
        name: 'Pilosité Pubienne (Garçons/Filles)',
        type: 'select',
        options: [
          { value: 1, label: 'Stade I: Prépubertaire (pas de poils pubiens terminaux)' },
          { value: 2, label: 'Stade II: Croissance clairsemée de poils longs, légèrement pigmentés, principalement sur les lèvres ou à la base du pénis' },
          { value: 3, label: 'Stade III: Poils plus foncés, plus rêches, plus bouclés, s\'étendant sur la symphyse pubienne' },
          { value: 4, label: 'Stade IV: Poils de type adulte, mais couvrant une zone plus petite que chez l\'adulte; pas d\'extension sur la face médiale des cuisses' },
          { value: 5, label: 'Stade V: Poils de type adulte en quantité et en qualité, s\'étendant sur la face médiale des cuisses' },
        ],
        defaultValue: 1,
      },
      {
        id: 'breast_development_female_tanner',
        name: 'Développement Mammaire (Filles)',
        type: 'select',
        options: [
          { value: 0, label: 'N/A (Garçon)'},
          { value: 1, label: 'Stade I: Prépubertaire (élévation du mamelon seulement)' },
          { value: 2, label: 'Stade II: Bourgeon mammaire (petite saillie du sein et du mamelon; élargissement de l\'aréole)' },
          { value: 3, label: 'Stade III: Élargissement et élévation supplémentaires du sein et de l\'aréole, sans séparation de leurs contours' },
          { value: 4, label: 'Stade IV: Aréole et mamelon formant une saillie secondaire au-dessus du niveau du sein' },
          { value: 5, label: 'Stade V: Stade mature; projection du mamelon seulement, l\'aréole s\'étant rétractée dans le contour général du sein' },
        ],
        defaultValue: 0,
      },
      {
        id: 'genital_development_male_tanner',
        name: 'Développement Génital (Garçons)',
        type: 'select',
        options: [
          { value: 0, label: 'N/A (Fille)'},
          { value: 1, label: 'Stade I: Prépubertaire (testicules, scrotum et pénis de même taille et proportion qu\'au début de l\'enfance)' },
          { value: 2, label: 'Stade II: Augmentation de la taille du scrotum et des testicules; peau du scrotum rougit et change de texture; peu ou pas d\'agrandissement du pénis' },
          { value: 3, label: 'Stade III: Croissance du pénis, d\'abord principalement en longueur; augmentation supplémentaire des testicules et du scrotum' },
          { value: 4, label: 'Stade IV: Augmentation de la taille du pénis en largeur et développement du gland; testicules et scrotum continuent de grossir; pigmentation foncée de la peau du scrotum' },
          { value: 5, label: 'Stade V: Génitalia de taille et de forme adultes' },
        ],
        defaultValue: 0,
      },
    ],
    calculation: () => 0, // Tanner stages are descriptive; a summary score is not standard.
    interpretation: (): ScoreInterpretation => ({ 
      level: 'normal', // Placeholder, actual interpretation depends on context and individual stages.
      text: 'Les stades de Tanner décrivent le développement pubertaire. Chaque critère est évalué séparément. Consulter les descriptions détaillées pour chaque stade.'
    }),
    source: 'Marshall WA, Tanner JM. Variations in pattern of pubertal changes in girls. Arch Dis Child. 1969 Jun;44(235):291-303. AND Marshall WA, Tanner JM. Variations in the pattern of pubertal changes in boys. Arch Dis Child. 1970 Feb;45(239):13-23.',
    moreInfoLink: 'https://en.wikipedia.org/wiki/Tanner_scale',
    notes: 'Évaluation descriptive basée sur l\'observation clinique. Les options ont été détaillées pour une meilleure compréhension.',
  }
];
