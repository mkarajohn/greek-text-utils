import { describe, expect, it } from 'vitest';
import greekUtils from '../src/index.js';

describe('toPhoneticLatin', () => {
  it('handles αυ/ευ/ηυ context and clusters per phonetic map', () => {
    expect(greekUtils.toPhoneticLatin('αυτός')).toBe('aftós'); // stressed ó preserved by map
    expect(greekUtils.toPhoneticLatin('ευαγγέλιο')).toBe('evaggélio'); // accent preserved on é
    expect(greekUtils.toPhoneticLatin('ηύρηκα')).toBe('ífrika'); // full mapped form per current map
  });

  it('handles sentences and ignore characters', () => {
    expect(greekUtils.toPhoneticLatin('Εύηχο: αυτό που ακούγεται ωραία.')).toBe(
      'Évikho: aftó pou akoúyete oréa.'
    );

    expect(greekUtils.toPhoneticLatin('Εύηχο: αυτό που ακούγεται ωραία.', 'χ')).toBe(
      'Éviχo: aftó pou akoúyete oréa.'
    );
  });
});
