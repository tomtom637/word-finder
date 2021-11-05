import globals from '../globals.js';
import { updateAnswerDiv, updateInputs, checkWin } from '../updates.js';

export function handleMousedownChar(e) {
  if(e.target.nodeName !== 'SPAN') return;
  e.target.style.transform = 'scale(1.6)';
}

export function handleMouseupChar(e) {
  if(e.target.nodeName !== 'SPAN') return;

  const word = document.querySelector('#inputs').dataset.word;
  globals.inputState += e.target.innerHTML;
  e.target.style.transform = 'scale(1)';
  updateAnswerDiv(word);
  updateInputs(word);
  checkWin(word);
}