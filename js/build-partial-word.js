export default function buildPartialWord(word) {
  let printedWord = '';
  word
    .split('')
    .forEach((char, i) => {
      if (i === 0) {
        printedWord += char + ' ';
      } else {
        if (char.match(/^ *$/) !== null) {
          printedWord += '. ';
        } else {
          printedWord += '_ ';
        }
      }
    });
  return printedWord;
}