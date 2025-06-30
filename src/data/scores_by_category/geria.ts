// src/data/scores_by_category/geria.ts
import { Score, Category, ScoreInterpretation } from '../score_types.ts';
// Note: GDS-15 has a custom calculation logic, so createCalculationFunction might not be directly used if it's too generic.

export const geriaScores: Score[] = [
  {
    id: 'iadl',
    name: 'Échelle d\'Autonomie Instrumentale (IADL de Lawton)',
    shortName: 'IADL',
    category: Category.GERIA,
    description: "Évalue la capacité d'une personne âgée à effectuer les activités instrumentales de la vie quotidienne, nécessaires pour vivre de façon autonome à domicile.",
    criteria: [
      { 
        id: 'telephone', 
        name: 'Capacité à utiliser le téléphone', 
        type: 'select', 
        options: [
          { value: 1, label: '1 - Utilise le téléphone de sa propre initiative, cherche et compose les numéros' },
          { value: 1, label: '1 - Compose un petit nombre de numéros bien connus' },
          { value: 1, label: '1 - Répond au téléphone mais ne compose pas les numéros' },
          { value: 0, label: '0 - N\'utilise pas du tout le téléphone' }
        ],
        defaultValue: 1
      },
      { 
        id: 'shopping', 
        name: 'Faire les courses', 
        type: 'select', 
        options: [
          { value: 1, label: '1 - Fait toutes les courses de façon indépendante' },
          { value: 0, label: '0 - Fait quelques courses mais pas toutes de façon indépendante' },
          { value: 0, label: '0 - A besoin d\'être accompagné(e) pour faire les courses' },
          { value: 0, label: '0 - Incapable de faire les courses' }
        ],
        defaultValue: 1
      },
      { 
        id: 'cooking', 
        name: 'Préparation des repas', 
        type: 'select', 
        options: [
          { value: 1, label: '1 - Planifie, prépare et sert des repas adéquats de façon indépendante' },
          { value: 0, label: '0 - Prépare des repas adéquats si les ingrédients sont fournis' },
          { value: 0, label: '0 - Réchauffe et sert des repas préparés ou prépare des repas inadéquats' },
          { value: 0, label: '0 - A besoin qu\'on lui prépare et serve les repas' }
        ],
        defaultValue: 1
      },
      { 
        id: 'housekeeping', 
        name: 'Entretien ménager', 
        type: 'select', 
        options: [
          { value: 1, label: '1 - Entretient la maison seul(e) ou avec une aide occasionnelle' },
          { value: 1, label: '1 - Effectue des tâches quotidiennes légères comme faire la vaisselle, faire le lit' },
          { value: 1, label: '1 - Effectue des tâches légères mais ne peut pas maintenir un niveau adéquat de propreté' },
          { value: 0, label: '0 - A besoin d\'aide pour toutes les tâches d\'entretien ménager' },
          { value: 0, label: '0 - Ne participe à aucune tâche ménagère' }
        ],
        defaultValue: 1
      },
      { 
        id: 'laundry', 
        name: 'Lessive', 
        type: 'select', 
        options: [
          { value: 1, label: '1 - Fait toute sa lessive personnelle' },
          { value: 1, label: '1 - Lave les petits articles' },
          { value: 0, label: '0 - Toute la lessive doit être faite par d\'autres' }
        ],
        defaultValue: 1
      },
      { 
        id: 'transport', 
        name: 'Mode de transport', 
        type: 'select', 
        options: [
          { value: 1, label: '1 - Voyage seul(e) en utilisant les transports en commun, le taxi, ou conduit sa propre voiture' },
          { value: 1, label: '1 - Organise ses déplacements en taxi, mais n\'utilise pas les transports en commun' },
          { value: 1, label: '1 - Voyage en transports en commun accompagné(e)' },
          { value: 0, label: '0 - Déplacements limités au taxi ou à la voiture, avec assistance' },
          { value: 0, label: '0 - Ne se déplace pas du tout' }
        ],
        defaultValue: 1
      },
      { 
        id: 'medication', 
        name: 'Responsabilité pour la prise des médicaments', 
        type: 'select', 
        options: [
          { value: 1, label: '1 - Est responsable de la prise de médicaments (doses et horaires corrects)' },
          { value: 0, label: '0 - Est responsable si les médicaments sont préparés à l\'avance en doses séparées' },
          { value: 0, label: '0 - N\'est pas capable de prendre correctement ses médicaments' }
        ],
        defaultValue: 1
      },
      { 
        id: 'finances', 
        name: 'Capacité à gérer son budget', 
        type: 'select', 
        options: [
          { value: 1, label: '1 - Gère ses finances de manière autonome (budget, chèques, factures, loyer, va à la banque)' },
          { value: 1, label: '1 - Gère les achats quotidiens mais a besoin d\'aide pour la banque ou les achats importants' },
          { value: 0, label: '0 - Incapable de gérer l\'argent' }
        ],
        defaultValue: 1
      }
    ],
    calculation: (values: number[]): number => {
      // Sum all values (which are 0 or 1 for each criteria)
      return values.reduce((total, val) => total + val, 0);
    },
    interpretation: (score: number): ScoreInterpretation => {
      if (score === 8) return { level: 'normal', text: 'Score 8/8: Autonomie complète pour les activités instrumentales.' };
      if (score >= 6) return { level: 'low', text: `Score ${score}/8: Autonomie légèrement diminuée.` };
      if (score >= 4) return { level: 'moderate', text: `Score ${score}/8: Autonomie modérément diminuée.` };
      if (score >= 2) return { level: 'high', text: `Score ${score}/8: Autonomie sévèrement diminuée.` };
      return { level: 'severe', text: `Score ${score}/8: Dépendance quasi-totale pour les activités instrumentales.` };
    },
    source: 'Lawton MP, Brody EM. Assessment of older people: self-maintaining and instrumental activities of daily living. Gerontologist. 1969;9(3):179-186.',
    moreInfoLink: 'https://consultgeri.org/try-this/general-assessment/issue-23.pdf',
    notes: "L'échelle IADL complète l'échelle ADL en évaluant des activités plus complexes nécessaires à l'autonomie à domicile. Le score maximal est de 8 points pour les femmes et peut être inférieur chez les hommes selon les contextes culturels (certains items peuvent être non applicables)."
  },
  {
    id: 'gds15',
    name: 'Échelle de Dépression Gériatrique (GDS-15)',
    shortName: 'GDS-15',
    category: Category.GERIA,
    description: "Outil de dépistage de la dépression chez les personnes âgées (version courte à 15 items).",
    criteria: [
      // For boolean questions, 'true' means 'Yes', 'false' means 'No'. Points are assigned based on the symptomatic answer.
      { id: 'gds1_satisfied', name: '1. Êtes-vous globalement satisfait(e) de votre vie ?', type: 'boolean', defaultValue: true, description: 'Non = 1 pt' },
      { id: 'gds2_abandoned_activities', name: '2. Avez-vous abandonné beaucoup de vos activités et intérêts ?', type: 'boolean', defaultValue: false, description: 'Oui = 1 pt' },
      { id: 'gds3_life_empty', name: '3. Sentez-vous que votre vie est vide ?', type: 'boolean', defaultValue: false, description: 'Oui = 1 pt' },
      { id: 'gds4_often_bored', name: '4. Vous ennuyez-vous souvent ?', type: 'boolean', defaultValue: false, description: 'Oui = 1 pt' },
      { id: 'gds5_good_spirits', name: '5. Êtes-vous de bonne humeur la plupart du temps ?', type: 'boolean', defaultValue: true, description: 'Non = 1 pt' },
      { id: 'gds6_afraid_bad_happening', name: '6. Craignez-vous que quelque chose de mal vous arrive ?', type: 'boolean', defaultValue: false, description: 'Oui = 1 pt' },
      { id: 'gds7_mostly_happy', name: '7. Vous sentez-vous heureux(se) la plupart du temps ?', type: 'boolean', defaultValue: true, description: 'Non = 1 pt' },
      { id: 'gds8_often_helpless', name: '8. Vous sentez-vous souvent impuissant(e) ou abandonné(e) ?', type: 'boolean', defaultValue: false, description: 'Oui = 1 pt' },
      { id: 'gds9_prefer_stay_home', name: '9. Préférez-vous rester à la maison plutôt que de sortir et faire de nouvelles choses ?', type: 'boolean', defaultValue: false, description: 'Oui = 1 pt' },
      { id: 'gds10_memory_problems', name: '10. Pensez-vous avoir plus de problèmes de mémoire que la plupart des gens ?', type: 'boolean', defaultValue: false, description: 'Oui = 1 pt' },
      { id: 'gds11_wonderful_to_be_alive', name: '11. Pensez-vous qu\'il est merveilleux d\'être en vie maintenant ?', type: 'boolean', defaultValue: true, description: 'Non = 1 pt' },
      { id: 'gds12_worthless', name: '12. Vous sentez-vous plutôt inutile dans votre situation actuelle ?', type: 'boolean', defaultValue: false, description: 'Oui = 1 pt' },
      { id: 'gds13_full_of_energy', name: '13. Vous sentez-vous plein(e) d\'énergie ?', type: 'boolean', defaultValue: true, description: 'Non = 1 pt' },
      { id: 'gds14_situation_hopeless', name: '14. Pensez-vous que votre situation est désespérée ?', type: 'boolean', defaultValue: false, description: 'Oui = 1 pt' },
      { id: 'gds15_others_better_off', name: '15. Pensez-vous que la plupart des gens sont mieux lotis que vous ?', type: 'boolean', defaultValue: false, description: 'Oui = 1 pt' }
    ],
    calculation: (values: (boolean | number)[]): number => {
      let score = 0;
      const symptomaticAnswers = [
        false, // Q1: No is symptomatic
        true,  // Q2: Yes is symptomatic
        true,  // Q3: Yes is symptomatic
        true,  // Q4: Yes is symptomatic
        false, // Q5: No is symptomatic
        true,  // Q6: Yes is symptomatic
        false, // Q7: No is symptomatic
        true,  // Q8: Yes is symptomatic
        true,  // Q9: Yes is symptomatic
        true,  // Q10: Yes is symptomatic
        false, // Q11: No is symptomatic
        true,  // Q12: Yes is symptomatic
        false, // Q13: No is symptomatic
        true,  // Q14: Yes is symptomatic
        true   // Q15: Yes is symptomatic
      ];
      values.forEach((value, index) => {
        // Assuming boolean values are passed directly from UI: true for 'Yes', false for 'No'
        if (value === symptomaticAnswers[index]) {
          score++;
        }
      });
      return score;
    },
    interpretation: (score: number): ScoreInterpretation => {
      if (score >= 0 && score <= 4) return { level: 'normal', text: `Score ${score} (0-4): Normal, pas de dépression suggérée.` };
      if (score >= 5 && score <= 8) return { level: 'low', text: `Score ${score} (5-8): Dépression légère suggérée.` }; // 'low' for mild
      if (score >= 9 && score <= 11) return { level: 'moderate', text: `Score ${score} (9-11): Dépression modérée suggérée.` };
      if (score >= 12 && score <= 15) return { level: 'severe', text: `Score ${score} (12-15): Dépression sévère suggérée.` };
      return { level: 'abnormal', text: 'Score inattendu. Vérifier les données.' }; // Fallback
    },
    source: 'Yesavage JA, Brink TL, Rose TL, et al. Development and validation of a geriatric depression screening scale: A preliminary report. J Psychiatr Res. 1982-1983;17(1):37-49.',
    moreInfoLink: 'https://www.mdcalc.com/calc/106/geriatric-depression-scale-gds-15',
    notes: 'Chaque réponse correspondant à une humeur dépressive vaut 1 point. Un score total > 5 suggère une dépression et justifie une évaluation plus approfondie.',
  },
  {
    id: 'adl_katz',
    name: 'Indice de Katz - Activités de la Vie Quotidienne (ADL)',
    shortName: 'ADL (Katz)',
    category: Category.GERIA,
    description: "Évalue le niveau de dépendance d'une personne pour les activités de base de la vie quotidienne (se laver, s'habiller, se déplacer, etc.).",
    criteria: [
      { id: 'bathing', name: 'Se laver (Bain / Douche)', type: 'select', options: [{ value: 1, label: 'Indépendant' }, { value: 0, label: 'Dépendant' }], defaultValue: 0, description: 'Prend son bain sans aide, ou avec une aide pour une seule partie du corps.' },
      { id: 'dressing', name: 'S\'habiller', type: 'select', options: [{ value: 1, label: 'Indépendant' }, { value: 0, label: 'Dépendant' }], defaultValue: 0, description: 'Prend ses vêtements et s\'habille complètement sans aide.' },
      { id: 'toileting', name: 'Aller aux toilettes', type: 'select', options: [{ value: 1, label: 'Indépendant' }, { value: 0, label: 'Dépendant' }], defaultValue: 0, description: 'Va aux toilettes, s\'essuie et s\'arrange sans aide.' },
      { id: 'transferring', name: 'Se déplacer (Transfert)', type: 'select', options: [{ value: 1, label: 'Indépendant' }, { value: 0, label: 'Dépendant' }], defaultValue: 0, description: 'Passe du lit au fauteuil et inversement sans aide.' },
      { id: 'continence', name: 'Continence', type: 'select', options: [{ value: 1, label: 'Indépendant' }, { value: 0, label: 'Dépendant' }], defaultValue: 0, description: 'Contrôle complet des sphincters urinaire et anal.' },
      { id: 'feeding', name: 'S\'alimenter', type: 'select', options: [{ value: 1, label: 'Indépendant' }, { value: 0, label: 'Dépendant' }], defaultValue: 0, description: 'Porte la nourriture du plat à la bouche sans aide (couper la viande et beurrer le pain sont exclus).' }
    ],
    calculation: (values: number[]): number => {
      return values.reduce((total, val) => total + val, 0);
    },
    interpretation: (score: number): ScoreInterpretation => {
      if (score === 6) return { level: 'normal', text: `Score ${score}/6 : Indépendant pour toutes les activités.` };
      if (score >= 3 && score <= 5) return { level: 'moderate', text: `Score ${score}/6 : Dépendance modérée.` };
      if (score >= 0 && score <= 2) return { level: 'severe', text: `Score ${score}/6 : Dépendance sévère.` };
      return { level: 'abnormal', text: 'Score inattendu.' };
    },
    source: 'Katz S, Ford AB, Moskowitz RW, Jackson BA, Jaffe MW. Studies of illness in the aged. The index of ADL: a standardized measure of biological and psychosocial function. JAMA. 1963;185:914-919.',
    moreInfoLink: 'https://www.mdcalc.com/calc/338/katz-index-independence-activities-daily-living-adl',
    notes: 'Un score plus bas indique un plus grand degré de dépendance. Cet indice est très utilisé en gériatrie pour évaluer l\'autonomie des patients.'
  }
];
