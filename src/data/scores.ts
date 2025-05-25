// src/data/scores.ts

// Type Definitions
export type CalculationFunction = (values: number[]) => number;
export type InterpretationFunction = (score: number) => ScoreInterpretation;

// Interface Definitions
export interface CriterionOption {
  value: number;
  label: string;
}

export interface ScoreInterpretation {
  level: 'low' | 'moderate' | 'high' | 'severe' | 'very_low' | 'very_high' | 'normal' | 'abnormal' | 'intermediate' | 'class_i' | 'class_ii' | 'class_iii' | 'class_iv' | 'stage_1' | 'stage_2' | 'stage_3' | 'stage_4' | 'stage_5' | 'class_a' | 'class_b' | 'class_c'; // Expanded for flexibility
  text: string;
}

export interface ScoreCriterion {
  id: string;
  name: string;
  type: 'number' | 'select' | 'boolean' | 'info'; // Added 'info' for non-scoring criteria
  options?: CriterionOption[];
  points?: number | ((value: number | boolean | string) => number); // value can be number, boolean, or string from select
  defaultValue?: number | boolean | string | undefined;
  unit?: string; // Optional unit for number types
  description?: string; // Optional description for the criterion
}

export interface Score {
  id: string;
  name: string;
  shortName?: string; // Optional short name for display
  category: Category;
  description: string;
  referenceValues?: Record<string, string>; // Kept as string for flexibility, can be parsed
  criteria: ScoreCriterion[];
  calculation: CalculationFunction;
  interpretation: InterpretationFunction;
  source: string;
  moreInfoLink?: string; // Optional link for more details
  notes?: string; // General notes about the score
}

// Enum Definition
export enum Category {
  URGENCE = 'Urgence',
  CARDIO = 'Cardiologie',
  REA = 'Réanimation',
  CHIRURGIE = 'Chirurgie',
  PNEUMO = 'Pneumologie',
  NEURO = 'Neurologie',
  GASTRO = 'Gastro-entérologie',
  INFECTO = 'Infectiologie',
  HEMA = 'Hématologie', // Corrected from HEMATO to HEMA for consistency if preferred, or use HEMATO
  NEPHRO = 'Néphrologie',
  GERIA = 'Gériatrie', // Corrected from GERIATRIE
  GYNECO = 'Gynécologie',
  PED = 'Pédiatrie',
  PSY = 'Psychiatrie',
  ENDO = 'Endocrinologie',
  ONCO = 'Oncologie',
  DERMA = 'Dermatologie',
  RHUMA = 'Rhumatologie',
  URO = 'Urologie',
  ORL = 'ORL',
  OPHTA = 'Ophtalmologie',
  AUTRES = 'Autres',
}

// Helper Functions
const createCalculationFunction: CalculationFunction = (values: number[]): number => {
  return values.reduce((acc: number, val: number) => acc + (val || 0), 0); // Ensure val is a number, default to 0 if undefined/null
};

