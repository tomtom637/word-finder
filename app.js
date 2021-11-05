import shuffleString from './js/string-shuffler.js';
import { displayHint, handleBackspace } from './js/events/button-events.js';
import { handleKeydown, handleKeyup } from './js/events/key-events.js';
import { handleMouseupChar, handleMousedownChar } from './js/events/mouse-events.js';
import { handleTouchstartChar, handleTouchmoveChar, handleTouchendChar } from './js/events/touch-events.js';
import loadImage from './js/image-loader.js';
import globals from './js/globals.js';


async function loadWords() {
  const wordsData = await fetch('./words.json');
  const words = await wordsData.json();
  return words;
}

async function displayAWord() {
  globals.inputState = '';
  String.prototype.shuffle = shuffleString;
  const app = document.getElementById('app');
  const words = await loadWords();
  const index = ~~(Math.random() * words.length); // debug '965 / ^963 / ¨1190 / êe633;
  let { word, category, image } = words[index];
  if(image !== undefined) {
    if(Array.isArray(image)) {
      image = image[~~(Math.random() * image.length)]
    }
  }
  await loadImage(image);

  app.innerHTML = /*html*/`
    <div class="container">
      <div class="img-container">
        <img src="${image !== undefined ? image : ''}">
      </div>
      <div class="bellow-img">
        <div id="answer">
          ${word
              .split('')
              .map((answerElement, i) => /*html*/`
                <span
                  class="answer-unit
                    ${answerElement === ' ' ? 'space' : ''}
                    ${globals.inputState[i] ? 'space-active' : ''}"
                  >
                  ${globals.inputState[i] ? globals.inputState[i] : ''}
                </span>
              `)
              .join('')}
        </div>
        <div class="inputs-container">
          <h1 id="inputs" class="inputs" data-word="${word}">
            ${word
                .shuffle()
                .split('')
                .map((char, i) => /*html*/`<span class="char" data-index="${i}">${char}</span>`)
                .join('')
              }
          </h1>
        </div>
        <div class="bravo">
          <img class="medal" src="medal.png" alt="medal" />
        </div>
        <div class="bottom-section">
          <div class="help-container">
            <span class="hint">
              ?
            </span>
          </div>
          <div class="buttons">
            <div class="backspace-container">
              <button class=backspace>BACKSPACE</button>
            </div>
            <div class="next-container">
              <button class="next">NEXT <span class="arrow"></span></button>  
            </div>
          </div>
        </div>
        <h1 id="help" style="opacity:0;">${word[globals.inputState.length]}</h1>
      </div>
    </div>
  `;
  document.querySelector('#inputs').addEventListener('mouseup', handleMouseupChar);
  document.querySelector('#inputs').addEventListener('mousedown', handleMousedownChar);
  document.querySelector('#inputs').addEventListener('touchstart', handleTouchstartChar);
  document.querySelector('#inputs').addEventListener('touchmove', handleTouchmoveChar);
  document.querySelector('#inputs').addEventListener('touchend', handleTouchendChar);
  document.querySelector('.hint').addEventListener('click', displayHint);
  document.querySelector('.backspace-container').addEventListener('click', handleBackspace);
  document.querySelector('.next-container').addEventListener('click', displayAWord);
  document.addEventListener('keyup', handleKeyup);
  document.addEventListener('keydown', handleKeydown);
  document.addEventListener('dblclick', e => e.preventDefault());
}

displayAWord();
