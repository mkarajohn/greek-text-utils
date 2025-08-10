import { type ReplacementMap } from '../types.js';

// Reverse mapping for ISO 843 / ELOT 743 Type 1 (Latin -> Greek)
// Ordered longest-first to avoid ambiguity during replacement
const iso843Type1ReverseMap: ReplacementMap[] = [
  // Trigraphs
  { find: 'NCH', replace: 'ΓΧ' },
  { find: 'Nch', replace: 'Γχ' },
  { find: 'nch', replace: 'γχ' },

  // Digraph clusters
  { find: 'NX', replace: 'ΓΞ' },
  { find: 'Nx', replace: 'Γξ' },
  { find: 'nx', replace: 'γξ' },

  { find: 'NG', replace: 'ΓΓ' },
  { find: 'Ng', replace: 'Γγ' },
  { find: 'ng', replace: 'γγ' },

  { find: 'GK', replace: 'ΓΚ' },
  { find: 'Gk', replace: 'Γκ' },
  { find: 'gk', replace: 'γκ' },

  { find: 'NT', replace: 'ΝΤ' },
  { find: 'Nt', replace: 'Ντ' },
  { find: 'nt', replace: 'ντ' },

  { find: 'TS', replace: 'ΤΣ' },
  { find: 'Ts', replace: 'Τς' },
  { find: 'ts', replace: 'τσ' },

  { find: 'TZ', replace: 'ΤΖ' },
  { find: 'Tz', replace: 'Τζ' },
  { find: 'tz', replace: 'τζ' },

  // Vowel digraphs (fixed in Type 1)
  { find: 'AI', replace: 'ΑΙ' },
  { find: 'Ai', replace: 'Αι' },
  { find: 'ai', replace: 'αι' },

  { find: 'EI', replace: 'ΕΙ' },
  { find: 'Ei', replace: 'Ει' },
  { find: 'ei', replace: 'ει' },

  { find: 'OI', replace: 'ΟΙ' },
  { find: 'Oi', replace: 'Οι' },
  { find: 'oi', replace: 'οι' },

  { find: 'OU', replace: 'ΟΥ' },
  { find: 'Ou', replace: 'Ου' },
  { find: 'ou', replace: 'ου' },

  // Type 1 fixed digraphs (no context sensitivity)
  { find: 'AU', replace: 'Αυ' },
  { find: 'Au', replace: 'Αυ' },
  { find: 'au', replace: 'αυ' },

  { find: 'EU', replace: 'Ευ' },
  { find: 'Eu', replace: 'Ευ' },
  { find: 'eu', replace: 'ευ' },

  { find: 'IY', replace: 'Ηυ' },
  { find: 'Iy', replace: 'Ηυ' },
  { find: 'iy', replace: 'ηυ' },

  { find: 'MP', replace: 'ΜΠ' },
  { find: 'Mp', replace: 'Μπ' },
  { find: 'mp', replace: 'μπ' },

  // Multi-letter single phonemes
  { find: 'TH', replace: 'Θ' },
  { find: 'Th', replace: 'Θ' },
  { find: 'th', replace: 'θ' },

  { find: 'CH', replace: 'Χ' },
  { find: 'Ch', replace: 'Χ' },
  { find: 'ch', replace: 'χ' },

  { find: 'PS', replace: 'Ψ' },
  { find: 'Ps', replace: 'Ψ' },
  { find: 'ps', replace: 'ψ' },

  // Single letters (Latin Type 1)
  { find: 'A', replace: 'Α' },
  { find: 'a', replace: 'α' },
  { find: 'V', replace: 'Β' },
  { find: 'v', replace: 'β' },
  { find: 'G', replace: 'Γ' },
  { find: 'g', replace: 'γ' },
  { find: 'D', replace: 'Δ' },
  { find: 'd', replace: 'δ' },
  { find: 'E', replace: 'Ε' },
  { find: 'e', replace: 'ε' },
  { find: 'Z', replace: 'Ζ' },
  { find: 'z', replace: 'ζ' },
  { find: 'I', replace: 'Ι' },
  { find: 'i', replace: 'ι' },
  { find: 'K', replace: 'Κ' },
  { find: 'k', replace: 'κ' },
  { find: 'L', replace: 'Λ' },
  { find: 'l', replace: 'λ' },
  { find: 'M', replace: 'Μ' },
  { find: 'm', replace: 'μ' },
  { find: 'N', replace: 'Ν' },
  { find: 'n', replace: 'ν' },
  { find: 'X', replace: 'Ξ' },
  { find: 'x', replace: 'ξ' },
  { find: 'O', replace: 'Ο' },
  { find: 'o', replace: 'ο' },
  { find: 'P', replace: 'Π' },
  { find: 'p', replace: 'π' },
  { find: 'R', replace: 'Ρ' },
  { find: 'r', replace: 'ρ' },
  { find: 'S', replace: 'Σ' },
  { find: 's', replace: 'σ' },
  { find: 'T', replace: 'Τ' },
  { find: 't', replace: 'τ' },
  { find: 'Y', replace: 'Υ' },
  { find: 'y', replace: 'υ' },
  { find: 'F', replace: 'Φ' },
  { find: 'f', replace: 'φ' },
  { find: 'H', replace: 'Η' },
  { find: 'h', replace: 'η' },
  { find: 'W', replace: 'Ω' },
  { find: 'w', replace: 'ω' },
];

export default iso843Type1ReverseMap;
