String.prototype.shuffle = function () {
  var a = this.split(""),
    n = a.length;

  for (var i = n - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
  }
  return a.join("");
}

const app = document.getElementById('app');

function buildWord(word) {
  printedWord = '';
  word
    .split('')
    .forEach((char, i) => {
      if (i === 0) {
        printedWord += char + ' ';
      } else {
        if (char.match(/^ *$/) !== null) {
          printedWord += '. ';
        } else {
          printedWord += '_ ';
        }
      }
    });
  return printedWord;
}

async function loadWords() {
  const wordsData = await fetch('./words.json');
  const words = await wordsData.json();
  return words;
}

async function displayAWord() {
  const words = await loadWords();
  const index = ~~(Math.random() * words.length);
  const { word, category, image } = words[index];

  const toBePrinted = buildWord(word);

  app.innerHTML = /*html*/`
    <div class="container">
      <img src="${image !== undefined ? image : ''}">
      <p>category: ${category}</p>
      <div class="word-container">
        <h1 class="word">${word.shuffle()}</h1>
        <div
          class="hint"
          onclick="displayHint()"
        >
          ? ? ?
        </div>
        <h1 id="help" style="opacity:0;">${word}</h1>
      </div>
      <p>${toBePrinted}</p>
      <form oninput="handleSubmit(event)">
        <input data-word="${word}" type="text" />      
      </form>
      <div class="bravo">
        <span>BRAVO</span>
        <img class="medal" src="medal.png" alt="medal" />      
      </div>
      <div class="next-container" onclick="displayAWord()">
        <span class="next">NEXT</span>
        <span class="arrow"></span>  
      </div>
    </div>
  `;
}

displayAWord();

function handleSubmit(e) {
  e.preventDefault();
  if(document.querySelector('input').value.toLowerCase().trim() === (document.querySelector('input').dataset.word.trim())) {
    document.querySelector('.bravo').style.opacity = "1";
  }
}



function displayHint() {
  if (document.querySelector('#help').style.opacity === '1') {
    document.querySelector('#help').style.opacity = '0';
  } else {
    document.querySelector('#help').style.opacity = '1';
  }
}

// document.addEventListener('keyup', e => {
//   if (e.key === ' ') {
//     displayAWord();
//     // document.querySelector('.help').style.display = 'none';
//   } else if (e.key === 'h') {
//     displayHint();
//   }
// });