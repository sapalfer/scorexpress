// src/data/scores_by_category/pneumo.ts
import { Score, Category, ScoreInterpretation } from '../score_types';
import { createCalculationFunction } from '../score_helpers';

export const pneumoScores: Score[] = [
  {
    id: 'crb65',
    name: 'Score CRB-65',
    shortName: 'CRB-65',
    category: Category.PNEUMO,
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
    calculation: createCalculationFunction,
    interpretation: (score: number): ScoreInterpretation => {
      if (score === 0) return { level: 'low', text: 'Risque faible (Mortalité 0.6-1.2%). Traitement ambulatoire.' };
      if (score === 1) return { level: 'moderate', text: 'Risque modéré (Mortalité 5.2-8.5%). Hospitalisation à considérer.' };
      if (score === 2) return { level: 'moderate', text: 'Risque modéré (Mortalité 12%). Hospitalisation habituelle.' };
      if (score >= 3) return { level: 'high', text: 'Risque élevé (Mortalité 31-40%). Hospitalisation urgente, considérer USI si score 4.' };
      return { level: 'severe', text: 'Score inattendu. Vérifier les données.' };
    },
    source: 'Lim WS, van der Eerden MM, Laing R, et al. Defining community acquired pneumonia severity on presentation to hospital: an international derivation and validation study. Thorax. 2003 May;58(5):377-82.',
    moreInfoLink: 'https://www.mdcalc.com/calc/44/crb-65-score',
    notes: 'Un point pour chaque critère présent. Score maximum de 4.',
  }
,
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
      return { level: 'severe', text: 'Score inattendu. Vérifier les données.' }; // Fallback
    },
    source: 'Wells PS, Anderson DR, Rodger M, et al. Derivation of a simple clinical model to categorize patients probability of pulmonary embolism: increasing the models utility with the SimpliRED D-dimer. Thromb Haemost. 2000 Mar;83(3):416-20.',
    moreInfoLink: 'https://www.mdcalc.com/calc/130/wells-criteria-pulmonary-embolism',
    notes: 'Plusieurs versions existent. Les points pour certains critères peuvent varier (ex: 1.5 vs 1). La version présentée est commune. Score maximum 12.5.',
  }
,
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
        type: 'boolean',
        points: 1,
        defaultValue: false,
        unit: 'mmol/L ou mg/dL'
      },
      { id: 'respiratory_rate_ge_30', name: 'Fréquence respiratoire ≥ 30/min', type: 'boolean', points: 1, defaultValue: false }, // Corrected id to avoid conflict if another score uses 'respiratory_rate'
      { id: 'blood_pressure_curb', name: 'Pression artérielle systolique < 90 mmHg OU diastolique ≤ 60 mmHg', type: 'boolean', points: 1, defaultValue: false }, // Corrected id
      { id: 'age_ge_65_curb', name: 'Âge ≥ 65 ans', type: 'boolean', points: 1, defaultValue: false }, // Corrected id
    ],
    calculation: createCalculationFunction,
    interpretation: (score: number): ScoreInterpretation => {
      if (score <= 1) return { level: 'low', text: 'Mortalité faible (Score 0-1). Traitement ambulatoire.' };
      if (score === 2) return { level: 'moderate', text: 'Mortalité modérée (Score 2). Hospitalisation à considérer.' };
      if (score >= 3) return { level: 'high', text: 'Mortalité élevée (Score 3-5). Hospitalisation urgente, USI si score 4-5.' };
      return { level: 'severe', text: 'Score inattendu. Vérifier les données.' };
    },
    source: 'Lim WS, van der Eerden MM, Laing R, et al. Defining community acquired pneumonia severity on presentation to hospital: an international derivation and validation study. Thorax. 2003 May;58(5):377-82.',
    moreInfoLink: 'https://www.mdcalc.com/calc/334/curb-65-score-pneumonia-severity',
    notes: 'Score de 0 à 5. Le critère "Confusion" peut être évalué par un score AMTS (Abbreviated Mental Test Score) ≤ 8 ou une désorientation nouvelle dans le temps, le lieu ou la personne.',
  }
,
  {
    id: 'mmrc',
    name: 'Échelle de dyspnée mMRC (Modified Medical Research Council)',
    shortName: 'mMRC',
    category: Category.PNEUMO,
    description: "Évalue le degré de dyspnée lié à l'effort chez les patients atteints de maladies respiratoires.",
    criteria: [
      {
        id: 'dyspnea_grade_mmrc',
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
    calculation: createCalculationFunction,
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
  }
];
