"use strict";

document.getElementById('start').addEventListener('click', () => {
    clock.startClock();
});

document.getElementById('stop').addEventListener('click', () => {
    clock.stopClock();
});

document.getElementById('lap').addEventListener('click', () => {
    clock.setLapTime();
});

document.getElementById('reset').addEventListener('click', () => {
    clock.resetClock();
});