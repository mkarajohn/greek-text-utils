import { describe, expect, it } from 'vitest';
import greekUtils from '../src/index.js';

describe('toGreeklish', () => {
  it('converts modern Greek to greeklish (basic letters and clusters, no accents)', () => {
    const cases = [
      { in: 'χαρτης', out: 'xarths' }, // χ->x, η->h, ς->s
      { in: 'ουρανος', out: 'ouranos' }, // ου->ou
      { in: 'μπαλτα', out: 'balta' }, // μπ->b
      { in: 'ψαρι', out: 'psari' }, // ψ->ps
      { in: 'θρησκεια', out: '8rhskeia' }, // includes 'eia' for 'εια'
    ];
    cases.forEach(({ in: input, out }) => {
      expect(greekUtils.toGreeklish(input)).toBe(out);
    });
  });

  it('handles sentences, accents and ignore characters', () => {
    expect(greekUtils.toGreeklish('Το κάλλος είναι η καλύτερη συστατική επιστολή')).toBe(
      'To kάllos eίnai h kalύterh systatikή epistolή'
    );

    expect(greekUtils.toGreeklish('καλημερα, πως ειστε;')).toBe('kalhmera, pws eiste;');
    expect(greekUtils.toGreeklish('Εύηχο: αυτό που ακούγεται ωραία.')).toBe(
      'Euhxo: autό pou akougetai wraίa.'
    );

    expect(greekUtils.toGreeklish('καλημερα, πως ειστε;', ';λ')).toBe('kaλhmera, pws eiste;');
  });
});
