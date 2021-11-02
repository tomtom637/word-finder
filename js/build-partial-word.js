export function buildAnswer(word) {
  let printed = '';
  const splitedWord = word.split('');
  for(let i = 0; i < splitedWord.length; ++i) {
    




    printed += /*html*/`
      <span class="answer-unit">
        ${splitedWord[i]}
      </span>
    `;
  }

  return printed;
}

export function buildPartialWord(word) {
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
