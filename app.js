import shuffleString from './js/string-shuffler.js';
import { displayHint, handleKeydown, handleKeyup, handleClickChar, handleBackspace } from './js/e-listeners-handlers.js';
import loadImage from './js/image-loader.js';

// global variables
window.inputState = '';
window.shiftPressed = false;

async function loadWords() {
  const wordsData = await fetch('./words.json');
  const words = await wordsData.json();
  return words;
}

async function displayAWord() {
  window.inputState = '';
  String.prototype.shuffle = shuffleString;
  const app = document.getElementById('app');
  const words = await loadWords();
  const index = ~~(Math.random() * words.length); // debug '965 / ^963 / ¨1190 / êe633;
  let { word, category, image } = words[index];
  let availableInputs = [];
  if(image !== undefined) {
    if(Array.isArray(image)) {
      image = image[~~(Math.random() * image.length)]
    }
  }
  await loadImage(image);

  app.innerHTML = /*html*/`
    <div class="container">
      <!--<p>category: ${category}</p>-->
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
                    ${window.inputState[i] ? 'space-active' : ''}"
                  >
                  ${window.inputState[i] ? window.inputState[i] : ''}
                </span>
              `)
              .join('')}
        </div>
        <div class="inputs-container">
          <h1 id="inputs" class="inputs" data-word="${word}">
            ${word
                .shuffle()
                .split('')
                .map(char => /*html*/`<span class="char">${char}</span>`)
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
              ? ? ?
            </span>
            <h1 id="help" style="opacity:0;">${word}</h1>
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
      </div>
    </div>
  `;
  document.querySelector('#inputs').addEventListener('click', handleClickChar);
  document.querySelector('.hint').addEventListener('click', displayHint);
  document.querySelector('.backspace-container').addEventListener('click', handleBackspace);
  document.querySelector('.next-container').addEventListener('click', displayAWord);
  document.addEventListener('keyup', handleKeyup);
  document.addEventListener('keydown', handleKeydown);
  document.addEventListener('dblclick', e => e.preventDefault());
}

displayAWord();
