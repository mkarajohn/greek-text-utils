import { describe, expect, it } from 'vitest';
import greekUtils from '../src/index.js';

describe('sanitizeDiacritics', () => {
  it('removes polytonic and monotonic diacritics', () => {
    const input = 'Ἀθήνα Ἑλλάς άέήίόύώ ϊΐ ϋΰ';
    const out = greekUtils.sanitizeDiacritics(input);
    expect(out).toBe('Αθηνα Ελλας αεηιουω ϊΐ ϋΰ');
  });
});
