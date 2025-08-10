import { describe, expect, it } from 'vitest';
import greekUtils from '../src/index.js';

describe('toGreek (greeklish to Greek)', () => {
  it('converts latinized greeklish sequences back to Greek', () => {
    const cases = [
      { in: 'theos', out: 'θεοσ' }, // current mapping does not convert to final sigma
      { in: 'tha', out: 'θα' },
      { in: '8a', out: 'θα' },
      { in: 'psari', out: 'ψαρι' },
      { in: 'CH', out: 'Χ' },
    ];
    cases.forEach(({ in: input, out }) => {
      expect(greekUtils.toGreek(input)).toBe(out);
    });
  });

  it('handles longer sentences and ignore characters', () => {
    expect(greekUtils.toGreek('To kallos einai h kalyterh systatikh epistolh')).toBe(
      'Το καλλοσ ειναι η καλυτερη συστατικη επιστολη'
    );

    expect(greekUtils.toGreek('kalhmera, pws eiste?')).toBe('καλημερα, πωσ ειστε?');
    expect(greekUtils.toGreek('kalhmera, pws eiste?', '?p')).toBe('καλημερα, pωσ ειστε?');
  });
});
