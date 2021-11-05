import globals from '../globals.js';
import { updateAnswerDiv, updateInputs, checkWin } from '../updates.js';

let currentlyTouchedElement;

export function handleTouchstartChar(e) {
  e.preventDefault();
  currentlyTouchedElement = e.target;
  if(currentlyTouchedElement.nodeName !== 'SPAN') return;
  currentlyTouchedElement.style.transform = 'scale(1.6)';
}

export function handleTouchmoveChar(e) {
  e.preventDefault();
  const newTouchedElement = document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
  if(newTouchedElement !== currentlyTouchedElement) {
    currentlyTouchedElement.style.transform = 'scale(1)';
    if(newTouchedElement.nodeName === 'SPAN') {
      newTouchedElement.style.transform = 'scale(1.6)';
    }
    currentlyTouchedElement = newTouchedElement;
  }
}

export function handleTouchendChar(e) {
  if(currentlyTouchedElement.nodeName !== 'SPAN') return;
  const word = document.querySelector('#inputs').dataset.word;
  currentlyTouchedElement.style.transform = 'scale(1) translateY(0)';
  if(currentlyTouchedElement.className === 'char') {
    globals.inputState += currentlyTouchedElement.innerHTML;
  }
  const index = currentlyTouchedElement.dataset.index;
  updateAnswerDiv(word);
  updateInputs(word, index);
  checkWin(word);
}