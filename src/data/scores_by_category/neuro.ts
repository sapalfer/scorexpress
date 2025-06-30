// src/data/scores_by_category/neuro.ts
import { Score, Category, ScoreInterpretation } from '../score_types.ts';
import { createCalculationFunction } from '../score_helpers.ts';

export const neuroScores: Score[] = [
  {
    id: 'asia',
    name: 'American Spinal Injury Association (ASIA) Impairment Scale',
    shortName: 'ASIA',
    category: Category.NEURO,
    description: "Échelle de classification de la sévérité des lésions médullaires, basée sur l’évaluation de la fonction motrice et sensitive.",
    criteria: [
      { 
        id: 'asia_grade', 
        name: 'Grade ASIA', 
        type: 'select', 
        options: [
          { value: 1, label: 'A - Lésion complète: Aucune fonction motrice ou sensitive préservée dans les segments sacrés S4-S5' },
          { value: 2, label: 'B - Lésion incomplète: Fonction sensitive préservée mais pas de fonction motrice au-dessous du niveau neurologique, y compris dans les segments sacrés S4-S5' },
          { value: 3, label: 'C - Lésion incomplète: Fonction motrice préservée sous le niveau neurologique et plus de la moitié des muscles clés sous ce niveau ont un score < 3/5' },
          { value: 4, label: 'D - Lésion incomplète: Fonction motrice préservée sous le niveau neurologique et au moins la moitié des muscles clés sous ce niveau ont un score ≥ 3/5' },
          { value: 5, label: 'E - Normal: Fonctions motrices et sensitives normales' }
        ],
        defaultValue: 5,
        description: 'Classification de la lésion médullaire selon l\'examen neurologique complet'
      }
    ],
    calculation: createCalculationFunction,
    interpretation: (score: number): ScoreInterpretation => {
      if (score === 1) return { level: 'severe', text: 'Grade A: Lésion complète. Aucune fonction motrice ou sensitive dans les segments sacrés S4-S5.' };
      if (score === 2) return { level: 'high', text: 'Grade B: Lésion incomplète. Fonction sensitive préservée, mais pas de fonction motrice au-dessous du niveau neurologique.' };
      if (score === 3) return { level: 'moderate', text: 'Grade C: Lésion incomplète. Fonction motrice préservée sous le niveau neurologique, mais la plupart des muscles ont un score < 3/5.' };
      if (score === 4) return { level: 'low', text: 'Grade D: Lésion incomplète. Fonction motrice préservée sous le niveau neurologique avec la majorité des muscles à un score ≥ 3/5.' };
      if (score === 5) return { level: 'normal', text: 'Grade E: Normal. Fonctions motrices et sensitives normales.' };
      return { level: 'abnormal', text: 'Score invalide.' };
    },
    source: 'American Spinal Injury Association. International Standards for Neurological Classification of Spinal Cord Injury, revised 2019.',
    moreInfoLink: 'https://asia-spinalinjury.org/international-standards-neurological-classification-sci-isncsci-worksheet/',
    notes: "L'échelle ASIA est utilisée pour évaluer et classifier les lésions médullaires. Un examen neurologique complet doit être réalisé pour déterminer le niveau précis de la lésion et son caractère complet ou incomplet. L'évaluation complète inclut l'examen des dermatomes et myotomes."
  },
  {
    id: 'ashworth',
    name: 'Échelle d\'Ashworth Modifiée',
    shortName: 'Ashworth',
    category: Category.NEURO,
    description: "Évalue le degré de spasticité musculaire chez les patients atteints de lésions du système nerveux central.",
    criteria: [
      { 
        id: 'muscle_tone', 
        name: 'Tonus musculaire', 
        type: 'select', 
        options: [
          { value: 0, label: '0 - Pas d\'augmentation du tonus musculaire' },
          { value: 1, label: '1 - Légère augmentation du tonus musculaire se manifestant par une tension suivie d\'un relâchement ou par une résistance minime en fin d\'amplitude' },
          { value: 1.5, label: '1+ - Légère augmentation du tonus musculaire se manifestant par une tension suivie d\'un relâchement ou par une résistance minime sur moins de la moitié de l\'amplitude' },
          { value: 2, label: '2 - Augmentation plus marquée du tonus musculaire sur presque toute l\'amplitude, mais le membre reste facilement mobilisable' },
          { value: 3, label: '3 - Augmentation considérable du tonus musculaire rendant la mobilisation passive difficile' },
          { value: 4, label: '4 - Hypertonie majeure, membre rigide en flexion ou en extension' }
        ],
        defaultValue: 0,
        description: 'Évaluer le degré de résistance lors du mouvement passif d\'un membre'
      }
    ],
    calculation: createCalculationFunction,
    interpretation: (score: number): ScoreInterpretation => {
      if (score === 0) return { level: 'normal', text: 'Score 0: Pas de spasticité.' };
      if (score === 1) return { level: 'low', text: 'Score 1: Spasticité légère.' };
      if (score === 1.5) return { level: 'low', text: 'Score 1+: Spasticité légère à modérée.' };
      if (score === 2) return { level: 'moderate', text: 'Score 2: Spasticité modérée.' };
      if (score === 3) return { level: 'high', text: 'Score 3: Spasticité sévère.' };
      if (score === 4) return { level: 'severe', text: 'Score 4: Spasticité très sévère, rigidité complète.' };
      return { level: 'abnormal', text: 'Score invalide.' };
    },
    source: 'Bohannon RW, Smith MB. Interrater reliability of a modified Ashworth scale of muscle spasticity. Phys Ther. 1987;67(2):206-207.',
    moreInfoLink: 'https://www.sralab.org/rehabilitation-measures/modified-ashworth-scale',
    notes: "Cette échelle est largement utilisée pour évaluer la spasticité dans diverses conditions comme l'AVC, la sclérose en plaques, les lésions médullaires et les traumatismes crâniens."
  },
  {
    id: 'mrc_muscle',
    name: 'Échelle MRC de Force Musculaire',
    shortName: 'MRC',
    category: Category.NEURO,
    description: "Évalue la force musculaire sur une échelle de 0 à 5, permettant d'objectiver les déficits moteurs.",
    criteria: [
      { 
        id: 'muscle_strength', 
        name: 'Force musculaire', 
        type: 'select',
        options: [
          { value: 0, label: '0 - Absence totale de contraction musculaire' },
          { value: 1, label: '1 - Contraction musculaire visible ou palpable sans mouvement du membre' },
          { value: 2, label: '2 - Mouvement actif possible mais ne pouvant lutter contre la pesanteur' },
          { value: 3, label: '3 - Mouvement actif possible contre la pesanteur mais non contre résistance' },
          { value: 4, label: '4 - Mouvement actif contre résistance modérée' },
          { value: 5, label: '5 - Force musculaire normale' }
        ],
        defaultValue: 5,
        description: 'Évaluer la force du groupe musculaire examiné'
      }
    ],
    calculation: createCalculationFunction,
    interpretation: (score: number): ScoreInterpretation => {
      if (score === 5) return { level: 'normal', text: 'Score 5: Force musculaire normale.' };
      if (score === 4) return { level: 'low', text: 'Score 4: Mouvement contre résistance modérée.' };
      if (score === 3) return { level: 'moderate', text: 'Score 3: Mouvement contre pesanteur uniquement.' };
      if (score === 2) return { level: 'moderate', text: 'Score 2: Mouvement possible sans pesanteur.' };
      if (score === 1) return { level: 'high', text: 'Score 1: Contraction visible sans mouvement.' };
      if (score === 0) return { level: 'severe', text: 'Score 0: Aucune contraction musculaire.' };
      return { level: 'abnormal', text: 'Score invalide.' };
    },
    source: 'Medical Research Council. Aids to the examination of the peripheral nervous system, Memorandum no. 45. London: Her Majesty\'s Stationery Office, 1981.',
    moreInfoLink: 'https://www.mdcalc.com/calc/580/mrc-sum-score-muscle-strength',
    notes: "Cette échelle est fréquemment utilisée en neurologie et en rééducation pour évaluer la force musculaire. Elle peut être appliquée à chaque groupe musculaire individuellement."
  },
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
