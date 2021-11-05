import globals from '../globals.js';
import { updateAnswerDiv, updateInputs, checkWin } from '../updates.js';
import { displayHint } from './button-events.js';

export function handleKeydown(e) {
  if(e.key === 'Shift') {
    globals.shiftPressed = true;
  }
}

export function handleKeyup(e) {
  const word = document.querySelector('#inputs').dataset.word;
  let interrupt = false;

  switch(e.key) {
    case 'Shift':
      break;
    case 'ArrowUp':
      displayHint();
      return;
    case 'ArrowDown':
      displayHint();
      return;
    case 'Meta':
      displayHint();
      return;
    case 'Enter':
      document.querySelector('.next').click();
      break;
    case 'Backspace':
      globals.inputState = globals.inputState.slice(0, -1);
      break;
    case 'Dead':
      if(globals.shiftPressed) {
        globals.inputState += '¨'
      } else {
        globals.inputState += '^'
      }
      break;
    case e.key:
      // handling ^ and ¨ key
      if(globals.inputState.slice(-1) === '¨') {
        switch(e.key) {
          case 'a':
            if(word.toLowerCase().includes('ä')) {
              globals.inputState = globals.inputState.slice(0, -1);
              globals.inputState += 'ä';
              interrupt = true;
            } else {
              globals.inputState = globals.inputState.slice(0, -1);
            }
            break;
          case 'e':
            if(word.toLowerCase().includes('ë')) {
              globals.inputState = globals.inputState.slice(0, -1);
              globals.inputState += 'ë';
              interrupt = true;
            } else {
              globals.inputState = globals.inputState.slice(0, -1);
            }
            break;
          case 'i':
            if(word.toLowerCase().includes('ï')) {
              globals.inputState = globals.inputState.slice(0, -1);
              globals.inputState += 'ï';
              interrupt = true;
            } else {
              globals.inputState = globals.inputState.slice(0, -1);
            }
            break;
          case 'o':
            if(word.toLowerCase().includes('ö')) {
              globals.inputState = globals.inputState.slice(0, -1);
              globals.inputState += 'ö';
              interrupt = true;
            } else {
              globals.inputState = globals.inputState.slice(0, -1);
            }
            break;
          case 'u':
            if(word.toLowerCase().includes('ü')) {
              globals.inputState = globals.inputState.slice(0, -1);
              globals.inputState += 'ü';
              interrupt = true;
            } else {
              globals.inputState = globals.inputState.slice(0, -1);
            }
            break;
          default:
            globals.inputState = globals.inputState.slice(0, -1);
        }
      } else if(globals.inputState.slice(-1) === '^') {
        switch(e.key) {
          case 'a':
            if(word.toLowerCase().includes('â')) {
              globals.inputState = globals.inputState.slice(0, -1);
              globals.inputState += 'â';
              interrupt = true;
            } else {
              globals.inputState = globals.inputState.slice(0, -1);
            }
            break;
          case 'e':
            if(word.toLowerCase().includes('ê')) {
              globals.inputState = globals.inputState.slice(0, -1);
              globals.inputState += 'ê';
              interrupt = true;
            } else {
              globals.inputState = globals.inputState.slice(0, -1);
            }
            break;
          case 'i':
            if(word.toLowerCase().includes('î')) {
              globals.inputState = globals.inputState.slice(0, -1);
              globals.inputState += 'î';
              interrupt = true;
            } else {
              globals.inputState = globals.inputState.slice(0, -1);
            }
            break;
          case 'o':
            if(word.toLowerCase().includes('ô')) {
              globals.inputState = globals.inputState.slice(0, -1);
              globals.inputState += 'ô';
              interrupt = true;
            } else {
              globals.inputState = globals.inputState.slice(0, -1);
            }
            break;
          case 'u':
            if(word.toLowerCase().includes('û')) {
              globals.inputState = globals.inputState.slice(0, -1);
              globals.inputState += 'û';
              interrupt = true;
            } else {
              globals.inputState = globals.inputState.slice(0, -1);
            }
            break;
          default:
            globals.inputState = globals.inputState.slice(0, -1);
        }
      }

      // handling all the other keys
      if(word.toLowerCase().includes(e.key.replace(/'/g, "’").toLowerCase()) && !interrupt) {
       globals.inputState += e.key;
      }
      break;
  }
  updateAnswerDiv(word);
  updateInputs(word);
  checkWin(word);

  globals.shiftPressed = false;
}