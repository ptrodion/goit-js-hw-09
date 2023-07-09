import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  chooseDataEl: document.getElementById('datetime-picker'),
  startTimerEl: document.querySelector('[data-start]'),
  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
};

refs.startTimerEl.disabled = true;
const defaultValue = new Date();
let selectedDate = null;
let remainingTime = null;
let timeInterval = null;

refs.startTimerEl.addEventListener('click', onStartTimer);

flatpickr(refs.chooseDataEl, {
  enableTime: true,
  time_24hr: true,
  defaultDate: defaultValue,
  minuteIncrement: 1,

  onChange() {
    refs.startTimerEl.disabled = true;
  },
  onClose(selectedDates) {
    selectedDate = selectedDates[0].getTime();

    if (selectedDate < defaultValue) {
      Notiflix.Notify.warning('Please choose a date in the future');
    } else {
      refs.startTimerEl.disabled = false;
      remainingTime = selectedDate - defaultValue;
    }
  },
});

function onStartTimer() {
  timeInterval = setInterval(updateClock, 1000);
}

function getTimeRemaining() {
  const seconds = Math.floor((remainingTime / 1000) % 60);
  const minutes = Math.floor((remainingTime / 1000 / 60) % 60);
  const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
  const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));

  return {
    total: remainingTime,
    days,
    hours,
    minutes,
    seconds,
  };
}

function updateClock() {
  remainingTime -= 1000;

  if (remainingTime < 0) {
    clearInterval(timeInterval);
    return;
  }

  const time = getTimeRemaining();

  refs.daysEl.textContent = time.days;
  refs.hoursEl.textContent = String(time.hours).padStart(2, '0');
  refs.minutesEl.textContent = String(time.minutes).padStart(2, '0');
  refs.secondsEl.textContent = String(time.seconds).padStart(2, '0');
}
