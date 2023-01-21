// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';

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
    return window.alert('Please choose a date in the future');
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
  intervalID = setInterval(() => {
    deltaMs -= 1000;
    if (deltaMs <= 0) {
      clearInterval(intervalID);
      return;
    }
    updateTimerText(convertMs(deltaMs));
    console.log(convertMs(deltaMs));
  }, 1000);
  refs.startBtn.setAttribute('disabled', 'true');
}

function updateTimerText(timer) {
  refs.daysEl.textContent = String(timer.days).padStart(2, '0');
  refs.hoursEl.textContent = String(timer.hours).padStart(2, '0');
  refs.minutesEl.textContent = String(timer.minutes).padStart(2, '0');
  refs.secondsEl.textContent = String(timer.seconds).padStart(2, '0');
}
