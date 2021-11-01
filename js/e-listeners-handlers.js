export function handleInput(e) {
  e.preventDefault();

  // Change the background color when an input matches with available letters
  // TODO take spaces into account
  const input = document.querySelector('input');
  const allSpans = document.querySelectorAll('.char');
  
  // reinitialize the background color to default
  allSpans.forEach(span => span.style.background = '#ddd');

  const charInInput = input.value.replace(/'/g, "’").toLowerCase().split('');
  const charInWord = input.dataset.word.replace(/'/g, "’").toLowerCase().split('');
  const charToColor =  [];

  for(let i = 0; i < charInInput.length; ++i) {
    if (charInWord.includes(charInInput[i])) {
      charToColor.push(charInInput[i]);
    }
  }
  allSpans.forEach(span => {
    if(charToColor.includes(span.innerText.toLowerCase())
      && span.style.background !== 'rgba(238, 34, 68, 0.3)') {
      span.style.background = 'rgba(238, 34, 68, 0.3)';
      charToColor.splice(charToColor.indexOf(span.innerText.toLowerCase()), 1);
    }
  });

  if(input.value.toLowerCase().trim().replace(/'/g, "’") === (input.dataset.word.toLowerCase().trim().replace(/'/g, "’"))) {
    document.querySelector('.bravo').style.opacity = "1";
  }
}

export function displayHint() {
  const help = document.querySelector('#help');
  if (help.style.opacity === '1') {
    help.style.opacity = '0';
  } else {
    help.style.opacity = '1';
  }
}