import shuffleString from './js/string-shuffler.js';
import { displayHint, handleInput, handleKeyup} from './js/e-listeners-handlers.js';
import buildPartialWord from './js/build-partial-word.js';
import loadImage from './js/image-loader.js';

async function loadWords() {
  const wordsData = await fetch('./words.json');
  const words = await wordsData.json();
  return words;
}

async function displayAWord() {
  String.prototype.shuffle = shuffleString;
  const app = document.getElementById('app');
  const words = await loadWords();
  const index = ~~(Math.random() * words.length); // debug 965;
  let { word, category, image } = words[index];
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
      <div class="word-container">
        <h1 class="word">
          ${word
              .shuffle()
              .split('')
              .map(char => /*html*/`<span class="char">${char}</span>`)
              .join('')
            }
        </h1>
      </div>
      <div class="bellow-img">
        <p>${buildPartialWord(word)}</p>
        <form id="form">
          <input
            data-word="${word}"
            type="text"
            autofocus
          />      
        </form>
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
          <div class="next-container">
            <button class="next">NEXT <span class="arrow"></span></button>  
          </div>
        </div>
      </div>
    </div>
  `;
  document.querySelector('input').focus();
  document.querySelector('#form').addEventListener('input', handleInput);
  document.querySelector('.hint').addEventListener('click', displayHint);
  document.querySelector('.next-container').addEventListener('click', displayAWord);
  document.addEventListener('keyup', handleKeyup);
}

displayAWord();
