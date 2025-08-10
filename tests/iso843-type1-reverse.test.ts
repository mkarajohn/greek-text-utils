import { describe, expect, it } from 'vitest';
import greekUtils from '../src/index.js';

describe('ISO 843 Type 1 reverse (Latin -> Greek)', () => {
  describe('reverse-only mappings', () => {
    it('reconstructs Greek from Type 1 Latin', () => {
      const cases = [
        { in: 'theos', out: 'θεος' },
        { in: 'autos', out: 'αυτος' },
        { in: 'mpampas', out: 'μπαμπας' },
        { in: 'angelos', out: 'αγγελος' }, // ng -> γγ
        { in: 'lampa', out: 'λαμπα' },
        { in: 'pou', out: 'που' },
        { in: 'kai', out: 'και' },
        { in: 'oikos', out: 'οικος' },
        { in: 'gkala', out: 'γκαλα' },
        { in: 'enchos', out: 'εγχος' }, // nch -> γχ
        { in: 'enxos', out: 'εγξος' }, // nx -> γξ
      ];

      cases.forEach(({ in: input, out }) => {
        expect(greekUtils.fromISO843Type1(input)).toBe(out);
      });
    });

    it('handles uppercase digraphs and letters', () => {
      const cases = [
        { in: 'THEOS', out: 'ΘΕΟΣ' },
        { in: 'AI', out: 'ΑΙ' },
        { in: 'EI', out: 'ΕΙ' },
        { in: 'OI', out: 'ΟΙ' },
        { in: 'OU', out: 'ΟΥ' },
        { in: 'CHROMA', out: 'ΧΡΟΜΑ' },
        { in: 'PSALMOS', out: 'ΨΑΛΜΟΣ' },
      ];

      cases.forEach(({ in: input, out }) => {
        expect(greekUtils.fromISO843Type1(input)).toBe(out);
      });
    });
  });

  describe('round-trip (Greek -> Type1 -> Greek)', () => {
    it('round-trips words without diacritics', () => {
      const words = ['θεος', 'αυτος', 'μπαμπας', 'αγγελος', 'λαμπα', 'και', 'που', 'οικος'];

      words.forEach((w) => {
        const type1 = greekUtils.toISO843Type1(w);
        const back = greekUtils.fromISO843Type1(type1);
        expect(back).toBe(w);
      });
    });

    it('round-trips representative accented words by checking reversibility', () => {
      const accented = ['αυτός', 'ευχή', 'μπάλα', 'κομπιούτερ', 'Αθήνα', 'θεός', 'φιλοσοφία'];

      accented.forEach((w) => {
        const type1 = greekUtils.toISO843Type1(w);
        const back = greekUtils.fromISO843Type1(type1);
        // Ensure reversibility: forward(Type1 -> back) equals the original Type1 string
        expect(greekUtils.toISO843Type1(back)).toBe(type1);
      });
    });
  });

  describe('final sigma', () => {
    it('applies final sigma ς at word end', () => {
      const cases = [
        { in: 'theos', out: 'θεος' }, // ends with ς
        { in: 'asos', out: 'ασος' }, // final becomes ς
        { in: 'sasa', out: 'σασα' }, // interior stays σ
        { in: 'as-as', out: 'ασ-ας' }, // hyphen treated as word boundary
      ];
      cases.forEach(({ in: input, out }) => {
        expect(greekUtils.fromISO843Type1(input)).toBe(out);
      });
    });
  });
});
