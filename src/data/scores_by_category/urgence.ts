// src/data/scores_by_category/urgence.ts
import { Score, Category, ScoreInterpretation } from '../score_types.ts';
import { createCalculationFunction } from '../score_helpers.ts';

export const urgenceScores: Score[] = [
  {
    id: 'qsofa',
    name: 'Score qSOFA (Quick SOFA)',
    shortName: 'qSOFA',
    category: Category.URGENCE, // Or Sepsis, Infecto
    description: "Identification rapide des patients adultes avec suspicion d'infection hors USI à risque de décompensation (critères Sepsis-3).",
    referenceValues: {
      positive_qsofa: 'Score ≥2: Risque accru de mortalité ou de séjour prolongé en USI. Envisager une évaluation plus approfondie pour une éventuelle dysfonction d\'organe (score SOFA complet).',
      negative_qsofa: 'Score <2: Risque plus faible, mais ne permet pas d\'exclure un sepsis. Continuer la surveillance clinique.',
    },
    criteria: [
      { id: 'respiratory_rate_ge_22_qsofa', name: 'Fréquence respiratoire ≥ 22/min', type: 'boolean', points: 1, defaultValue: false }, // Appended _qsofa for uniqueness
      { id: 'altered_mental_status_gcs_lt_15_qsofa', name: 'Altération de la conscience (Score de Glasgow < 15)', type: 'boolean', points: 1, defaultValue: false }, // Appended _qsofa
      { id: 'systolic_bp_le_100_qsofa', name: 'Pression artérielle systolique ≤ 100 mmHg', type: 'boolean', points: 1, defaultValue: false }, // Appended _qsofa
    ],
    calculation: createCalculationFunction,
    interpretation: (score: number): ScoreInterpretation => {
      if (score >= 2) return { level: 'high', text: `Score ${score} (≥2): Risque élevé. Envisager sepsis et évaluer dysfonction d\'organe.` };
      if (score < 2) return { level: 'low', text: `Score ${score} (<2): Risque plus faible. Poursuivre surveillance.` };
      return { level: 'severe', text: 'Score inattendu. Vérifier les données.' };
    },
    source: 'Singer M, Deutschman CS, Seymour CW, et al. The Third International Consensus Definitions for Sepsis and Septic Shock (Sepsis-3). JAMA. 2016 Feb 23;315(8):801-10.',
    moreInfoLink: 'https://www.mdcalc.com/calc/389/qsofa-score-sepsis',
    notes: 'Score de 0 à 3. Un score qSOFA ≥ 2 suggère un mauvais pronostic. Ce score ne diagnostique pas le sepsis mais identifie les patients à risque.',
  }
,
  {
    id: 'spesi',
    name: 'Score SPESI (Simplified Pulmonary Embolism Severity Index)',
    shortName: 'sPESI',
    category: Category.URGENCE,
    description: "Évalue le risque de mortalité à 30 jours chez les patients atteints d'une embolie pulmonaire aiguë symptomatique.",
    referenceValues: {
      low_risk: 'Score 0: Risque faible de mortalité à 30 jours (1.0%).',
      high_risk: 'Score ≥1: Risque élevé de mortalité à 30 jours (10.9%).'
    },
    criteria: [
      { id: 'age_gt_80_spesi', name: 'Âge > 80 ans', type: 'boolean', points: 1, defaultValue: false },
      { id: 'history_cancer_spesi', name: 'Antécédent de cancer', type: 'boolean', points: 1, defaultValue: false },
      { id: 'history_chronic_cardiopulmonary_spesi', name: 'Antécédent de maladie cardiopulmonaire chronique (insuffisance cardiaque ou maladie pulmonaire chronique)', type: 'boolean', points: 1, defaultValue: false },
      { id: 'hr_ge_110_spesi', name: 'Fréquence cardiaque ≥ 110/min', type: 'boolean', points: 1, defaultValue: false },
      { id: 'sbp_lt_100_spesi', name: 'Pression artérielle systolique < 100 mmHg', type: 'boolean', points: 1, defaultValue: false },
      { id: 'sao2_lt_90_spesi', name: 'Saturation en oxygène < 90%', type: 'boolean', points: 1, defaultValue: false },
    ],
    calculation: createCalculationFunction, // Each true criterion adds 1 point
    interpretation: (score: number): ScoreInterpretation => {
      if (score === 0) return { level: 'low', text: `Score ${score}: Risque faible de mortalité à 30 jours (1.0%). Envisager un traitement ambulatoire pour les patients sélectionnés.` };
      return { level: 'high', text: `Score ${score} (≥1): Risque élevé de mortalité à 30 jours (10.9%). Hospitalisation recommandée.` };
    },
    source: 'Jiménez D, Aujesky D, Moores L, et al. Simplification of the Pulmonary Embolism Severity Index for prognostication in patients with acute symptomatic pulmonary embolism. Arch Intern Med. 2010 Aug 9;170(15):1383-9.',
    moreInfoLink: 'https://www.mdcalc.com/calc/1938/spesi-simplified-pulmonary-embolism-severity-index',
    notes: 'Score de 0 à 6. Un score de 0 identifie les patients à faible risque. sPESI est une version simplifiée du score PESI original.',
  }
];
