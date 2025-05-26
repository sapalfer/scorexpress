// src/data/scores_by_category/geria.ts
import { Score, Category, ScoreInterpretation } from '../score_types';
// Note: GDS-15 has a custom calculation logic, so createCalculationFunction might not be directly used if it's too generic.

export const geriaScores: Score[] = [
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
  }
];
