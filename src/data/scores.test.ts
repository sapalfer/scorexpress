import { describe, it, expect } from 'vitest';
import { scores } from './scores';
import type { Score } from '../types'; // Correct import for types

// Find the SOFA score object
const sofaScore = scores.find(score => score.id === 'sofa') as Score | undefined;

describe('SOFA Score', () => {
  if (!sofaScore) {
    it('SOFA score definition should exist', () => {
      // This test will fail if sofaScore is not found, highlighting a setup issue.
      expect(sofaScore).toBeDefined(); 
    });
    return; // Skip further tests if SOFA score is not found
  }

  describe('Calculation', () => {
    it('should correctly calculate the SOFA score based on criteria values', () => {
      const criteriaPointValues = [2, 1, 3, 1, 0, 4]; // Example: PaO2/FiO2, Platelets, Bilirubin, Hypotension, GCS, Creatinine points
      const expectedTotalScore = 11;
      expect(sofaScore.calculation(criteriaPointValues)).toBe(expectedTotalScore);
    });

    it('should return 0 if all criteria values are 0', () => {
      const criteriaPointValues = [0, 0, 0, 0, 0, 0];
      expect(sofaScore.calculation(criteriaPointValues)).toBe(0);
    });

    it('should correctly sum various point combinations', () => {
      expect(sofaScore.calculation([1,1,1,1,1,1])).toBe(6);
      expect(sofaScore.calculation([4,4,4,4,4,4])).toBe(24);
      expect(sofaScore.calculation([0,1,0,2,0,3])).toBe(6);
    });
  });

  describe('Interpretation', () => {
    it('should interpret score 0 as very_low mortality', () => {
      const score = 0;
      const interpretation = sofaScore.interpretation(score);
      expect(interpretation).toEqual({ level: 'very_low', text: `Score ${score}: Dysfonction d'organe minime ou absente.` });
    });

    it('should interpret score 1 as very_low mortality', () => {
      const score = 1;
      const interpretation = sofaScore.interpretation(score);
      expect(interpretation).toEqual({ level: 'very_low', text: `Score ${score}: Dysfonction d'organe minime ou absente.` });
    });

    it('should interpret score 2 as low mortality', () => {
      const score = 2;
      const interpretation = sofaScore.interpretation(score);
      expect(interpretation).toEqual({ level: 'low', text: `Score ${score}: Dysfonction d'organe légère. Mortalité généralement <10%.` });
    });

    it('should interpret score 6 as low mortality', () => {
      const score = 6;
      const interpretation = sofaScore.interpretation(score);
      expect(interpretation).toEqual({ level: 'low', text: `Score ${score}: Dysfonction d'organe légère. Mortalité généralement <10%.` });
    });

    it('should interpret score 7 as moderate mortality', () => {
      const score = 7;
      const interpretation = sofaScore.interpretation(score);
      expect(interpretation).toEqual({ level: 'moderate', text: `Score ${score}: Dysfonction d'organe modérée. Mortalité ~15-20%.` });
    });

    it('should interpret score 9 as moderate mortality', () => {
      const score = 9;
      const interpretation = sofaScore.interpretation(score);
      expect(interpretation).toEqual({ level: 'moderate', text: `Score ${score}: Dysfonction d'organe modérée. Mortalité ~15-20%.` });
    });

    it('should interpret score 10 as high mortality', () => {
      const score = 10;
      const interpretation = sofaScore.interpretation(score);
      expect(interpretation).toEqual({ level: 'high', text: `Score ${score}: Dysfonction d'organe sévère. Mortalité ~40-50%.` });
    });

    it('should interpret score 12 as high mortality', () => {
      const score = 12;
      const interpretation = sofaScore.interpretation(score);
      expect(interpretation).toEqual({ level: 'high', text: `Score ${score}: Dysfonction d'organe sévère. Mortalité ~40-50%.` });
    });

    it('should interpret score 13 as very_high mortality', () => {
      const score = 13;
      const interpretation = sofaScore.interpretation(score);
      expect(interpretation).toEqual({ level: 'very_high', text: `Score ${score}: Dysfonction d'organe très sévère. Mortalité ~50-60%.` });
    });

    it('should interpret score 15 as very_high mortality', () => {
      const score = 15;
      const interpretation = sofaScore.interpretation(score);
      expect(interpretation).toEqual({ level: 'very_high', text: `Score ${score}: Dysfonction d'organe très sévère. Mortalité ~50-60%.` });
    });

    it('should interpret score 16 as severe (critique) mortality', () => {
      const score = 16;
      const interpretation = sofaScore.interpretation(score);
      expect(interpretation).toEqual({ level: 'severe', text: `Score ${score}: Dysfonction d'organe critique. Mortalité >80-95%.` });
    });

    it('should interpret score 24 as severe (critique) mortality', () => {
      const score = 24;
      const interpretation = sofaScore.interpretation(score);
      expect(interpretation).toEqual({ level: 'severe', text: `Score ${score}: Dysfonction d'organe critique. Mortalité >80-95%.` });
    });
  });
});
