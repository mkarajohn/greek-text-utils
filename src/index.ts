import diacriticsMap from './mappings/diacritics-map.js';
import greekTogreeklishMap from './mappings/greek-to-greeklish-map.js';
import greekToISO843Type1Map from './mappings/greek-to-iso843-type1-map.js';
import {
  greekCharacters,
  greekToISO843Type2Map,
  voicedCharacters,
} from './mappings/greek-to-iso843-type2-map.js';
import greekToPhoneticLatinMap from './mappings/greek-to-phonetic-latin-map.js';
import greekToTransliteratedLatinMap from './mappings/greek-to-transliterated-latin-map.js';
import greeklishToGreekMap from './mappings/greeklish-to-greek-map.js';
import iso843Type1ReverseMap from './mappings/iso843-type1-reverse-map.js';
import stopWordsMap from './mappings/stopwords-map.js';
import { type ReplacementMap } from './types.js';

/**
 * A collection of utilities for the Greek language such as replacement of accented and other diacritics characters,
 * conversion from Greek to phonetic, transliterated or greeklish Latin and more.
 */
const greekUtils = {
  /**
   * Convert a Latin/greeklish characters text to its modern Greek equivalent.
   */
  toGreek: (text: string, ignoreCharacters?: string): string => {
    return replaceText(text, greeklishToGreekMap, true, ignoreCharacters);
  },

  /**
   * Convert a modern Greek characters text to its greeklish equivalent.
   */
  toGreeklish: (text: string, ignoreCharacters?: string): string => {
    return replaceText(text, greekTogreeklishMap, true, ignoreCharacters);
  },

  /**
   * Convert a modern Greek characters text to its phonetically equivalent Latin (sound mapping).
   */
  toPhoneticLatin: (text: string, ignoreCharacters?: string): string => {
    return replaceText(text, greekToPhoneticLatinMap, true, ignoreCharacters);
  },

  /**
   * Convert a modern Greek characters text to its transliterated equivalent Latin (letter mapping).
   */
  toTransliteratedLatin: (text: string, ignoreCharacters?: string): string => {
    return replaceText(text, greekToTransliteratedLatinMap, true, ignoreCharacters);
  },

  /**
   * Convert a modern Greek characters text to its ISO 843/ELOT 743 Type 1 equivalent Latin.
   * Type 1 (Transliteration/μεταγραμματισμός): Simple, consistent, reversible character mapping.
   * Used for bibliographic references, catalogs, databases.
   */
  toISO843Type1: (text: string): string => {
    return convertToISO843Type1(text);
  },

  /**
   * Convert ISO 843/ELOT 743 Type 1 Latin text back to Greek (retransliteration per spec).
   * Applies final sigma (ς) at word ends as defined by the standard.
   */
  fromISO843Type1: (text: string): string => {
    return convertFromISO843Type1(text);
  },

  /**
   * Convert a modern Greek characters text to its ISO 843/ELOT 743 Type 2 equivalent Latin.
   * Type 2 (Transcription/μεταγραφή): Context-sensitive, pronunciation-based conversion.
   * Used for passports, ID cards, road signs, maps.
   */
  toISO843Type2: (text: string): string => {
    return convertToISO843Type2(text);
  },

  /**
   * Convert a modern Greek characters text to its ISO 843/ELOT 743 equivalent Latin.
   * This uses Type 2 (Transcription) for compatibility with government implementations.
   * @deprecated Use toISO843Type2() for explicit Type 2 or toISO843Type1() for Type 1
   */
  toISO843: (text: string): string => {
    return convertToISO843Type2(text);
  },

  /**
   * Convert a modern/ancient Greek characters text containing diacritics to its simple equivalent without diacritics.
   */
  sanitizeDiacritics: (text: string, ignoreCharacters?: string): string => {
    return replaceText(text, diacriticsMap, false, ignoreCharacters);
  },

  /**
   * Removes all Greek stop words from a text.
   */
  removeStopWords: (text: string, shouldRemoveMultipleWhiteSpaces: boolean = false): string => {
    const cleanText = replaceText(text, stopWordsMap, true, '', 'gi').trim();

    if (shouldRemoveMultipleWhiteSpaces === true) {
      return cleanText.replace(/\s{2,}/g, ' ');
    }

    return cleanText;
  },
};

