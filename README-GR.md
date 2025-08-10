# Greek Text Utils

[![NPM](https://nodei.co/npm/greek-text-utils.png)](https://nodei.co/npm/greek-text-utils/)

Μια βιβλιοθήκη TypeScript για επεξεργασία ελληνικού κειμένου.

- Μετατροπή ανάμεσα σε Ελληνικά και Greeklish
- Μετατροπή Ελληνικών σε φωνητικό ή μεταγραμματισμένο Λατινικό
- Μετατροπή Ελληνικών σύμφωνα με ISO 843 / ELOT 743 (Τύπος 1 και Τύπος 2)
- Απλοποίηση πολυτονικών/μονοτονικών διακριτικών
- Αφαίρεση ελληνικών stopwords (αρχαία και νέα)

## Εγκατάσταση

```bash
npm install greek-text-utils
```

ή με pnpm:

```bash
pnpm add greek-text-utils
```

## Χρήση

### ESM

```ts
import greekUtils from 'greek-text-utils';
```

### CommonJS

```js
const greekUtils = require('greek-text-utils');
```

## Μέθοδοι

### toISO843Type1(text)

```ts
// Μεταγραμματισμός χωρίς συμφραζόμενα, γράμμα‑προς‑γράμμα (εκτός από AI/EI/OI/OU)

greekUtils.toISO843Type1('αυτός'); // 'autos'
greekUtils.toISO843Type1('μπάλα'); // 'mpala'
greekUtils.toISO843Type1('κομπιούτερ'); // 'kompiouter'
```

Πότε να χρησιμοποιήσετε τον Τύπο 1

- Συλλογές/καταλογογράφηση
- Βάσεις δεδομένων όπου προτιμάται η αναστρεψιμότητα
- Ακαδημαϊκές/βιβλιογραφικές αναφορές

### fromISO843Type1(text)

Ανα‑μεταγραμματισμός Ελληνικών από Τύπο 1 (Λατινικό → Ελληνικό). Εφαρμόζει τελικό σίγμα (ς) στο τέλος λέξης.

```ts
// Βασικά παραδείγματα
greekUtils.fromISO843Type1('Athina'); // 'Αθηνα' (χωρίς τόνο)
greekUtils.fromISO843Type1('autos'); // 'αυτος'
greekUtils.fromISO843Type1('mpampas'); // 'μπαμπας'
greekUtils.fromISO843Type1('theos'); // 'θεος' (τελικό ς)

// Σταθερότητα σε επίπεδο Λατινικών (οι τόνοι δεν αποκαθίστανται):
const t1 = greekUtils.toISO843Type1('Αθήνα'); // 'Athina'
const back = greekUtils.fromISO843Type1(t1); // 'Αθηνα'
greekUtils.toISO843Type1(back) === t1; // true
```

Σημειώσεις:

- Ο Τύπος 1 είναι αναστρέψιμος σε επίπεδο Λατινικών. Οι τόνοι δεν επανέρχονται στα Ελληνικά.
- Ορισμένα ελληνικά φωνήεντα «συμπτύσσονται» στον Τύπο 1 (π.χ. η/ι/υ → i). Η αντίστροφη μετατροπή επιλέγει ένα συνεπές ελληνικό γράμμα.
- Δεν υπάρχει αντίστροφη μετατροπή για Τύπο 2 (μεταγραφή), γιατί βασίζεται στην προφορά.

### toISO843Type2(text)

```ts
// Κανόνες με συμφραζόμενα για αυ/ευ/ηυ και μπ
// Ταιριάζει με τον επίσημο κρατικό μετατροπέα

greekUtils.toISO843Type2('αυτός'); // 'aftos'
greekUtils.toISO843Type2('αυγό'); // 'avgo'
greekUtils.toISO843Type2('μπάλα'); // 'bala' (μπ στην αρχή)
greekUtils.toISO843Type2('λάμπα'); // 'lampa' (μπ στη μέση)
greekUtils.toISO843Type2('ΘΕΟΣ'); // 'THEOS' (κεφαλαία)
greekUtils.toISO843Type2('Θεσσαλονίκη'); // 'Thessaloniki'

// Alias συμβατότητας (Τύπος 2)
greekUtils.toISO843('ΕΥΡΩΠΗ'); // 'EVROPI'
```

Πότε να χρησιμοποιήσετε τον Τύπο 2

- Έγγραφα ταυτοποίησης (διαβατήρια/ταυτότητες)
- Τοπωνύμια σε πινακίδες και χάρτες
- Όταν απαιτείται καθοδήγηση προφοράς

### sanitizeDiacritics(text, ignoreCharacters?)

Μετατρέπει ελληνικά με πολυτονικά/μονοτονικά διακριτικά σε απλά γράμματα.

```ts
greekUtils.sanitizeDiacritics('Ἀθήνα Ἑλλάς άέήίόύώ ϊΐ ϋΰ');
// 'Αθηνα Ελλας αεηιουω ϊΐ ϋΰ'
```

### toGreek(text, ignoreCharacters?)

Μετατροπή λατινικών (greeklish) σε νέα ελληνικά.

```ts
greekUtils.toGreek('kalhmera, pws eiste?'); // 'καλημερα, πωσ ειστε?'
greekUtils.toGreek('kalhmera, pws eiste?', '?p'); // 'καλημερα, pωσ ειστε?'
```

Σημείωση: το τρέχον mapping δεν εφαρμόζει αυτόματα τελικό σίγμα.

### toGreeklish(text, ignoreCharacters?)

Μετατροπή νέων ελληνικών σε Greeklish.

```ts
greekUtils.toGreeklish('καλημερα, πως ειστε;'); // 'kalhmera, pws eiste;'
greekUtils.toGreeklish('Το κάλλος είναι η καλύτερη συστατική επιστολή');
// 'To kάllos eίnai h kalύterh systatikή epistolή'

greekUtils.toGreeklish('καλημερα, πως ειστε;', ';λ'); // 'kaλhmera, pws eiste;'
```

### toPhoneticLatin(text, ignoreCharacters?)

Φωνητική απόδοση (ήχος). Μπορεί να διατηρούνται τόνοι για το στρες.

```ts
greekUtils.toPhoneticLatin('αυτός'); // 'aftós'
greekUtils.toPhoneticLatin('ευαγγέλιο'); // 'evaggélio'
greekUtils.toPhoneticLatin('Εύηχο: αυτό που ακούγεται ωραία.');
// 'Évikho: aftó pou akoúyete oréa.'

greekUtils.toPhoneticLatin('Εύηχο: αυτό που ακούγεται ωραία.', 'χ');
// 'Éviχo: aftó pou akoúyete oréa.'
```

### toTransliteratedLatin(text, ignoreCharacters?)

Μεταγραμματισμός σε λατινικό (γράμμα‑σε‑γράμμα) με μακρά/διακριτικά όπου ενδείκνυνται.

```ts
greekUtils.toTransliteratedLatin('ψυχή'); // 'psukhḗ'
greekUtils.toTransliteratedLatin('Εύηχο: αυτό που ακούγεται ωραία.');
// 'Eúēkho: autó pou akoúgetai ōraía.'

greekUtils.toTransliteratedLatin('Εύηχο: αυτό που ακούγεται ωραία.', 'αύ');
// 'Eύēkho: αutó pou αkoύgetαi ōrαíα.'
```

### removeStopWords(text, shouldRemoveMultipleWhiteSpaces = false)

Αφαίρεση ελληνικών stopwords (αρχαία και νέα). Προαιρετική σύμπτυξη πολλαπλών κενών.

```ts
greekUtils.removeStopWords('Αυτή είναι μια απλή πρόταση ...', false);
// 'μια απλή πρόταση,  δείχνει  αφαίρεση όλων  stopwords  αρχαίας  νέας Ελληνικής γλώσσας  επιστρέφει  καθαρό κείμενο.'

greekUtils.removeStopWords('Αυτή είναι μια απλή πρόταση ...', true);
// 'μια απλή πρόταση, δείχνει αφαίρεση όλων stopwords αρχαίας νέας Ελληνικής γλώσσας επιστρέφει καθαρό κείμενο.'
```

## Σύνοψη API

- `toISO843Type1(text: string): string`
- `fromISO843Type1(text: string): string`
- `toISO843Type2(text: string): string`
- `toISO843(text: string): string` - (alias του Τύπου 2)
- `toGreek(text: string, ignoreCharacters?: string): string`
- `toGreeklish(text: string, ignoreCharacters?: string): string`
- `toPhoneticLatin(text: string, ignoreCharacters?: string): string`
- `toTransliteratedLatin(text: string, ignoreCharacters?: string): string`
- `sanitizeDiacritics(text: string, ignoreCharacters?: string): string`
- `removeStopWords(text: string, shouldRemoveMultipleWhiteSpaces?: boolean): string`

## Σημειώσεις συμμόρφωσης ISO 843

- Η βιβλιοθήκη υλοποιεί και τους δύο τύπους του [επίσημου προτύπου](https://sete.gr/files/Media/Egkyklioi/040707Latin-Greek.pdf).
- Τύπος 2: ταιριάζει με τον επίσημο κρατικό μετατροπέα: αυ/ευ/ηυ → av/af, ev/ef, iv/if ανάλογα με το επόμενο γράμμα· μπ → b στα άκρα λέξης, mp στη μέση· μετατροπή διγράφων σε κεφαλαία (TH/CH/PS/NCH/NX).
- Τύπος 1: ακολουθεί τους πίνακες μεταγραμματισμού· AI/EI/OI/OU είναι τα μοναδικά «σταθερά» δίψηφα φωνηέντων.

### Παραπομπές προτύπου για ISO → Ελληνικά (Τύπος 1 αντίστροφα)

- Ορισμός Επαναμεταγραμματισμού: ISO 843 / ELOT 743 Παράρτημα A, A.2.1.3 (Επαναμεταγραμματισμός) — αντίστροφη εφαρμογή των κανόνων μεταγραμματισμού.
- Τελικό σίγμα (σ ↔ ς): Σημειώσεις Πίνακα 1 (π.χ., πώς το λατινικό 's' χαρτογραφείται πίσω σε σ/ς ανάλογα με τη θέση στη λέξη).
- Σταθερά δίψηφα φωνηέντων στον Τύπο 1: Σημείωση 1 Πίνακα 1 (AU/EU/OU), που επιτρέπει μη αμφίσημη αντίστροφη χαρτογράφηση.
- Πλήρες κείμενο προτύπου: [ELOT 743 / ISO 843 PDF](https://sete.gr/files/Media/Egkyklioi/040707Latin-Greek.pdf).

## Ευχαριστίες

Η βιβλιοθήκη βασίζεται και έχει εμπνευστεί από το "greek-utils". [vbarzokas/greek-utils](https://github.com/vbarzokas/greek-utils/).

## Άδεια

MIT
