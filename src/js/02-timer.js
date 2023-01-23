// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
};

refs.startBtn.setAttribute('disabled', 'true');
let intervalID = null;
let nowDate = 0;
let deltaMs = 0;
let selectedDate = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    //   console.log(selectedDates[0]);
    selectedDate = selectedDates[0].getTime();
    console.log(selectedDate);
    nowDate = Date.now();
    console.log(nowDate);
    timerData();
    dateChoice();
    // console.log(nowDate);
    // console.log(selectedDates[0].getTime());

    clearInterval(intervalID);
  },
};

flatpickr(refs.input, options);

function dateChoice() {
  if (nowDate > selectedDate) {
    return Notiflix.Notify.failure('Please choose a date in the future', {
      timeout: 50000,
      backOverlay: true,
      plainText: true,
      position: 'center-top',
      clickToClose: true,
      cssAnimationStyle: 'from-top',
      failure: {
        background: '#ff5549',
        backOverlayColor: '#880808',
      },
    });
    // return window.alert('Please choose a date in the future');
  }
  updateTimerText(convertMs(deltaMs));
  refs.startBtn.removeAttribute('disabled');
}

function timerData() {
  deltaMs = selectedDate - nowDate;
}

refs.startBtn.addEventListener('click', OnStartBtnTimerStart);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function OnStartBtnTimerStart() {
  nowDate = Date.now();
  timerData();
  intervalID = setInterval(() => {
    deltaMs -= 1000;
    if (deltaMs <= 0) {
      clearInterval(intervalID);
      return Notiflix.Report.success(
        'Yours time has ended',
        'Game over',
        'purrrfect',
        {
          width: '360px',
          svgSize: '120px',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }
      );
    }
    updateTimerText(convertMs(deltaMs));
    console.log(convertMs(deltaMs));
  }, 1000);
  refs.startBtn.setAttribute('disabled', 'true');
}

function updateTimerText({ days, hours, minutes, seconds }) {
  refs.daysEl.textContent = String(days).padStart(2, '0');
  refs.hoursEl.textContent = String(hours).padStart(2, '0');
  refs.minutesEl.textContent = String(minutes).padStart(2, '0');
  refs.secondsEl.textContent = String(seconds).padStart(2, '0');
}