// Main Export - Initially empty, we will add scores one by one
export const scores: Score[] = [
  // Adding Glasgow Coma Scale (GCS)
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
    calculation: createCalculationFunction, // Uses the helper
    interpretation: (score: number): ScoreInterpretation => {
      if (score >= 13) return { level: 'low', text: 'Traumatisme crânien léger (GCS 13-15)' };
      if (score >= 9) return { level: 'moderate', text: 'Traumatisme crânien modéré (GCS 9-12)' };
      return { level: 'severe', text: 'Traumatisme crânien sévère (GCS ≤ 8)' };
    },
    source: 'Teasdale G, Jennett B. Assessment of coma and impaired consciousness. A practical scale. Lancet. 1974 Jul 13;2(7872):81-4.',
    moreInfoLink: 'https://www.mdcalc.com/calc/119/glasgow-coma-scale-score-gcs',
    notes: 'Le score GCS varie de 3 (coma profond) à 15 (personne parfaitement consciente). Additionner Y + V + M.',
  },
  {
    id: 'crb65',
    name: 'Score CRB-65',
    shortName: 'CRB-65',
    category: Category.PNEUMO, // Pneumologie
    description: "Évalue la sévérité de la pneumonie communautaire et aide à la décision d'hospitalisation.",
    referenceValues: {
      low_risk: 'Score 0: Mortalité faible, traitement ambulatoire possible.',
      moderate_risk: 'Score 1-2: Mortalité augmentée, hospitalisation à considérer.',
      high_risk: 'Score 3-4: Mortalité élevée, hospitalisation urgente.',
    },
    criteria: [
      {
        id: 'confusion',
        name: 'Confusion (nouvelle désorientation)',
        type: 'boolean',
        points: 1,
        defaultValue: false,
      },
      {
        id: 'respiratory_rate',
        name: 'Fréquence respiratoire ≥ 30/min',
        type: 'boolean',
        points: 1,
        defaultValue: false,
      },
      {
        id: 'blood_pressure',
        name: 'Pression artérielle (PAS < 90 mmHg ou PAD ≤ 60 mmHg)',
        type: 'boolean',
        points: 1,
        defaultValue: false,
      },
      {
        id: 'age',
        name: 'Âge ≥ 65 ans',
        type: 'boolean',
        points: 1,
        defaultValue: false,
      },
    ],
    calculation: createCalculationFunction, // Each boolean criterion if true contributes its 'points' value
    interpretation: (score: number): ScoreInterpretation => {
      if (score === 0) return { level: 'low', text: 'Risque faible (Mortalité 0.6-1.2%). Traitement ambulatoire.' };
      if (score === 1) return { level: 'moderate', text: 'Risque modéré (Mortalité 5.2-8.5%). Hospitalisation à considérer.' };
      if (score === 2) return { level: 'moderate', text: 'Risque modéré (Mortalité 12%). Hospitalisation habituelle.' }; // Often grouped with score 1, but can be distinct
      if (score >= 3) return { level: 'high', text: 'Risque élevé (Mortalité 31-40%). Hospitalisation urgente, considérer USI si score 4.' }; // Score 3 or 4
      return { level: 'severe', text: 'Score inattendu. Vérifier les données.' }; // Fallback
    },
    source: 'Lim WS, van der Eerden MM, Laing R, et al. Defining community acquired pneumonia severity on presentation to hospital: an international derivation and validation study. Thorax. 2003 May;58(5):377-82.',
    moreInfoLink: 'https://www.mdcalc.com/calc/44/crb-65-score',
    notes: 'Un point pour chaque critère présent. Score maximum de 4.',
  },
  {
    id: 'chads2vasc',
    name: 'Score CHA₂DS₂-VASc',
    shortName: 'CHA₂DS₂-VASc',
    category: Category.CARDIO, // Cardiologie
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
      // Interpretation can be complex due to sex differences in recommendations at low scores.
      // This is a simplified general interpretation. Clinical guidelines should be consulted.
      if (score === 0) return { level: 'low', text: 'Risque très faible (0.2-0.6% AVC/an). Envisager aucun traitement antithrombotique.' };
      if (score === 1) return { level: 'low', text: 'Risque faible (0.6-1.3% AVC/an). Envisager traitement antiplaquettaire ou anticoagulant.' };
      if (score === 2) return { level: 'moderate', text: 'Risque modéré (2.2-2.8% AVC/an). Anticoagulation orale recommandée.' };
      if (score >= 3 && score <= 4) return { level: 'high', text: 'Risque élevé (3.2-5.9% AVC/an). Anticoagulation orale recommandée.' };
      if (score >= 5) return { level: 'very_high', text: 'Risque très élevé (≥9.6% AVC/an). Anticoagulation orale recommandée.' };
      return { level: 'severe', text: 'Score inattendu. Vérifier les données.' }; // Fallback
    },
    source: 'Lip GY, Nieuwlaat R, Pisters R, Lane DA, Crijns HJ. Refining clinical risk stratification for predicting stroke and thromboembolism in atrial fibrillation using a novel risk factor-based approach: the Euro Heart Survey on Atrial Fibrillation. Chest. 2010 Feb;137(2):263-72.',
    moreInfoLink: 'https://www.mdcalc.com/calc/102/chads2-vasc-score-atrial-fibrillation-stroke-risk',
    notes: 'Score maximum de 9. Les recommandations de traitement peuvent varier selon les directives locales et le sexe du patient pour les scores bas.',
  },
  {
    id: 'wells-dvt',
    name: 'Score de Wells (TVP)',
    shortName: 'Wells DVT',
    category: Category.CARDIO, // Or HEMATO, as it relates to thrombosis
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
      // Standard 2-level interpretation
      if (score <= 1) return { level: 'low', text: 'TVP peu probable (Score ≤1). Envisager D-dimères si disponibles.' };
      if (score >= 2) return { level: 'high', text: 'TVP probable (Score ≥2). Envisager échographie Doppler.' };
      // Optional 3-level interpretation (can be presented to user or used internally)
      // if (score === 0) return { level: 'low', text: 'Faible probabilité (3%).'};
      // if (score === 1 || score === 2) return { level: 'moderate', text: 'Probabilité modérée (17%).'};
      // if (score >= 3) return { level: 'high', text: 'Forte probabilité (75%).'};
      return { level: 'severe', text: 'Score inattendu. Vérifier les données.' }; // Fallback
    },
    source: 'Wells PS, Anderson DR, Bormanis J, et al. Value of assessment of pretest probability of deep-vein thrombosis in clinical management. Lancet. 1997 Dec 20-27;350(9094):1795-8.',
    moreInfoLink: 'https://www.mdcalc.com/calc/128/wells-criteria-dvt',
    notes: 'Un score négatif est possible. Le score original a été modifié pour inclure -2 points si un autre diagnostic est plus probable.',
  },
  {
    id: 'wells-pe',
    name: 'Score de Wells (EP)',
    shortName: 'Wells PE',
    category: Category.PNEUMO, // Or CARDIO, as it's a vascular event
    description: "Évalue la probabilité clinique d'embolie pulmonaire (EP).",
    referenceValues: {
      pe_unlikely_2_tier: 'Score ≤4: EP peu probable (Probabilité ~12%).',
      pe_likely_2_tier: 'Score >4: EP probable (Probabilité ~37%).',
      pe_low_3_tier: 'Score 0-1: Risque faible (Probabilité ~3.6%).',
      pe_moderate_3_tier: 'Score 2-6: Risque modéré (Probabilité ~20.5%).',
      pe_high_3_tier: 'Score >6: Risque élevé (Probabilité ~66.7%).',
    },
    criteria: [
      { id: 'clinical_signs_dvt', name: 'Signes cliniques de TVP (membre inférieur)', type: 'boolean', points: 3, defaultValue: false },
      { id: 'pe_as_likely_or_more_likely_than_alternative', name: 'EP aussi ou plus probable que les autres diagnostics', type: 'boolean', points: 3, defaultValue: false },
      { id: 'heart_rate_gt_100', name: 'Fréquence cardiaque > 100 bpm', type: 'boolean', points: 1.5, defaultValue: false },
      { id: 'immobilization_or_surgery_prev_4wks', name: 'Immobilisation ≥ 3 jours OU chirurgie dans les 4 semaines précédentes', type: 'boolean', points: 1.5, defaultValue: false },
      { id: 'previous_dvt_pe', name: 'Antécédent de TVP ou d\'EP', type: 'boolean', points: 1.5, defaultValue: false },
      { id: 'hemoptysis', name: 'Hémoptysie', type: 'boolean', points: 1, defaultValue: false },
      { id: 'malignancy_active_treatment', name: 'Cancer (traitement actif, palliatif, ou <6 mois)', type: 'boolean', points: 1, defaultValue: false },
    ],
    calculation: createCalculationFunction,
    interpretation: (score: number): ScoreInterpretation => {
      // Standard 2-level interpretation (Wells et al. 2000)
      if (score <= 4) return { level: 'low', text: 'EP peu probable (Score ≤4). Envisager D-dimères si PERC négatif.' };
      if (score > 4) return { level: 'high', text: 'EP probable (Score >4). Envisager imagerie diagnostique (Angio-CT).' };
      // Optional 3-level interpretation (Klok et al. 2008, used with YEARS algorithm)
      // if (score <= 1) return { level: 'low', text: 'Risque faible.'};
      // if (score >= 2 && score <=6) return { level: 'moderate', text: 'Risque modéré.'};
      // if (score > 6) return { level: 'high', text: 'Risque élevé.'};
      return { level: 'severe', text: 'Score inattendu. Vérifier les données.' }; // Fallback
    },
    source: 'Wells PS, Anderson DR, Rodger M, et al. Derivation of a simple clinical model to categorize patients probability of pulmonary embolism: increasing the models utility with the SimpliRED D-dimer. Thromb Haemost. 2000 Mar;83(3):416-20.',
    moreInfoLink: 'https://www.mdcalc.com/calc/130/wells-criteria-pulmonary-embolism',
    notes: 'Plusieurs versions existent. Les points pour certains critères peuvent varier (ex: 1.5 vs 1). La version présentée est commune. Score maximum 12.5.',
  },
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
      // Endoscopic findings - these are part of the "complete" Rockall score
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
          // Value 1 is not explicitly defined for this criterion in many versions, points jump to 2
          { value: 2, label: 'Sang dans l\'estomac, caillot adhérent, vaisseau visible, saignement actif' },
        ],
        defaultValue: 0,
        description: 'Ce critère est basé sur les résultats de l\'endoscopie.'
      },
    ],
    calculation: createCalculationFunction,
    interpretation: (score: number): ScoreInterpretation => {
      // Interpretation for mortality risk
      if (score <= 2) return { level: 'low', text: 'Risque faible de mortalité (Score 0-2: 0.2-2.4%).'};
      if (score <= 4) return { level: 'moderate', text: 'Risque modéré de mortalité (Score 3-4: 5.6-11%).'};
      if (score >=5) return { level: 'high', text: 'Risque élevé de mortalité (Score ≥5: 24.6-39.6%).'};
      return { level: 'severe', text: 'Score inattendu. Vérifier les données.' }; // Fallback
    },
    source: 'Rockall TA, Logan RF, Devlin HB, Northfield TC. Risk assessment after acute upper gastrointestinal haemorrhage. Gut. 1996 Mar;38(3):316-21.',
    moreInfoLink: 'https://www.mdcalc.com/calc/123/rockall-score-upper-gi-bleeding',
    notes: 'Le score complet (maximum 11 points) inclut des critères endoscopiques. Un score "clinique" (maximum 7 points) peut être calculé avant l\'endoscopie en omettant les deux derniers critères.',
  },
  {
    id: 'child-pugh',
    name: 'Score de Child-Pugh',
    shortName: 'Child-Pugh',
    category: Category.GASTRO, // Gastro-entérologie
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
        type: 'select', // Could also be number input with logic in points function
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
        id: 'prothrombin_time_inr', // Combining PT and INR for simplicity, usually one is used
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
      return { level: 'severe', text: 'Score inattendu. Vérifier les données.' }; // Fallback
    },
    source: 'Pugh RN, Murray-Lyon IM, Dawson JL, Pietroni MC, Williams R. Transection of the oesophagus for bleeding oesophageal varices. Br J Surg. 1973 Aug;60(8):646-9.',
    moreInfoLink: 'https://www.mdcalc.com/calc/18/child-pugh-score-cirrhosis-mortality',
    notes: 'Score total de 5 à 15 points. Utilisé pour évaluer la nécessité d\'une transplantation hépatique et le pronostic péri-opératoire.',
  },
  {
    id: 'curb-65',
    name: 'Score CURB-65',
    shortName: 'CURB-65',
    category: Category.PNEUMO,
    description: "Évalue la sévérité de la pneumonie acquise en communauté (PAC) et aide à la décision d'hospitalisation.",
    referenceValues: {
      score_0_1: 'Score 0-1: Mortalité faible (0.6-2.7%). Traitement ambulatoire possible.',
      score_2: 'Score 2: Mortalité intermédiaire (6.8-9.2%). Hospitalisation courte ou surveillance ambulatoire rapprochée.',
      score_3_5: 'Score 3-5: Mortalité élevée (14.5-27.8%). Hospitalisation nécessaire, envisager USI si score 4-5.',
    },
    criteria: [
      { id: 'confusion', name: 'Confusion (score AMTS ≤ 8 ou nouvelle désorientation)', type: 'boolean', points: 1, defaultValue: false },
      {
        id: 'urea',
        name: 'Urée sanguine > 7 mmol/L (ou BUN > 19 mg/dL)',
        type: 'boolean', // Can also be a number input with a points function
        points: 1,
        defaultValue: false,
        unit: 'mmol/L ou mg/dL'
      },
      { id: 'respiratory_rate', name: 'Fréquence respiratoire ≥ 30/min', type: 'boolean', points: 1, defaultValue: false },
      { id: 'blood_pressure', name: 'Pression artérielle systolique < 90 mmHg OU diastolique ≤ 60 mmHg', type: 'boolean', points: 1, defaultValue: false },
      { id: 'age_ge_65', name: 'Âge ≥ 65 ans', type: 'boolean', points: 1, defaultValue: false },
    ],
    calculation: createCalculationFunction,
    interpretation: (score: number): ScoreInterpretation => {
      if (score <= 1) return { level: 'low', text: 'Mortalité faible (Score 0-1). Traitement ambulatoire.' };
      if (score === 2) return { level: 'moderate', text: 'Mortalité modérée (Score 2). Hospitalisation à considérer.' };
      if (score >= 3) return { level: 'high', text: 'Mortalité élevée (Score 3-5). Hospitalisation urgente, USI si score 4-5.' };
      return { level: 'severe', text: 'Score inattendu. Vérifier les données.' }; // Fallback
    },
    source: 'Lim WS, van der Eerden MM, Laing R, et al. Defining community acquired pneumonia severity on presentation to hospital: an international derivation and validation study. Thorax. 2003 May;58(5):377-82.',
    moreInfoLink: 'https://www.mdcalc.com/calc/334/curb-65-score-pneumonia-severity',
    notes: 'Score de 0 à 5. Le critère "Confusion" peut être évalué par un score AMTS (Abbreviated Mental Test Score) ≤ 8 ou une désorientation nouvelle dans le temps, le lieu ou la personne.',
  },
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
        id: 'cns_gcs',
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
    calculation: createCalculationFunction, // Sum of points from 6 organ systems (0-4 each)
    interpretation: (score: number): ScoreInterpretation => {
      if (score <= 1) return { level: 'very_low', text: `Score ${score}: Dysfonction d'organe minime ou absente.` };
      if (score <= 6) return { level: 'low', text: `Score ${score}: Dysfonction d'organe légère. Mortalité généralement <10%.` };
      if (score <= 9) return { level: 'moderate', text: `Score ${score}: Dysfonction d'organe modérée. Mortalité ~15-20%.` };
      if (score <= 12) return { level: 'high', text: `Score ${score}: Dysfonction d'organe sévère. Mortalité ~40-50%.` };
      if (score <= 15) return { level: 'very_high', text: `Score ${score}: Dysfonction d'organe très sévère. Mortalité ~50-60%.` };
      if (score > 15) return { level: 'severe', text: `Score ${score}: Dysfonction d'organe critique. Mortalité >80-95%.` };
      return { level: 'severe', text: 'Score inattendu. Vérifier les données.' }; // Fallback
    },
    source: 'Vincent JL, Moreno R, Takala J, et al. The SOFA (Sepsis-related Organ Failure Assessment) score to describe organ dysfunction/failure. Intensive Care Med. 1996 Jul;22(7):707-10.',
    moreInfoLink: 'https://www.mdcalc.com/calc/292/sofa-score-sequential-organ-failure-assessment',
    notes: 'Score total de 0 à 24. Un score de base peut être établi à l\'admission en USI. Les changements (delta SOFA) sont importants pour le suivi, notamment pour le diagnostic de sepsis (critères Sepsis-3).',
  },
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
      { id: 'respiratory_rate_ge_22', name: 'Fréquence respiratoire ≥ 22/min', type: 'boolean', points: 1, defaultValue: false },
      { id: 'altered_mental_status_gcs_lt_15', name: 'Altération de la conscience (Score de Glasgow < 15)', type: 'boolean', points: 1, defaultValue: false },
      { id: 'systolic_bp_le_100', name: 'Pression artérielle systolique ≤ 100 mmHg', type: 'boolean', points: 1, defaultValue: false },
    ],
    calculation: createCalculationFunction,
    interpretation: (score: number): ScoreInterpretation => {
      if (score >= 2) return { level: 'high', text: `Score ${score} (≥2): Risque élevé. Envisager sepsis et évaluer dysfonction d'organe.` };
      if (score < 2) return { level: 'low', text: `Score ${score} (<2): Risque plus faible. Poursuivre surveillance.` };
      return { level: 'severe', text: 'Score inattendu. Vérifier les données.' }; // Fallback
    },
    source: 'Singer M, Deutschman CS, Seymour CW, et al. The Third International Consensus Definitions for Sepsis and Septic Shock (Sepsis-3). JAMA. 2016 Feb 23;315(8):801-10.',
    moreInfoLink: 'https://www.mdcalc.com/calc/389/qsofa-score-sepsis',
    notes: 'Score de 0 à 3. Un score qSOFA ≥ 2 suggère un mauvais pronostic. Ce score ne diagnostique pas le sepsis mais identifie les patients à risque.',
  },
  {
    id: 'heart-score',
    name: 'Score HEART',
    shortName: 'HEART',
    category: Category.CARDIO, // Or URGENCE
    description: "Évalue le risque d'événements cardiaques majeurs (MACE) à 6 semaines chez les patients se présentant avec des douleurs thoraciques aux urgences.",
    referenceValues: {
      low_risk: 'Score 0-3: Risque faible (0.9-1.7% MACE). Suggère une sortie avec suivi ambulatoire.',
      moderate_risk: 'Score 4-6: Risque modéré (12-16.6% MACE). Suggère une admission pour observation et tests complémentaires.',
      high_risk: 'Score 7-10: Risque élevé (50-65% MACE). Suggère une prise en charge invasive précoce.',
    },
    criteria: [
      {
        id: 'history',
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
        id: 'ecg',
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
        id: 'age',
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
        id: 'risk_factors',
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
        id: 'troponin',
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
      return { level: 'severe', text: 'Score inattendu. Vérifier les données.' }; // Fallback
    },
    source: 'Six AJ, Backus BE, Kelder JC. Chest pain in the emergency room: a multicenter validation of the HEART Score. Crit Pathw Cardiol. 2008 Sep;7(3):165-9.',
    moreInfoLink: 'https://www.mdcalc.com/calc/1752/heart-score-major-cardiac-events',
    notes: 'MACE = Major Adverse Cardiac Events (infarctus du myocarde, revascularisation coronarienne percutanée ou chirurgicale, décès d\'origine cardiovasculaire). Score de 0 à 10.',
  },
  // Adding mMRC Dyspnea Scale
  {
    id: 'mmrc',
    name: 'Échelle de dyspnée mMRC (Modified Medical Research Council)',
    shortName: 'mMRC',
    category: Category.PNEUMO,
    description: "Évalue le degré de dyspnée lié à l'effort chez les patients atteints de maladies respiratoires.",
    criteria: [
      {
        id: 'dyspnea_grade',
        name: 'Grade de Dyspnée',
        type: 'select',
        options: [
          { value: 0, label: 'Grade 0: Je ne suis essoufflé(e) que lors d’un effort soutenu.' },
          { value: 1, label: 'Grade 1: Je suis essoufflé(e) lorsque je me dépêche sur terrain plat ou que je monte une légère pente.' },
          { value: 2, label: 'Grade 2: Je marche plus lentement que les gens de mon âge sur terrain plat à cause de mon essoufflement, ou je dois m’arrêter pour respirer lorsque je marche à mon propre rythme sur terrain plat.' },
          { value: 3, label: 'Grade 3: Je m’arrête pour respirer après avoir marché environ 100 mètres ou après quelques minutes sur terrain plat.' },
          { value: 4, label: 'Grade 4: Je suis trop essoufflé(e) pour quitter la maison ou je suis essoufflé(e) lorsque je m’habille ou me déshabille.' },
        ],
        defaultValue: 0,
      },
    ],
    calculation: (values: number[]) => values[0], // The selected grade is the score
    interpretation: (score: number): ScoreInterpretation => {
      switch (score) {
        case 0: return { level: 'very_low', text: 'Grade 0: Dyspnée pour effort soutenu uniquement.' };
        case 1: return { level: 'low', text: 'Grade 1: Dyspnée en se dépêchant ou en montant une pente légère.' };
        case 2: return { level: 'moderate', text: 'Grade 2: Marche plus lente que les pairs ou arrêt pour respirer en marchant à son rythme.' };
        case 3: return { level: 'high', text: 'Grade 3: Arrêt pour respirer après ~100m ou quelques minutes.' };
        case 4: return { level: 'very_high', text: 'Grade 4: Trop essoufflé pour quitter la maison / dyspnée à l\'habillage.' };
        default: return { level: 'abnormal', text: 'Grade inconnu.' };
      }
    },
    source: 'Bestall JC, Paul EA, Garrod R, et al. Usefulness of the Medical Research Council (MRC) dyspnoea scale... Thorax. 1999.',
    moreInfoLink: 'https://www.mdcalc.com/calc/1936/mmrc-modified-medical-research-council-dyspnea-scale',
  },
  // Adding NYHA Functional Classification
  {
    id: 'nyha',
    name: 'Classification fonctionnelle NYHA (New York Heart Association)',
    shortName: 'NYHA',
    category: Category.CARDIO,
    description: "Classe la sévérité de l'insuffisance cardiaque en fonction des symptômes et de la limitation de l'activité physique.",
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
    calculation: (values: number[]) => values[0], // The selected class is the score
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
  },
  // Adding Apgar Score
  {
    id: 'apgar',
    name: "Score d'Apgar",
    shortName: 'Apgar',
    category: Category.PED,
    description: "Évaluation rapide de l'état de santé d'un nouveau-né immédiatement après la naissance.",
    criteria: [
      {
        id: 'appearance',
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
        id: 'pulse',
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
        id: 'grimace',
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
        id: 'activity',
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
        id: 'respiration',
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
    calculation: createCalculationFunction, // Sum of points
    interpretation: (score: number): ScoreInterpretation => {
      if (score >= 7) return { level: 'normal', text: `Score ${score}: Normal (7-10)` };
      if (score >= 4) return { level: 'moderate', text: `Score ${score}: Modérément déprimé (4-6)` };
      return { level: 'severe', text: `Score ${score}: Sévèrement déprimé (0-3)` };
    },
    source: 'Apgar V. A proposal for a new method of evaluation of the newborn infant. Curr Res Anesth Analg. 1953.',
    moreInfoLink: 'https://www.mdcalc.com/calc/63/apgar-score',
    notes: 'Évalué à 1 et 5 minutes après la naissance. Score total de 0 à 10.',
  },
  // Adding Tanner Stages with drastically shortened option labels to avoid timeouts. Calculation and interpretation are placeholders.
  {
    id: 'tanner',
    name: 'Stades de Tanner',
    shortName: 'Tanner',
    category: Category.PED,
    description: "Échelle de développement pubertaire physique.",
    criteria: [
      {
        id: 'pubic_hair',
        name: 'Pilosité Pubienne (Garçons/Filles)',
        type: 'select',
        options: [
          { value: 1, label: 'Stade I' },
          { value: 2, label: 'Stade II' },
          { value: 3, label: 'Stade III' },
          { value: 4, label: 'Stade IV' },
          { value: 5, label: 'Stade V' },
        ],
        defaultValue: 1,
      },
      {
        id: 'breast_development_female',
        name: 'Développement Mammaire (Filles)',
        type: 'select',
        options: [
          { value: 0, label: 'N/A Garçon'},
          { value: 1, label: 'Stade I' },
          { value: 2, label: 'Stade II' },
          { value: 3, label: 'Stade III' },
          { value: 4, label: 'Stade IV' },
          { value: 5, label: 'Stade V' },
        ],
        defaultValue: 0,
      },
      {
        id: 'genital_development_male',
        name: 'Développement Génital (Garçons)',
        type: 'select',
        options: [
          { value: 0, label: 'N/A Fille'},
          { value: 1, label: 'Stade I' },
          { value: 2, label: 'Stade II' },
          { value: 3, label: 'Stade III' },
          { value: 4, label: 'Stade IV' },
          { value: 5, label: 'Stade V' },
        ],
        defaultValue: 0,
      },
    ],
    calculation: () => 0, // Simplified placeholder
    interpretation: (): ScoreInterpretation => ({ // Simplified placeholder
      level: 'normal',
      text: 'Description des stades de Tanner. Interprétation basée sur les critères individuels. Consulter source pour détails.'
    }),
    source: 'Marshall WA, Tanner JM. Variations in pattern of pubertal changes... Arch Dis Child. 1969 (girls) & 1970 (boys).',
    moreInfoLink: 'https://en.wikipedia.org/wiki/Tanner_scale',
    notes: 'Évaluation distincte par critère. Score descriptif. Labels abrégés pour concision.',
  },
  // Adding CAGE Questionnaire
  {
    id: 'cage',
    name: 'Questionnaire CAGE',
    shortName: 'CAGE',
    category: Category.PSY, // Psychiatrie / Médecine Générale - PSY seems most fitting from enum
    description: "Outil de dépistage de l'alcoolisme.",
    criteria: [
      {
        id: 'cut_down',
        name: 'Cut down (Diminuer): Avez-vous déjà ressenti le besoin de diminuer votre consommation d\'alcool?',
        type: 'boolean',
        points: 1, // 1 point for 'yes'
        defaultValue: false,
      },
      {
        id: 'annoyed',
        name: 'Annoyed (Agacé): Votre entourage vous a-t-il déjà fait des remarques au sujet de votre consommation d\'alcool?',
        type: 'boolean',
        points: 1,
        defaultValue: false,
      },
      {
        id: 'guilty',
        name: 'Guilty (Coupable): Vous êtes-vous déjà senti coupable à cause de votre consommation d\'alcool?',
        type: 'boolean',
        points: 1,
        defaultValue: false,
      },
      {
        id: 'eye_opener',
        name: 'Eye-opener (Premier verre): Avez-vous déjà eu besoin d\'un premier verre d\'alcool le matin pour vous sentir en forme?',
        type: 'boolean',
        points: 1,
        defaultValue: false,
      },
    ],
    calculation: (values: number[]): number => {
      // Assumes 'values' contains 1 for 'true' (yes) and 0 for 'false' (no)
      // directly from the boolean criteria, as each is worth 1 point if true.
      return values.reduce((sum, value) => sum + value, 0);
    },
    interpretation: (score: number): ScoreInterpretation => {
      if (score >= 2) {
        return { level: 'high', text: `Score ${score}: Forte suspicion de dépendance à l'alcool.` };
      }
      return { level: 'low', text: `Score ${score}: Faible suspicion de dépendance à l'alcool.` };
    },
    source: 'Ewing JA. Detecting alcoholism: The CAGE questionnaire. JAMA. 1984.',
    moreInfoLink: 'https://www.mdcalc.com/calc/37/cage-questionnaire-alcohol-use',
    notes: 'Un score de 2 ou plus est considéré comme cliniquement significatif.',
  },
  // Adding Geriatric Depression Scale (GDS-15)
  {
    id: 'gds15',
    name: 'Échelle de Dépression Gériatrique (GDS-15)',
    shortName: 'GDS-15',
    category: Category.GERIA,
    description: "Outil de dépistage de la dépression chez les personnes âgées (version courte à 15 items).",
    criteria: [
      { id: 'gds1', name: '1. Êtes-vous satisfait(e) de votre vie ?', type: 'boolean', defaultValue: true }, // No = 1pt
      { id: 'gds2', name: '2. Avez-vous abandonné beaucoup de vos activités et intérêts ?', type: 'boolean', defaultValue: false }, // Yes = 1pt
      { id: 'gds3', name: '3. Sentez-vous que votre vie est vide ?', type: 'boolean', defaultValue: false }, // Yes = 1pt
      { id: 'gds4', name: '4. Vous ennuyez-vous souvent ?', type: 'boolean', defaultValue: false }, // Yes = 1pt
      { id: 'gds5', name: '5. Êtes-vous de bonne humeur la plupart du temps ?', type: 'boolean', defaultValue: true }, // No = 1pt
      { id: 'gds6', name: '6. Craignez-vous que quelque chose de mal vous arrive ?', type: 'boolean', defaultValue: false }, // Yes = 1pt
      { id: 'gds7', name: '7. Vous sentez-vous heureux(se) la plupart du temps ?', type: 'boolean', defaultValue: true }, // No = 1pt
      { id: 'gds8', name: '8. Vous sentez-vous souvent impuissant(e) ou abandonné(e) ?', type: 'boolean', defaultValue: false }, // Yes = 1pt
      { id: 'gds9', name: '9. Préférez-vous rester à la maison plutôt que de sortir ?', type: 'boolean', defaultValue: false }, // Yes = 1pt
      { id: 'gds10', name: '10. Pensez-vous avoir plus de problèmes de mémoire que les autres ?', type: 'boolean', defaultValue: false }, // Yes = 1pt
      { id: 'gds11', name: '11. Pensez-vous qu\'il est merveilleux d\'être en vie maintenant ?', type: 'boolean', defaultValue: true }, // No = 1pt
      { id: 'gds12', name: '12. Vous sentez-vous plutôt inutile dans votre situation actuelle ?', type: 'boolean', defaultValue: false }, // Yes = 1pt
      { id: 'gds13', name: '13. Vous sentez-vous plein(e) d\'énergie ?', type: 'boolean', defaultValue: true }, // No = 1pt
      { id: 'gds14', name: '14. Pensez-vous que votre situation est désespérée ?', type: 'boolean', defaultValue: false }, // Yes = 1pt
      { id: 'gds15', name: '15. Pensez-vous que la plupart des gens sont mieux lotis que vous ?', type: 'boolean', defaultValue: false } // Yes = 1pt
    ],
    calculation: (values: number[]): number => {
      // For GDS-15, the 'values' array contains the direct boolean input (0 or 1).
      // We need to apply the scoring logic here:
      // 1 point for 'No' on questions 1, 5, 7, 11, 13 (indices 0, 4, 6, 10, 12)
      // 1 point for 'Yes' on other questions
      let score = 0;
      const noResponseScoresPointIndices = [0, 4, 6, 10, 12]; 
      
      values.forEach((value, index) => { // value is 0 for false/No, 1 for true/Yes
        if (noResponseScoresPointIndices.includes(index)) {
          if (value === 0) { // Answer was 'No' to a question where 'No' is symptomatic
            score++;
          }
        } else { // For questions where 'Yes' is symptomatic
          if (value === 1) { // Answer was 'Yes'
            score++;
          }
        }
      });
      return score;
    },
    interpretation: (score: number): ScoreInterpretation => {
      if (score <= 4) return { level: 'normal', text: `Score ${score}: Normal (0-4). Pas de dépression.` };
      if (score <= 8) return { level: 'low', text: `Score ${score}: Dépression légère (5-8).` }; // Using 'low' for mild
      if (score <= 11) return { level: 'moderate', text: `Score ${score}: Dépression modérée (9-11).` };
      return { level: 'severe', text: `Score ${score}: Dépression sévère (12-15).` };
    },
    source: 'Yesavage JA, Brink TL, Rose TL, et al. Development and validation of a geriatric depression screening scale: A preliminary report. J Psychiatr Res. 1982-1983.',
    moreInfoLink: 'https://www.mdcalc.com/calc/106/geriatric-depression-scale-gds-15',
    notes: 'GDS-15: 1 point pour chaque réponse indiquant la dépression. Certaines questions sont inversées.',
  },  // Adding SPESI (Simplified Pulmonary Embolism Severity Index) - MINIMAL
  {
    id: 'spesi',
    name: 'Score SPESI',
    shortName: 'sPESI',
    category: Category.URGENCE,
    description: "Risque mortalité EP aiguë à 30j.",
    criteria: [
      { id: 'age_gt_80', name: 'Âge > 80 ans', type: 'boolean', points: 1, defaultValue: false },
      { id: 'history_cancer', name: 'ATCD Cancer', type: 'boolean', points: 1, defaultValue: false },
      { id: 'history_chronic_cardiopulmonary', name: 'ATCD Maladie cardiopulmonaire chronique', type: 'boolean', points: 1, defaultValue: false },
      { id: 'hr_ge_110', name: 'FC ≥ 110/min', type: 'boolean', points: 1, defaultValue: false },
      { id: 'sbp_lt_100', name: 'PAS < 100 mmHg', type: 'boolean', points: 1, defaultValue: false },
      { id: 'sao2_lt_90', name: 'SaO2 < 90%', type: 'boolean', points: 1, defaultValue: false },
    ],
    calculation: (values: number[]): number => {
      // Assumes 'values' contains 1 for 'true' and 0 for 'false'
      // directly from the boolean criteria, as each is worth 1 point if true.
      return values.reduce((sum, value) => sum + value, 0);
    },
    interpretation: (score: number): ScoreInterpretation => {
      if (score === 0) return { level: 'low', text: `Score ${score}: Risque faible.` };
      return { level: 'high', text: `Score ${score}: Risque élevé.` };
    },
    source: 'Jiménez D, Aujesky D, Moores L, et al. Simplification of the Pulmonary Embolism Severity Index for prognostication in patients with acute symptomatic pulmonary embolism. Arch Intern Med. 2010.',
    moreInfoLink: 'https://www.mdcalc.com/calc/1938/spesi-simplified-pulmonary-embolism-severity-index',
    notes: 'Score de 0 à 6. Un score de 0 est associé à un risque faible de mortalité.',
  }
];