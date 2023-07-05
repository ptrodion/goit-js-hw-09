function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const refs = {
  startEl: document.querySelector('[data-start]'),
  stopEl: document.querySelector('[data-stop]'),
};

refs.stopEl.disabled = true;
let changeBackgroundColor = null;

refs.startEl.addEventListener('click', onClickStart);
refs.stopEl.addEventListener('click', onClickStop);

function onClickStart() {
  refs.startEl.disabled = true;
  refs.stopEl.disabled = false;
  changeBackgroundColor = setInterval(changeBodyBackgroundColor, 1000);
}

function changeBodyBackgroundColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}

function onClickStop() {
  clearInterval(changeBackgroundColor);
  refs.stopEl.disabled = true;
  refs.startEl.disabled = false;
}
