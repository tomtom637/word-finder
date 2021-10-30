export function handleSubmit(e) {
  e.preventDefault();
  const input = document.querySelector('input');
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