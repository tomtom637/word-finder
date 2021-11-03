//import { buildAnswer } from './build-partial-word.js';

export function displayHint() {
  const help = document.querySelector('#help');
  if (help.style.opacity === '1') {
    help.style.opacity = '0';
  } else {
    help.style.opacity = '1';
  }
}

export function handleKeydown(e) {
  if(e.key === 'Shift') {
    window.shiftPressed = true;
  }
}

export function handleKeyup(e) {
  const word = document.querySelector('#inputs').dataset.word;
  let interrupt = false;

  switch(e.key) {
    case 'Shift':
      break;
    case 'Enter':
      document.querySelector('.next').click();
      break;
    case 'Backspace':
      window.inputState = window.inputState.slice(0, -1);
      break;
    case 'Dead':
      if(window.shiftPressed) {
        window.inputState += '¨'
      } else {
        window.inputState += '^'
      }
      break;
    case e.key:
      // handling ^ and ¨ key
      if(window.inputState.slice(-1) === '¨') {
        switch(e.key) {
          case 'a':
            if(word.toLowerCase().includes('ä')) {
              window.inputState = window.inputState.slice(0, -1);
              window.inputState += 'ä';
              interrupt = true;
            } else {
              window.inputState = window.inputState.slice(0, -1);
            }
            break;
          case 'e':
            if(word.toLowerCase().includes('ë')) {
              window.inputState = window.inputState.slice(0, -1);
              window.inputState += 'ë';
              interrupt = true;
            } else {
              window.inputState = window.inputState.slice(0, -1);
            }
            break;
          case 'i':
            if(word.toLowerCase().includes('ï')) {
              window.inputState = window.inputState.slice(0, -1);
              window.inputState += 'ï';
              interrupt = true;
            } else {
              window.inputState = window.inputState.slice(0, -1);
            }
            break;
          case 'o':
            if(word.toLowerCase().includes('ö')) {
              window.inputState = window.inputState.slice(0, -1);
              window.inputState += 'ö';
              interrupt = true;
            } else {
              window.inputState = window.inputState.slice(0, -1);
            }
            break;
          case 'u':
            if(word.toLowerCase().includes('ü')) {
              window.inputState = window.inputState.slice(0, -1);
              window.inputState += 'ü';
              interrupt = true;
            } else {
              window.inputState = window.inputState.slice(0, -1);
            }
            break;
          default:
            window.inputState = window.inputState.slice(0, -1);
        }
      } else if(window.inputState.slice(-1) === '^') {
        switch(e.key) {
          case 'a':
            if(word.toLowerCase().includes('â')) {
              window.inputState = window.inputState.slice(0, -1);
              window.inputState += 'â';
              interrupt = true;
            } else {
              window.inputState = window.inputState.slice(0, -1);
            }
            break;
          case 'e':
            if(word.toLowerCase().includes('ê')) {
              window.inputState = window.inputState.slice(0, -1);
              window.inputState += 'ê';
              interrupt = true;
            } else {
              window.inputState = window.inputState.slice(0, -1);
            }
            break;
          case 'i':
            if(word.toLowerCase().includes('î')) {
              window.inputState = window.inputState.slice(0, -1);
              window.inputState += 'î';
              interrupt = true;
            } else {
              window.inputState = window.inputState.slice(0, -1);
            }
            break;
          case 'o':
            if(word.toLowerCase().includes('ô')) {
              window.inputState = window.inputState.slice(0, -1);
              window.inputState += 'ô';
              interrupt = true;
            } else {
              window.inputState = window.inputState.slice(0, -1);
            }
            break;
          case 'u':
            if(word.toLowerCase().includes('û')) {
              window.inputState = window.inputState.slice(0, -1);
              window.inputState += 'û';
              interrupt = true;
            } else {
              window.inputState = window.inputState.slice(0, -1);
            }
            break;
          default:
            window.inputState = window.inputState.slice(0, -1);
        }
      }

      // handling all the other keys
      if(word.toLowerCase().includes(e.key.replace(/'/g, "’").toLowerCase()) && !interrupt) {
       window.inputState += e.key;
      }
      break;
  }
  updateAnswerDiv(word);
  updateInputs(word);
  checkWin(word);

  window.shiftPressed = false;
}

export function handleClickChar(e) {
  if(e.target.nodeName !== 'SPAN') return;

  const word = document.querySelector('#inputs').dataset.word;
  window.inputState += e.target.innerHTML;
  updateAnswerDiv(word);
  updateInputs(word);
  checkWin(word);
}

export function handleBackspace() {
  const word = document.querySelector('#inputs').dataset.word;
  window.inputState = window.inputState.slice(0, -1);
  updateAnswerDiv(word);
  updateInputs(word);
}


function updateAnswerDiv(word) {
  const answerDiv = document.getElementById('answer');
  answerDiv.innerHTML = `
  ${word
    .split('')
    .map((answerElement, i) => `
      <span
        class="answer-unit
          ${answerElement === ' ' && 'space'}
          ${window.inputState[i] ? 'space-active' : ''}"
        >
        ${window.inputState[i] ? window.inputState[i] : ''}
      </span>
    `)
    .join('')}
  `;
}

function updateInputs(word) {
  const allSpans = document.querySelectorAll('.char');
  // reinitialize the background color to default
  allSpans.forEach(span => span.style.background = '#ddd');

  const charInInput = window.inputState.replace(/'/g, "’").toLowerCase().split('');
  const charInWord = word.replace(/'/g, "’").toLowerCase().split('');
  const charToDelete =  [];

  for(let i = 0; i < charInInput.length; ++i) {
    if (charInWord.includes(charInInput[i])) {
      charToDelete.push(charInInput[i]);
    }
  }
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

function checkWin(word) {
  if(window.inputState.toLowerCase().trim().replace(/'/g, "’") === (word.toLowerCase().trim().replace(/'/g, "’"))) {
    document.querySelector('.bravo').style.opacity = "1";
    document.querySelector('.next').style.display = "block";

  }
}