// Private Functions
function replaceText(
  text: string,
  replacementMap: ReplacementMap[],
  isExactMatch: boolean = false,
  ignoreCharacters: string = '',
  regExOptions: string = 'g'
): string {
  let regexString: string;
  let regex: RegExp;

  if (typeof text === 'string' && text.length > 0) {
    replacementMap.forEach((replacementItem: ReplacementMap) => {
      if (isExactMatch) {
        regexString = replacementItem.find;
      } else {
        regexString = '[' + replacementItem.find + ']';
      }

      if (ignoreCharacters !== '') {
        regexString = '(?![' + ignoreCharacters + '])' + regexString;
      }

      regex = new RegExp(regexString, regExOptions);

      text = text.replace(regex, replacementItem.replace);
    });
  }

  return text;
}

function convertToISO843Type1(text: string): string {
  if (typeof text !== 'string' || text.length === 0) {
    return text;
  }

  return replaceText(text, greekToISO843Type1Map, true);
}

function convertFromISO843Type1(text: string): string {
  if (typeof text !== 'string' || text.length === 0) {
    return text;
  }

  let result = text;
  iso843Type1ReverseMap.forEach(({ find, replace }) => {
    const regex = new RegExp(find, 'g');
    result = result.replace(regex, replace);
  });

  // Final sigma at word end
  const greekLetterClass = 'Α-Ωα-ωΆΈΉΊΌΎΏΪΫάέήίόύώϊΐϋΰ';
  result = result.replace(new RegExp(`σ(?=($|[^${greekLetterClass}-]))`, 'g'), 'ς');

  return result;
}

function convertToISO843Type2(text: string): string {
  if (typeof text !== 'string' || text.length === 0) {
    return text;
  }

  const greekLettersInText = text
    .split('')
    .filter((char) => greekCharacters.has(char.toLowerCase()));
  const hasSpaces = text.includes(' ');
  const isAllUppercase =
    greekLettersInText.length > 1 &&
    !hasSpaces &&
    greekLettersInText.every((char) => char === char.toUpperCase());

  const contextSensitivePatterns = [
    { pattern: /αυ/gi, base: 'α', combinator: 'υ' },
    { pattern: /αύ/gi, base: 'α', combinator: 'ύ' },
    { pattern: /ευ/gi, base: 'ε', combinator: 'υ' },
    { pattern: /εύ/gi, base: 'ε', combinator: 'ύ' },
    { pattern: /ηυ/gi, base: 'η', combinator: 'υ' },
    { pattern: /ηύ/gi, base: 'η', combinator: 'ύ' },
    { pattern: /μπ/gi, base: 'μ', combinator: 'π' },
  ];

  // First, handle context-sensitive replacements
  contextSensitivePatterns.forEach(({ pattern, base, combinator }) => {
    text = text.replace(pattern, (match, index) => {
      const nextChar = text.charAt(index + match.length);

      if (base === 'μ' && combinator === 'π') {
        // μπ logic: mp if Greek letters both before AND after, b otherwise
        const prevChar = text.charAt(index - 1);
        const hasPrevGreek = greekCharacters.has(prevChar.toLowerCase());
        const hasNextGreek = greekCharacters.has(nextChar.toLowerCase());
        const replacement = hasPrevGreek && hasNextGreek ? 'mp' : 'b';
        return preserveCase(replacement, match);
      } else {
        // αυ/ευ/ηυ logic: v if followed by voiced, f if followed by voiceless
        const baseChar = base === 'α' ? 'a' : base === 'ε' ? 'e' : 'i';
        const secondChar = voicedCharacters.has(nextChar.toLowerCase()) ? 'v' : 'f';
        const replacement = baseChar + secondChar;
        return preserveCase(replacement, match);
      }
    });
  });

  // Then apply basic replacements using the mapping
  let result = replaceText(text, greekToISO843Type2Map, true);

  // If original was all uppercase, ensure multi-character replacements are also uppercase
  if (isAllUppercase) {
    result = result
      .replace(/Th/g, 'TH')
      .replace(/Ch/g, 'CH')
      .replace(/Ps/g, 'PS')
      .replace(/Nch/g, 'NCH')
      .replace(/Nx/g, 'NX');
  }

  return result;
}

function preserveCase(replacement: string, original: string): string {
  if (original.length === 0) return replacement;

  const isFirstUpper = original[0] === original[0].toUpperCase();
  const isAllUpper = original === original.toUpperCase();

  if (isAllUpper && original.length > 1) {
    return replacement.toUpperCase();
  } else if (isFirstUpper) {
    return replacement.charAt(0).toUpperCase() + replacement.slice(1).toLowerCase();
  } else {
    return replacement.toLowerCase();
  }
}

export default greekUtils;
