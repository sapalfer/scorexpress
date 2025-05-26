// src/data/scores_by_category/cardio.ts
import { Score, Category, ScoreInterpretation } from '../score_types';
import { createCalculationFunction } from '../score_helpers';

export const cardioScores: Score[] = [
  {
    id: 'chads2vasc',
    name: 'Score CHA₂DS₂-VASc',
    shortName: 'CHA₂DS₂-VASc',
    category: Category.CARDIO,
    description: "Évalue le risque d'AVC chez les patients atteints de fibrillation auriculaire non valvulaire.",
    referenceValues: {
      score_0_male: 'Score 0: Risque très faible. Pas d\'antithrombotique.',
      score_1_female: 'Score 1: Risque très faible. Pas d\'antithrombotique.',
      score_1_male: 'Score 1: Risque faible. Envisager un traitement par AAP ou anticoagulant oral (ACO).',
      score_2_female: 'Score 2: Risque faible. Envisager un traitement par AAP ou ACO.',
      score_2_plus_male: 'Score ≥2: Risque modéré à élevé. Traitement par ACO recommandé.',
      score_3_plus_female: 'Score ≥3: Risque modéré à élevé. Traitement par ACO recommandé.',
    },
    criteria: [
      { id: 'congestive_heart_failure', name: 'Insuffisance cardiaque congestive (C)', type: 'boolean', points: 1, defaultValue: false },
      { id: 'hypertension', name: 'Hypertension artérielle (H)', type: 'boolean', points: 1, defaultValue: false },
      { id: 'age_gte_75', name: 'Âge ≥ 75 ans (A₂)', type: 'boolean', points: 2, defaultValue: false },
      { id: 'diabetes_mellitus', name: 'Diabète sucré (D)', type: 'boolean', points: 1, defaultValue: false },
      { id: 'stroke_tia_thromboembolism', name: 'AVC/AIT/Thromboembolie antérieurs (S₂)', type: 'boolean', points: 2, defaultValue: false },
      { id: 'vascular_disease', name: 'Maladie vasculaire (IDM, AOMI, plaque aortique) (V)', type: 'boolean', points: 1, defaultValue: false },
      { id: 'age_65_74', name: 'Âge 65-74 ans (A)', type: 'boolean', points: 1, defaultValue: false },
      { id: 'sex_female', name: 'Sexe féminin (Sc)', type: 'boolean', points: 1, defaultValue: false },
    ],
    calculation: createCalculationFunction,
    interpretation: (score: number): ScoreInterpretation => {
      if (score === 0) return { level: 'low', text: 'Risque très faible (0.2-0.6% AVC/an). Envisager aucun traitement antithrombotique.' };
      if (score === 1) return { level: 'low', text: 'Risque faible (0.6-1.3% AVC/an). Envisager traitement antiplaquettaire ou anticoagulant.' };
      if (score === 2) return { level: 'moderate', text: 'Risque modéré (2.2-2.8% AVC/an). Anticoagulation orale recommandée.' };
      if (score >= 3 && score <= 4) return { level: 'high', text: 'Risque élevé (3.2-5.9% AVC/an). Anticoagulation orale recommandée.' };
      if (score >= 5) return { level: 'very_high', text: 'Risque très élevé (≥9.6% AVC/an). Anticoagulation orale recommandée.' };
      return { level: 'severe', text: 'Score inattendu. Vérifier les données.' };
    },
    source: 'Lip GY, Nieuwlaat R, Pisters R, Lane DA, Crijns HJ. Refining clinical risk stratification for predicting stroke and thromboembolism in atrial fibrillation using a novel risk factor-based approach: the Euro Heart Survey on Atrial Fibrillation. Chest. 2010 Feb;137(2):263-72.',
    moreInfoLink: 'https://www.mdcalc.com/calc/102/chads2-vasc-score-atrial-fibrillation-stroke-risk',
    notes: 'Score maximum de 9. Les recommandations de traitement peuvent varier selon les directives locales et le sexe du patient pour les scores bas.',
  },
  {
    id: 'wells-dvt',
    name: 'Score de Wells (TVP)',
    shortName: 'Wells DVT',
    category: Category.CARDIO,
    description: "Évalue la probabilité clinique de thrombose veineuse profonde (TVP).",
    referenceValues: {
      dvt_unlikely: 'Score ≤1: TVP peu probable.',
      dvt_likely: 'Score ≥2: TVP probable.',
      three_tier_low: 'Score 0: Faible probabilité (3%).',
      three_tier_moderate: 'Score 1-2: Probabilité modérée (17%).',
      three_tier_high: 'Score ≥3: Forte probabilité (75%).',
    },
    criteria: [
      { id: 'active_cancer', name: 'Cancer actif (traitement en cours, dans les 6 mois, ou palliatif)', type: 'boolean', points: 1, defaultValue: false },
      { id: 'paralysis_paresis_immobilization', name: 'Paralysie, parésie ou immobilisation plâtrée récente d\'un membre inférieur', type: 'boolean', points: 1, defaultValue: false },
      { id: 'bedridden_gt_3days_major_surgery_lt_12wks', name: 'Alitement > 3 jours ou chirurgie majeure dans les 12 dernières semaines nécessitant une anesthésie générale ou locorégionale', type: 'boolean', points: 1, defaultValue: false },
      { id: 'localized_tenderness', name: 'Douleur localisée sur le trajet du système veineux profond', type: 'boolean', points: 1, defaultValue: false },
      { id: 'entire_leg_swollen', name: 'Œdème de toute la jambe', type: 'boolean', points: 1, defaultValue: false },
      { id: 'calf_swelling_gt_3cm', name: 'Mollet augmenté de volume > 3 cm par rapport au côté asymptomatique (mesuré 10 cm sous la tubérosité tibiale)', type: 'boolean', points: 1, defaultValue: false },
      { id: 'pitting_edema', name: 'Œdème prenant le godet (limité au membre symptomatique)', type: 'boolean', points: 1, defaultValue: false },
      { id: 'collateral_superficial_veins', name: 'Veines superficielles collatérales (non variqueuses)', type: 'boolean', points: 1, defaultValue: false },
      { id: 'previous_dvt', name: 'Antécédent de TVP documentée', type: 'boolean', points: 1, defaultValue: false },
      { id: 'alternative_diagnosis_as_likely', name: 'Autre diagnostic au moins aussi probable que celui de TVP', type: 'boolean', points: -2, defaultValue: false },
    ],
    calculation: createCalculationFunction,
    interpretation: (score: number): ScoreInterpretation => {
      if (score <= 1) return { level: 'low', text: 'TVP peu probable (Score ≤1). Envisager D-dimères si disponibles.' };
      if (score >= 2) return { level: 'high', text: 'TVP probable (Score ≥2). Envisager échographie Doppler.' };
      return { level: 'severe', text: 'Score inattendu. Vérifier les données.' };
    },
    source: 'Wells PS, Anderson DR, Bormanis J, et al. Value of assessment of pretest probability of deep-vein thrombosis in clinical management. Lancet. 1997 Dec 20-27;350(9094):1795-8.',
    moreInfoLink: 'https://www.mdcalc.com/calc/128/wells-criteria-dvt',
    notes: 'Un score négatif est possible. Le score original a été modifié pour inclure -2 points si un autre diagnostic est plus probable.',
  }
,
  {
    id: 'heart',
    name: 'Score HEART pour les événements cardiaques majeurs',
    shortName: 'HEART Score',
    category: Category.CARDIO,
    description: "Prédit le risque d'événements cardiaques majeurs (MACE) à 6 semaines chez les patients se présentant aux urgences avec une douleur thoracique.",
    referenceValues: {
      low_risk: 'Score 0-3: Risque faible (0.9-1.7% MACE). Envisager une sortie précoce.',
      moderate_risk: 'Score 4-6: Risque modéré (12-16.6% MACE). Observation/Admission recommandée.',
      high_risk: 'Score 7-10: Risque élevé (50-65% MACE). Intervention précoce/agressive.',
    },
    criteria: [
      {
        id: 'history_heart',
        name: 'Anamnèse (History)',
        type: 'select',
        options: [
          { value: 0, label: 'Peu suspecte' },
          { value: 1, label: 'Modérément suspecte' },
          { value: 2, label: 'Très suspecte' },
        ],
        defaultValue: 0,
      },
      {
        id: 'ecg_heart',
        name: 'ECG',
        type: 'select',
        options: [
          { value: 0, label: 'Normal' },
          { value: 1, label: 'Repolarisation non spécifique' },
          { value: 2, label: 'Déviation significative du segment ST' },
        ],
        defaultValue: 0,
      },
      {
        id: 'age_heart',
        name: 'Âge',
        type: 'select',
        options: [
          { value: 0, label: '< 45 ans' },
          { value: 1, label: '45-64 ans' },
          { value: 2, label: '≥ 65 ans' },
        ],
        defaultValue: 0,
      },
      {
        id: 'risk_factors_heart',
        name: 'Facteurs de risque',
        type: 'select',
        options: [
          { value: 0, label: 'Aucun facteur de risque connu' },
          { value: 1, label: '1-2 facteurs de risque' },
          { value: 2, label: '≥3 facteurs de risque OU Athérosclérose connue' },
        ],
        defaultValue: 0,
        description: 'Facteurs: Diabète, Tabagisme (actuel/récent), HTA, Dyslipidémie, ATCD familiaux de coronaropathie, Obésité (IMC>30). Athérosclérose: IDM, angioplastie/pontage, AVC/AIT, artériopathie périphérique.',
      },
      {
        id: 'troponin_heart',
        name: 'Troponine initiale',
        type: 'select',
        options: [
          { value: 0, label: '≤ Limite normale' },
          { value: 1, label: '1-3x Limite normale' },
          { value: 2, label: '>3x Limite normale' },
        ],
        defaultValue: 0,
        description: 'Utiliser le dosage de troponine à haute sensibilité si disponible, selon les seuils locaux.'
      },
    ],
    calculation: createCalculationFunction,
    interpretation: (score: number): ScoreInterpretation => {
      if (score <= 3) return { level: 'low', text: `Score ${score} (0-3): Risque faible de MACE. Envisager sortie.` };
      if (score <= 6) return { level: 'moderate', text: `Score ${score} (4-6): Risque modéré de MACE. Envisager admission.` };
      if (score >= 7) return { level: 'high', text: `Score ${score} (7-10): Risque élevé de MACE. Prise en charge agressive.` };
      return { level: 'severe', text: 'Score inattendu. Vérifier les données.' };
    },
    source: 'Six AJ, Backus BE, Kelder JC. Chest pain in the emergency room: a multicenter validation of the HEART Score. Crit Pathw Cardiol. 2008 Sep;7(3):165-9.',
    moreInfoLink: 'https://www.mdcalc.com/calc/1752/heart-score-major-cardiac-events',
    notes: 'MACE = Major Adverse Cardiac Events (infarctus du myocarde, revascularisation coronarienne percutanée ou chirurgicale, décès d\'origine cardiovasculaire). Score de 0 à 10.',
  },
  {
    id: 'nyha',
    name: 'Classification fonctionnelle NYHA (New York Heart Association)',
    shortName: 'NYHA',
    category: Category.CARDIO,
    description: "Classe la sévérité de l\'insuffisance cardiaque en fonction des symptômes et de la limitation de l\'activité physique.",
    criteria: [
      {
        id: 'nyha_class',
        name: 'Classe NYHA',
        type: 'select',
        options: [
          { value: 1, label: 'Classe I: Aucune limitation de l\'activité physique.' },
          { value: 2, label: 'Classe II: Limitation légère de l\'activité physique.' },
          { value: 3, label: 'Classe III: Limitation marquée de l\'activité physique.' },
          { value: 4, label: 'Classe IV: Incapacité à effectuer toute activité physique sans inconfort.' },
        ],
        defaultValue: 1,
      },
    ],
    calculation: createCalculationFunction,
    interpretation: (score: number): ScoreInterpretation => {
      switch (score) {
        case 1: return { level: 'class_i', text: 'Classe I: Pas de symptômes avec une activité ordinaire.' };
        case 2: return { level: 'class_ii', text: 'Classe II: Symptômes avec une activité ordinaire.' };
        case 3: return { level: 'class_iii', text: 'Classe III: Symptômes avec une activité moins qu\'ordinaire.' };
        case 4: return { level: 'class_iv', text: 'Classe IV: Symptômes au repos ou avec toute activité.' };
        default: return { level: 'abnormal', text: 'Classe inconnue.' };
      }
    },
    source: 'The Criteria Committee of the New York Heart Association. Nomenclature and Criteria for Diagnosis of Diseases of the Heart and Great Vessels. 9th ed. 1994.',
    moreInfoLink: 'https://www.mdcalc.com/calc/116/nyha-classification',
  }
];
