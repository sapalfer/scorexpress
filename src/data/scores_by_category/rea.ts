// src/data/scores_by_category/rea.ts
import { Score, Category, ScoreInterpretation } from '../score_types';
import { createCalculationFunction } from '../score_helpers';

export const reaScores: Score[] = [
  {
    id: 'sofa',
    name: 'Score SOFA (Sequential Organ Failure Assessment)',
    shortName: 'SOFA',
    category: Category.REA, // Réanimation / ICU
    description: "Évalue le dysfonctionnement d'organe séquentiel en USI. Un score élevé est associé à une mortalité accrue.",
    referenceValues: {
      mortality_association: 'Mortalité approximative: Score 0-6 (~0-10%), 7-9 (~15-20%), 10-12 (~40-50%), 13-14 (~50-60%), >14 (>80-95%). Les valeurs exactes varient selon les études.',
      delta_sofa: 'Un augmentation du score SOFA de ≥2 points en 24-48h est un critère de sepsis (Sepsis-3).',
    },
    criteria: [
      {
        id: 'respiration_pao2_fio2',
        name: 'Respiration: PaO2/FiO2 (mmHg) [ou SpO2/FiO2]',
        type: 'select',
        options: [
          { value: 0, label: '≥400 (ou SpO2/FiO2 >315 si PaO2 non disponible)' },
          { value: 1, label: '<400 (ou SpO2/FiO2 ≤315)' },
          { value: 2, label: '<300 (ou SpO2/FiO2 ≤235)' },
          { value: 3, label: '<200 avec support ventilatoire (ou SpO2/FiO2 ≤147)' },
          { value: 4, label: '<100 avec support ventilatoire (ou SpO2/FiO2 ≤67)' },
        ],
        defaultValue: 0,
        description: 'FiO2 en fraction (ex: 0.21 pour air ambiant, 1.0 pour 100% O2). Si SpO2/FiO2 est utilisé, la corrélation est approximative.',
      },
      {
        id: 'coagulation_platelets',
        name: 'Coagulation: Plaquettes (x10^3/µL)',
        type: 'select',
        options: [
          { value: 0, label: '≥150' },
          { value: 1, label: '<150' },
          { value: 2, label: '<100' },
          { value: 3, label: '<50' },
          { value: 4, label: '<20' },
        ],
        defaultValue: 0,
        unit: 'x10³/µL'
      },
      {
        id: 'liver_bilirubin',
        name: 'Foie: Bilirubine (mg/dL) [µmol/L]',
        type: 'select',
        options: [
          { value: 0, label: '<1.2 [<20]' },
          { value: 1, label: '1.2-1.9 [20-32]' },
          { value: 2, label: '2.0-5.9 [33-101]' },
          { value: 3, label: '6.0-11.9 [102-204]' },
          { value: 4, label: '>12.0 [>204]' },
        ],
        defaultValue: 0,
        unit: 'mg/dL [µmol/L]'
      },
      {
        id: 'cardiovascular_map_vasopressors',
        name: 'Cardiovasculaire: Pression Artérielle Moyenne (PAM) ou vasopresseurs',
        type: 'select',
        options: [
          { value: 0, label: 'PAM ≥70 mmHg' },
          { value: 1, label: 'PAM <70 mmHg' },
          { value: 2, label: 'Dopamine ≤5 µg/kg/min OU Dobutamine (toute dose)' },
          { value: 3, label: 'Dopamine >5 µg/kg/min OU Adrénaline ≤0.1 µg/kg/min OU Noradrénaline ≤0.1 µg/kg/min' },
          { value: 4, label: 'Dopamine >15 µg/kg/min OU Adrénaline >0.1 µg/kg/min OU Noradrénaline >0.1 µg/kg/min' },
        ],
        defaultValue: 0,
        description: 'Les doses de vasopresseurs sont indicatives et peuvent varier.'
      },
      {
        id: 'cns_gcs_sofa', // Appended _sofa to avoid conflict with glasgow gcs criteria id
        name: 'Système Nerveux Central: Score de Glasgow (GCS)',
        type: 'select',
        options: [
          { value: 0, label: '15' },
          { value: 1, label: '13-14' },
          { value: 2, label: '10-12' },
          { value: 3, label: '6-9' },
          { value: 4, label: '<6' },
        ],
        defaultValue: 0,
        description: 'Utiliser le score GCS total.'
      },
      {
        id: 'renal_creatinine_urine_output',
        name: 'Reins: Créatinine (mg/dL) [µmol/L] OU Diurèse (mL/jour)',
        type: 'select',
        options: [
          { value: 0, label: 'Créat <1.2 [<110]' },
          { value: 1, label: 'Créat 1.2-1.9 [110-170]' },
          { value: 2, label: 'Créat 2.0-3.4 [171-299] OU Diurèse <500 mL/j' },
          { value: 3, label: 'Créat 3.5-4.9 [300-440] OU Diurèse <200 mL/j' },
          { value: 4, label: 'Créat >5.0 [>440] OU Diurèse <100 mL/j ou Anurie' },
        ],
        defaultValue: 0,
        unit: 'mg/dL [µmol/L] ou mL/jour'
      },
    ],
    calculation: createCalculationFunction,
    interpretation: (score: number): ScoreInterpretation => {
      if (score <= 1) return { level: 'very_low', text: `Score ${score}: Dysfonction d\'organe minime ou absente.` };
      if (score <= 6) return { level: 'low', text: `Score ${score}: Dysfonction d\'organe légère. Mortalité généralement <10%.` };
      if (score <= 9) return { level: 'moderate', text: `Score ${score}: Dysfonction d\'organe modérée. Mortalité ~15-20%.` };
      if (score <= 12) return { level: 'high', text: `Score ${score}: Dysfonction d\'organe sévère. Mortalité ~40-50%.` };
      if (score <= 15) return { level: 'very_high', text: `Score ${score}: Dysfonction d\'organe très sévère. Mortalité ~50-60%.` };
      if (score > 15) return { level: 'severe', text: `Score ${score}: Dysfonction d\'organe critique. Mortalité >80-95%.` };
      return { level: 'severe', text: 'Score inattendu. Vérifier les données.' };
    },
    source: 'Vincent JL, Moreno R, Takala J, et al. The SOFA (Sepsis-related Organ Failure Assessment) score to describe organ dysfunction/failure. Intensive Care Med. 1996 Jul;22(7):707-10.',
    moreInfoLink: 'https://www.mdcalc.com/calc/292/sofa-score-sequential-organ-failure-assessment',
    notes: 'Score total de 0 à 24. Un score de base peut être établi à l\'admission en USI. Les changements (delta SOFA) sont importants pour le suivi, notamment pour le diagnostic de sepsis (critères Sepsis-3).',
  }
];
