import globals from './globals.js';

export function updateAnswerDiv(word) {
  const answerDiv = document.getElementById('answer');
  answerDiv.innerHTML = `
  ${word
    .split('')
    .map((answerElement, i) => `
      <span
        class="answer-unit
          ${answerElement === ' ' && 'space'}
          ${globals.inputState[i] ? 'space-active' : ''}"
        >
        ${globals.inputState[i] ? globals.inputState[i] : ''}
      </span>
    `)
    .join('')}
  `;
}

export function updateInputs(word, index=null) {
  const allSpans = document.querySelectorAll('.char');

  const charInInput = globals.inputState.replace(/'/g, "’").toLowerCase().split('');
  const charInWord = word.replace(/'/g, "’").toLowerCase().split('');
  const charToDelete =  [];

  for(let i = 0; i < charInInput.length; ++i) {
    if (charInWord.includes(charInInput[i])) {
      charToDelete.push(charInInput[i]);
    }
  }
  if(index !== null) {
    allSpans[index].style.opacity = '0';
    allSpans[index].style.pointerEvents = 'none';
    charToDelete.splice(index, 1);
  } else {
    allSpans.forEach(span => {
      if(charToDelete.includes(span.innerHTML.toLowerCase())){
        //&& span.style.display !== 'none') {
        span.style.opacity = '0';
        span.style.pointerEvents = 'none';
        charToDelete.splice(charToDelete.indexOf(span.innerHTML.toLowerCase()), 1);
      } else {
        span.style.opacity = '1';
        span.style.pointerEvents = 'auto';
      }
    });
  }
}

export function checkWin(word) {
  if(globals.inputState.toLowerCase().trim().replace(/'/g, "’") === (word.toLowerCase().trim().replace(/'/g, "’"))) {
    document.querySelector('.bravo').style.opacity = "1";
    document.querySelector('.next-container').style.display = "block";
    document.querySelector('.next-container').style.pointerEvents = "auto";
    if(document.querySelector('.hint') !== null) {
      document.querySelector('.backspace-container').remove();
      document.querySelector('.hint').remove();
    }

  }
}