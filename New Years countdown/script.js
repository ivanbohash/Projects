const newYears = `1 January ${new Date().getFullYear() + 1}`;

const secondsEl = document.getElementById('seconds');
const minsEl = document.getElementById('mins');
const hoursEl = document.getElementById('hours');
const daysEl = document.getElementById('days');

function countdown() {
	const currentDate = new Date();
	const newYearsDate = new Date(newYears);

	const totalSeconds = (newYearsDate - currentDate) / 1000;
	const seconds = Math.floor(totalSeconds) % 60;
	const mins = Math.floor(totalSeconds / 60) % 60;
	const hours = Math.floor(totalSeconds / 3600) % 24;
	const days = Math.floor(totalSeconds / 3600 / 24);

	secondsEl.innerHTML = formatTime(seconds);
	minsEl.innerHTML = formatTime(mins);
	hoursEl.innerHTML = formatTime(hours);
	daysEl.innerHTML = days;
}

function formatTime(time) {
	return time < 10 ? `0${time}` : time;
}

countdown();
setInterval(countdown, 1000);
