function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
let timerId = null;
const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
  bodyEl: document.querySelector('body'),
};

refs.startBtn.addEventListener('click', onStartButtonChangeColorStart);

function onStartButtonChangeColorStart(e) {
  timerId = setInterval(changeColorBG, 1000);
  e.currentTarget.setAttribute('disabled', 'true');
}
function changeColorBG() {
  refs.bodyEl.style.backgroundColor = getRandomHexColor();
  console.log(getRandomHexColor());
}

refs.stopBtn.addEventListener('click', onStopButtonChangeColorStart);

function onStopButtonChangeColorStart() {
  clearInterval(timerId);
  refs.startBtn.removeAttribute('disabled');
}
