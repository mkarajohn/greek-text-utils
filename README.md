# Greek Text Utils

[![NPM](https://nodei.co/npm/greek-text-utils.png)](https://nodei.co/npm/greek-text-utils/)

A TypeScript library for Greek text processing.

- Convert between Greek and Greeklish
- Convert Greek to phonetic or transliterated Latin
- Convert Greek to ISO 843 / ELOT 743 (Type 1 and Type 2)
- Sanitize polytonic/monotonic diacritics
- Remove Greek stopwords (ancient and modern)

## Installation

```bash
npm install greek-text-utils
```

or with pnpm:

```bash
pnpm add greek-text-utils
```

## Usage

### ESM

```ts
import greekUtils from 'greek-text-utils';
```

### CommonJS

```js
const greekUtils = require('greek-text-utils');
```

## Methods

### toISO843Type1(text)

```ts
// Context-insensitive, letter-for-letter (except AI/EI/OI/OU)

greekUtils.toISO843Type1('αυτός'); // 'autos'
greekUtils.toISO843Type1('μπάλα'); // 'mpala'
greekUtils.toISO843Type1('κομπιούτερ'); // 'kompiouter'
```

When to use Type 1

- Library/catalog systems
- Databases where reversibility is preferred
- Academic/bibliographic references

### fromISO843Type1(text)

Reconstruct Greek text from Type 1 Latin. This follows the standard's re‑transliteration principles and applies final sigma (ς) at word ends.

```ts
// Basic reverse examples
greekUtils.fromISO843Type1('Athina'); // 'Αθηνα' (note: no accent)
greekUtils.fromISO843Type1('autos'); // 'αυτος'
greekUtils.fromISO843Type1('mpampas'); // 'μπαμπας'
greekUtils.fromISO843Type1('theos'); // 'θεος' (final ς)

// Round-trip stability at the Latin level (accents are not restored):
const t1 = greekUtils.toISO843Type1('Αθήνα'); // 'Athina'
const back = greekUtils.fromISO843Type1(t1); // 'Αθηνα'
greekUtils.toISO843Type1(back) === t1; // true
```

Notes:

- Type 1 is reversible at the Latin level. Diacritics are not restored when converting back to Greek.
- Some Greek vowels collapse in Type 1 (e.g., η/ι/υ → i). Reverse chooses a consistent Greek base letter.
- There is no reverse for Type 2 (transcription) because it is pronunciation-based and not strictly reversible.

### toISO843Type2(text)

```ts
// Context-sensitive rules for αυ/ευ/ηυ and μπ
// Matches the official government converter

greekUtils.toISO843Type2('αυτός'); // 'aftos'
greekUtils.toISO843Type2('αυγό'); // 'avgo'
greekUtils.toISO843Type2('μπάλα'); // 'bala' (μπ at beginning)
greekUtils.toISO843Type2('λάμπα'); // 'lampa' (μπ in middle)
greekUtils.toISO843Type2('ΘΕΟΣ'); // 'THEOS' (all caps)
greekUtils.toISO843Type2('Θεσσαλονίκη'); // 'Thessaloniki'

// Backward-compatible alias (Type 2)
greekUtils.toISO843('ΕΥΡΩΠΗ'); // 'EVROPI'
```

When to use Type 2

- Government documents (passports/IDs)
- Toponyms on signs and maps
- Any case where Greek pronunciation guidance is desired

### sanitizeDiacritics(text, ignoreCharacters?)

Convert Greek text with polytonic/monotonic diacritics to their simple equivalents.

```ts
greekUtils.sanitizeDiacritics('Ἀθήνα Ἑλλάς άέήίόύώ ϊΐ ϋΰ');
// 'Αθηνα Ελλας αεηιουω ϊΐ ϋΰ'
```

### toGreek(text, ignoreCharacters?)

Convert a Latin (greeklish) representation to modern Greek.

```ts
greekUtils.toGreek('kalhmera, pws eiste?'); // 'καλημερα, πωσ ειστε?'
greekUtils.toGreek('kalhmera, pws eiste?', '?p'); // 'καλημερα, pωσ ειστε?'
```

Note: current mapping does not apply final sigma automatically.

### toGreeklish(text, ignoreCharacters?)

Convert modern Greek to Greeklish.

```ts
greekUtils.toGreeklish('καλημερα, πως ειστε;'); // 'kalhmera, pws eiste;'
greekUtils.toGreeklish('Το κάλλος είναι η καλύτερη συστατική επιστολή');
// 'To kάllos eίnai h kalύterh systatikή epistolή'

greekUtils.toGreeklish('καλημερα, πως ειστε;', ';λ'); // 'kaλhmera, pws eiste;'
```

### toPhoneticLatin(text, ignoreCharacters?)

Convert to phonetic Latin (sound mapping). Accents may be preserved to indicate stress.

```ts
greekUtils.toPhoneticLatin('αυτός'); // 'aftós'
greekUtils.toPhoneticLatin('ευαγγέλιο'); // 'evaggélio'
greekUtils.toPhoneticLatin('Εύηχο: αυτό που ακούγεται ωραία.');
// 'Évikho: aftó pou akoúyete oréa.'

greekUtils.toPhoneticLatin('Εύηχο: αυτό που ακούγεται ωραία.', 'χ');
// 'Éviχo: aftó pou akoúyete oréa.'
```

### toTransliteratedLatin(text, ignoreCharacters?)

Convert to transliterated Latin (letter mapping) using macrons/diacritics when appropriate.

```ts
greekUtils.toTransliteratedLatin('ψυχή'); // 'psukhḗ'
greekUtils.toTransliteratedLatin('Εύηχο: αυτό που ακούγεται ωραία.');
// 'Eúēkho: autó pou akoúgetai ōraía.'

greekUtils.toTransliteratedLatin('Εύηχο: αυτό που ακούγεται ωραία.', 'αύ');
// 'Eύēkho: αutó pou αkoύgetαi ōrαíα.'
```

### removeStopWords(text, shouldRemoveMultipleWhiteSpaces = false)

Remove Greek stopwords (ancient and modern). Optionally collapse multiple spaces.

```ts
greekUtils.removeStopWords('Αυτή είναι μια απλή πρόταση ...', false);
// 'μια απλή πρόταση,  δείχνει  αφαίρεση όλων  stopwords  αρχαίας  νέας Ελληνικής γλώσσας  επιστρέφει  καθαρό κείμενο.'

greekUtils.removeStopWords('Αυτή είναι μια απλή πρόταση ...', true);
// 'μια απλή πρόταση, δείχνει αφαίρεση όλων stopwords αρχαίας νέας Ελληνικής γλώσσας επιστρέφει καθαρό κείμενο.'
```

## API Summary

- `toISO843Type1(text: string): string`
- `fromISO843Type1(text: string): string`
- `toISO843Type2(text: string): string`
- `toISO843(text: string): string` - (alias of Type 2)
- `toGreek(text: string, ignoreCharacters?: string): string`
- `toGreeklish(text: string, ignoreCharacters?: string): string`
- `toPhoneticLatin(text: string, ignoreCharacters?: string): string`
- `toTransliteratedLatin(text: string, ignoreCharacters?: string): string`
- `sanitizeDiacritics(text: string, ignoreCharacters?: string): string`
- `removeStopWords(text: string, shouldRemoveMultipleWhiteSpaces?: boolean): string`

## Notes on ISO 843 Compliance

- This library implements both systems defined in the [official standard](https://sete.gr/files/Media/Egkyklioi/040707Latin-Greek.pdf).
- Type 2 matches the Greek government converter: αυ/ευ/ηυ → av/af, ev/ef, iv/if depending on following letter; μπ → b at word edges, mp in middle; all-caps digraphs converted (TH/CH/PS/NCH/NX).
- Type 1 follows the standard’s transliteration tables; AU/EU/OU are the only fixed vowel digraphs.

### Spec references for ISO → Greek (Type 1 reverse)

- Re‑transliteration definition: ISO 843 / ELOT 743 Appendix A, A.2.1.3 (Επαναμεταγραμματισμός) — reverse of transliteration rules.
- Final sigma rule (σ ↔ ς): Table 1 notes (e.g., note about how Latin 's' maps back to Greek σ/ς depending on word position).
- Fixed vowel digraphs in Transliteration (Type 1): Table 1 Note 1 (AU/EU/OU), enabling unambiguous reverse mapping.
- Full text of the standard: [ELOT 743 / ISO 843 PDF](https://sete.gr/files/Media/Egkyklioi/040707Latin-Greek.pdf).

## Acknowledgments

This library is based on and inspired by the original "greek-utils" project. See [vbarzokas/greek-utils](https://github.com/vbarzokas/greek-utils/).

## License

MIT
