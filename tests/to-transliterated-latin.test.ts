import { describe, expect, it } from 'vitest';
import greekUtils from '../src/index.js';

describe('toTransliteratedLatin', () => {
  it('renders macrons/diacritics correctly', () => {
    const athina = greekUtils.toTransliteratedLatin('Ἀθήνα');
    // Expect presence of Th with acute on e (ḗ)
    expect(/Thḗn/i.test(athina)).toBe(true);
    expect(greekUtils.toTransliteratedLatin('ήλιος')).toBe('ḗlios');
    expect(greekUtils.toTransliteratedLatin('ψυχή')).toBe('psukhḗ');
  });

  it('handles sentences and ignore characters', () => {
    expect(greekUtils.toTransliteratedLatin('Εύηχο: αυτό που ακούγεται ωραία.')).toBe(
      'Eúēkho: autó pou akoúgetai ōraía.'
    );

    expect(greekUtils.toTransliteratedLatin('Εύηχο: αυτό που ακούγεται ωραία.', 'αύ')).toBe(
      'Eύēkho: αutó pou αkoύgetαi ōrαíα.'
    );
  });
});
