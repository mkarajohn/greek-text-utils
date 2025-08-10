import { describe, expect, it } from 'vitest';
import greekUtils from '../src/index.js';

describe('removeStopWords', () => {
  it('removes frequent stopwords', () => {
    const input = 'και εγώ θα παω στην Αθηνα, αλλα οχι σημερα';
    const out = greekUtils.removeStopWords(input, true);
    expect(out).not.toMatch(/\bκαι\b/);
    expect(out).not.toMatch(/\bθα\b/);
    expect(out).not.toMatch(/\bστην\b/);
  });

  it('cleans whitespace when flag is true', () => {
    const out = greekUtils.removeStopWords('και  θα   το  κανουμε', true);
    expect(out).toBe('κανουμε');
  });
});
