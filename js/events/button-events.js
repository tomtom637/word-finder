import globals from '../globals.js';
import { updateAnswerDiv, updateInputs, checkWin } from '../updates.js';

export function displayHint() {
  const word = document.querySelector('#inputs').dataset.word;
  if(word[globals.inputState.length]) {
    globals.inputState += word[globals.inputState.length];
  }
  updateAnswerDiv(word);
  updateInputs(word);
  checkWin(word);
}

export function handleBackspace() {
  const word = document.querySelector('#inputs').dataset.word;
  globals.inputState = globals.inputState.slice(0, -1);
  updateAnswerDiv(word);
  updateInputs(word);
}