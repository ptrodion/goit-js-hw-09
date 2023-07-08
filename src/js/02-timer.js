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
const defaultValue = new Date().getTime();
let selectedDate = null;
let remainingTime = null;
let timeInterval = null;

flatpickr(refs.chooseDataEl, {
  enableTime: true,
  time_24hr: true,
  defaultDate: defaultValue,
  minuteIncrement: 1,

  onChange: function () {
    refs.startTimerEl.disabled = true;
  },
  onClose(selectedDates) {
    selectedDate = Date.parse(selectedDates[0]);

    if (selectedDate < defaultValue) {
      Notiflix.Notify.warning('Please choose a date in the future');
    } else {
      refs.startTimerEl.disabled = false;
      remainingTime = selectedDate - defaultValue;
    }
  },
});

refs.startTimerEl.addEventListener('click', onStartTimer);

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
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
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
  refs.hoursEl.textContent = ('0' + time.hours).slice(-2);
  refs.minutesEl.textContent = ('0' + time.minutes).slice(-2);
  refs.secondsEl.textContent = ('0' + time.seconds).slice(-2);
}

function reloadPage() {
  location.reload(); // Перезагрузить страницу
}
