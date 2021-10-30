import shuffleString from './js/suffle-string.js';
import { handleSubmit, displayHint } from './js/event-listeners.js';
import buildPartialWord from './js/build-partial-word.js';

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
  const { word, category, image } = words[index];

  app.innerHTML = /*html*/`
    <div class="container">
      <!--<p>category: ${category}</p>-->
      <div class="img-container">
        <img src="${image !== undefined ? image : ''}">
      </div>
      <div class="word-container">
        <h1 class="word">${word.shuffle()}</h1>
      </div>
      <div class="bellow-img">
        <p>${buildPartialWord(word)}</p>
        <form id="form">
          <input data-word="${word}" type="text" autofocus/>      
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
  document.querySelector('#form').addEventListener('input', handleSubmit);
  document.querySelector('.hint').addEventListener('click', displayHint);
  document.querySelector('.next-container').addEventListener('click', displayAWord);
}

displayAWord();
