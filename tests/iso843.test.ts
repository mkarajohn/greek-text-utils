import { describe, expect, it } from 'vitest';
import greekUtils from '../src/index.js';

describe('ISO 843/ELOT 743 Implementation', () => {
  describe('Type 1 - Transliteration (μεταγραμματισμός)', () => {
    describe('Basic Character Mapping', () => {
      it('should transliterate simple characters consistently', () => {
        const testCases = [
          { input: 'α', expected: 'a' },
          { input: 'β', expected: 'v' },
          { input: 'γ', expected: 'g' },
          { input: 'θ', expected: 'th' },
          { input: 'χ', expected: 'ch' },
          { input: 'ψ', expected: 'ps' },
          { input: 'Θ', expected: 'TH' },
          { input: 'Χ', expected: 'CH' },
          { input: 'Ψ', expected: 'PS' },
        ];

        testCases.forEach(({ input, expected }) => {
          expect(greekUtils.toISO843Type1(input)).toBe(expected);
        });
      });

      it('should handle fixed digraphs without context sensitivity', () => {
        const testCases = [
          // Type 1: Always consistent mapping
          { input: 'αυ', expected: 'au' },
          { input: 'ευ', expected: 'eu' },
          { input: 'ηυ', expected: 'iy' },
          { input: 'μπ', expected: 'mp' },
          { input: 'ΑΥ', expected: 'AU' },
          { input: 'ΕΥ', expected: 'EU' },
          { input: 'ΗΥ', expected: 'IY' },
          { input: 'ΜΠ', expected: 'MP' },
          { input: 'Αυ', expected: 'Au' },
          { input: 'Ευ', expected: 'Eu' },
          { input: 'Ηυ', expected: 'Iy' },
          { input: 'Μπ', expected: 'Mp' },
        ];

        testCases.forEach(({ input, expected }) => {
          expect(greekUtils.toISO843Type1(input)).toBe(expected);
        });
      });

      it('should handle real Greek words with Type 1 rules', () => {
        const testCases = [
          { input: 'αυτός', expected: 'autos' }, // Always 'au' in Type 1
          { input: 'ευχή', expected: 'euchi' }, // Always 'eu' in Type 1
          { input: 'μπάλα', expected: 'mpala' }, // Always 'mp' in Type 1
          { input: 'κομπιούτερ', expected: 'kompiouter' },
          { input: 'Αθήνα', expected: 'Athina' },
          { input: 'θεός', expected: 'theos' },
          { input: 'φιλοσοφία', expected: 'filosofia' },
        ];

        testCases.forEach(({ input, expected }) => {
          expect(greekUtils.toISO843Type1(input)).toBe(expected);
        });
      });
    });
  });

  describe('Type 2 - Transcription (μεταγραφή)', () => {
    describe('Context-Sensitive Rules - αυ/ευ/ηυ', () => {
      it('should handle αυ combinations correctly', () => {
        const testCases = [
          { input: 'αυγό', expected: 'avgo' },
          { input: 'αυλή', expected: 'avli' },
          { input: 'αυθεντικός', expected: 'afthentikos' },
        ];

        testCases.forEach(({ input, expected }) => {
          expect(greekUtils.toISO843Type2(input)).toBe(expected);
        });
      });

      it('should handle ευ combinations correctly', () => {
        const testCases = [
          { input: 'ευγενής', expected: 'evgenis' },
          { input: 'ευρώπη', expected: 'evropi' },
          { input: 'ευκολία', expected: 'efkolia' },
        ];

        testCases.forEach(({ input, expected }) => {
          expect(greekUtils.toISO843Type2(input)).toBe(expected);
        });
      });

      it('should handle ηυ combinations correctly', () => {
        const testCases = [
          { input: 'αύριο', expected: 'avrio' },
          { input: 'εύκολος', expected: 'efkolos' },
          { input: 'ηύρηκα', expected: 'ivrika' },
        ];

        testCases.forEach(({ input, expected }) => {
          expect(greekUtils.toISO843Type2(input)).toBe(expected);
        });
      });
    });

    describe('Context-Sensitive Rules - μπ', () => {
      it('should handle μπ at beginning of words', () => {
        const testCases = [
          { input: 'μπίρα', expected: 'bira' },
          { input: 'μπουφάν', expected: 'boufan' },
          { input: 'μπαμπάς', expected: 'bampas' },
        ];

        testCases.forEach(({ input, expected }) => {
          expect(greekUtils.toISO843Type2(input)).toBe(expected);
        });
      });

      it('should handle μπ in middle of words', () => {
        const testCases = [
          { input: 'λάμπα', expected: 'lampa' },
          { input: 'κάμπος', expected: 'kampos' },
          { input: 'τάμπλετ', expected: 'tamplet' },
        ];

        testCases.forEach(({ input, expected }) => {
          expect(greekUtils.toISO843Type2(input)).toBe(expected);
        });
      });
    });

    describe('Real Greek Words', () => {
      it('should handle common Greek words correctly', () => {
        const testCases = [
          { input: 'Ελλάδα', expected: 'Ellada' },
          { input: 'Αθήνα', expected: 'Athina' },
          { input: 'Θεσσαλονίκη', expected: 'Thessaloniki' },
        ];

        testCases.forEach(({ input, expected }) => {
          expect(greekUtils.toISO843Type2(input)).toBe(expected);
        });
      });

      it('should handle everyday expressions', () => {
        const testCases = [
          { input: 'καλημέρα', expected: 'kalimera' },
          { input: 'ευχαριστώ', expected: 'efcharisto' },
          { input: 'παρακαλώ', expected: 'parakalo' },
        ];

        testCases.forEach(({ input, expected }) => {
          expect(greekUtils.toISO843Type2(input)).toBe(expected);
        });
      });
    });
  });

  describe('Backward Compatibility', () => {
    it('should maintain compatibility with legacy toISO843 function', () => {
      const testCases = [
        'αυτός',
        'ευχή',
        'μπάλα',
        'κομπιούτερ',
        'Αθήνα',
        'θεός',
        'Καλημέρα σας',
        'ΑΥΤΟΣ',
      ];

      testCases.forEach((input) => {
        // Legacy function should behave exactly like Type 2
        expect(greekUtils.toISO843(input)).toBe(greekUtils.toISO843Type2(input));
      });
    });
  });

  describe('Type Comparison', () => {
    it('should show differences between Type 1 and Type 2', () => {
      const comparisonCases = [
        // Type 1 vs Type 2 differences
        {
          input: 'αυτός',
          type1: 'autos', // Always 'au'
          type2: 'aftos', // Context-sensitive 'af'
        },
        {
          input: 'αυγό',
          type1: 'augo', // Always 'au'
          type2: 'avgo', // Context-sensitive 'av'
        },
        {
          input: 'ευχή',
          type1: 'euchi', // Always 'eu'
          type2: 'efchi', // Context-sensitive 'ef'
        },
        {
          input: 'ευγενής',
          type1: 'eugenis', // Always 'eu'
          type2: 'evgenis', // Context-sensitive 'ev'
        },
        {
          input: 'μπάλα',
          type1: 'mpala', // Always 'mp'
          type2: 'bala', // Context-sensitive 'b'
        },
        {
          input: 'κομπιούτερ',
          type1: 'kompiouter', // Always 'mp'
          type2: 'kompiouter', // Context-sensitive 'mp'
        },
      ];

      comparisonCases.forEach(({ input, type1, type2 }) => {
        expect(greekUtils.toISO843Type1(input)).toBe(type1);
        expect(greekUtils.toISO843Type2(input)).toBe(type2);
      });
    });
  });
});
