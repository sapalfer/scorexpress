// src/data/scores_by_category/gastro.ts
import { Score, Category, ScoreInterpretation } from '../score_types.ts';
import { createCalculationFunction } from '../score_helpers.ts';

export const gastroScores: Score[] = [
  {
    id: 'rockall',
    name: 'Score de Rockall',
    shortName: 'Rockall',
    category: Category.GASTRO, // Gastro-entérologie
    description: "Évalue le risque de récidive hémorragique et de mortalité après une hémorragie digestive haute.",
    referenceValues: {
      low_risk_rebleed: 'Score 0-2: Risque faible de récidive (0-5%).',
      high_risk_rebleed: 'Score 3-5: Risque élevé de récidive (11-25%).',
      very_high_risk_rebleed: 'Score >5: Risque très élevé de récidive (>30%).',
      low_risk_mortality: 'Score 0-2: Mortalité faible (0-2%).',
      intermediate_risk_mortality: 'Score 3-4: Mortalité intermédiaire (5-11%).',
      high_risk_mortality: 'Score ≥5: Mortalité élevée (24-40%).',
    },
    criteria: [
      {
        id: 'age',
        name: 'Âge',
        type: 'select',
        options: [
          { value: 0, label: '< 60 ans' },
          { value: 1, label: '60-79 ans' },
          { value: 2, label: '≥ 80 ans' },
        ],
        defaultValue: 0,
      },
      {
        id: 'shock',
        name: 'Choc hémodynamique',
        type: 'select',
        options: [
          { value: 0, label: 'Aucun (PAS ≥100 mmHg, FC <100/min)' },
          { value: 1, label: 'Tachycardie (PAS ≥100 mmHg, FC ≥100/min)' },
          { value: 2, label: 'Hypotension (PAS <100 mmHg)' },
        ],
        defaultValue: 0,
      },
      {
        id: 'comorbidity',
        name: 'Comorbidités majeures',
        type: 'select',
        options: [
          { value: 0, label: 'Aucune comorbidité majeure' },
          { value: 2, label: 'Insuffisance cardiaque, cardiopathie ischémique, autre comorbidité majeure' },
          { value: 3, label: 'Insuffisance rénale, insuffisance hépatique, cancer disséminé' },
        ],
        defaultValue: 0,
      },
      {
        id: 'endoscopic_diagnosis',
        name: 'Diagnostic endoscopique',
        type: 'select',
        options: [
          { value: 0, label: 'Syndrome de Mallory-Weiss, pas de lésion identifiée, pas de stigmates d\'hémorragie récente' },
          { value: 1, label: 'Tous les autres diagnostics' },
          { value: 2, label: 'Néoplasie digestive haute maligne' },
        ],
        defaultValue: 0,
        description: 'Ce critère est basé sur les résultats de l\'endoscopie.'
      },
      {
        id: 'endoscopic_stigmata_recent_hemorrhage',
        name: 'Stigmates endoscopiques d\'hémorragie récente',
        type: 'select',
        options: [
          { value: 0, label: 'Aucun ou seulement un spot pigmenté noir' },
          { value: 2, label: 'Sang dans l\'estomac, caillot adhérent, vaisseau visible, saignement actif' },
        ],
        defaultValue: 0,
        description: 'Ce critère est basé sur les résultats de l\'endoscopie.'
      },
    ],
    calculation: createCalculationFunction,
    interpretation: (score: number): ScoreInterpretation => {
      if (score <= 2) return { level: 'low', text: 'Risque faible de mortalité (Score 0-2: 0.2-2.4%).'};
      if (score <= 4) return { level: 'moderate', text: 'Risque modéré de mortalité (Score 3-4: 5.6-11%).'};
      if (score >=5) return { level: 'high', text: 'Risque élevé de mortalité (Score ≥5: 24.6-39.6%).'};
      return { level: 'severe', text: 'Score inattendu. Vérifier les données.' };
    },
    source: 'Rockall TA, Logan RF, Devlin HB, Northfield TC. Risk assessment after acute upper gastrointestinal haemorrhage. Gut. 1996 Mar;38(3):316-21.',
    moreInfoLink: 'https://www.mdcalc.com/calc/123/rockall-score-upper-gi-bleeding',
    notes: 'Le score complet (maximum 11 points) inclut des critères endoscopiques. Un score "clinique" (maximum 7 points) peut être calculé avant l\'endoscopie en omettant les deux derniers critères.',
  },
  {
    id: 'child-pugh',
    name: 'Score de Child-Pugh',
    shortName: 'Child-Pugh',
    category: Category.GASTRO,
    description: "Évalue la sévérité et le pronostic de la cirrhose hépatique.",
    referenceValues: {
      class_a: 'Classe A (Score 5-6): Survie à 1 an 100%, à 2 ans 85%. Bien compensée.',
      class_b: 'Classe B (Score 7-9): Survie à 1 an 81%, à 2 ans 57%. Compromis fonctionnel significatif.',
      class_c: 'Classe C (Score 10-15): Survie à 1 an 45%, à 2 ans 35%. Décompensée.',
    },
    criteria: [
      {
        id: 'ascites',
        name: 'Ascite',
        type: 'select',
        options: [
          { value: 1, label: 'Absente' },
          { value: 2, label: 'Minime (contrôlée par diurétiques)' },
          { value: 3, label: 'Modérée à sévère (mal contrôlée)' },
        ],
        defaultValue: 1,
      },
      {
        id: 'bilirubin',
        name: 'Bilirubine sérique',
        type: 'select',
        options: [
          { value: 1, label: '< 34 µmol/L (< 2 mg/dL)' },
          { value: 2, label: '34-50 µmol/L (2-3 mg/dL)' },
          { value: 3, label: '> 50 µmol/L (> 3 mg/dL)' },
        ],
        defaultValue: 1,
        unit: 'µmol/L ou mg/dL'
      },
      {
        id: 'albumin',
        name: 'Albumine sérique',
        type: 'select',
        options: [
          { value: 1, label: '> 35 g/L (> 3.5 g/dL)' },
          { value: 2, label: '28-35 g/L (2.8-3.5 g/dL)' },
          { value: 3, label: '< 28 g/L (< 2.8 g/dL)' },
        ],
        defaultValue: 1,
        unit: 'g/L ou g/dL'
      },
      {
        id: 'prothrombin_time_inr',
        name: 'Temps de prothrombine (TP) / INR',
        type: 'select',
        options: [
          { value: 1, label: 'TP > 50% ou INR < 1.7' },
          { value: 2, label: 'TP 30-50% ou INR 1.7-2.3' },
          { value: 3, label: 'TP < 30% ou INR > 2.3' },
        ],
        defaultValue: 1,
        description: 'Utiliser soit le TP (prolongation en secondes ou %), soit l\'INR.'
      },
      {
        id: 'encephalopathy',
        name: 'Encéphalopathie hépatique',
        type: 'select',
        options: [
          { value: 1, label: 'Aucune (Grade 0)' },
          { value: 2, label: 'Grade 1-2 (Légère à modérée)' },
          { value: 3, label: 'Grade 3-4 (Sévère, coma)' },
        ],
        defaultValue: 1,
      },
    ],
    calculation: createCalculationFunction,
    interpretation: (score: number): ScoreInterpretation => {
      if (score <= 6) return { level: 'class_a', text: 'Classe A (Score 5-6). Survie à 1 an: 100%, à 2 ans: 85%.' };
      if (score <= 9) return { level: 'class_b', text: 'Classe B (Score 7-9). Survie à 1 an: 81%, à 2 ans: 57%.' };
      if (score <= 15) return { level: 'class_c', text: 'Classe C (Score 10-15). Survie à 1 an: 45%, à 2 ans: 35%.' };
      return { level: 'severe', text: 'Score inattendu. Vérifier les données.' };
    },
    source: 'Pugh RN, Murray-Lyon IM, Dawson JL, Pietroni MC, Williams R. Transection of the oesophagus for bleeding oesophageal varices. Br J Surg. 1973 Aug;60(8):646-9.',
    moreInfoLink: 'https://www.mdcalc.com/calc/14/child-pugh-score-cirrhosis-mortality',
    notes: 'Score maximum de 15. Utilisé pour évaluer la sévérité de la maladie hépatique chronique, notamment la cirrhose.',
  }
];
