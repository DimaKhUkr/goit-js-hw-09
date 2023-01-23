import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', OnBtnClick);

function OnBtnClick(e) {
  e.preventDefault();

  const { amount, step, delay } = e.currentTarget.elements;

  for (let i = 0; i < amount.value; i++) {
    const delayCounter = i * Number(step.value) + Number(delay.value);
    runPromise(i, delayCounter);
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function runPromise(quantity, delay) {
  createPromise(quantity, delay)
    .then(({ position, delay }) => {
      success(position, delay);
    })
    .catch(({ position, delay }) => {
      error(position, delay);
    });
}

function error(position, delay) {
  Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}

function success(position, delay) {
  Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}
