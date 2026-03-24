const redLight = document.getElementById('red-light');
const yellowLight = document.getElementById('yellow-light');
const greenLight = document.getElementById('green-light');
const statusText = document.getElementById('status-text');
const manualBtn = document.getElementById('manual-btn');
const settingsBtn = document.getElementById('settings-btn');

let durations = {
    red: 5000,
    yellow: 3000,
    green: 7000
};

let currentState = 0;
let timerId;

function turnOffAll() {
    redLight.classList.remove('active');
    yellowLight.classList.remove('active');
    greenLight.classList.remove('active');
}

function changeState() {
    turnOffAll();
    clearTimeout(timerId);

    let delay = 0;

    if (currentState === 0) {
        redLight.classList.add('active');
        statusText.textContent = 'Червоний';
        statusText.style.color = '#ff4757';
        delay = durations.red;
        currentState = 1;
    } else if (currentState === 1) {
        yellowLight.classList.add('active');
        statusText.textContent = 'Жовтий';
        statusText.style.color = '#ffa502';
        delay = durations.yellow;
        currentState = 2;
    } else if (currentState === 2) {
        greenLight.classList.add('active');
        statusText.textContent = 'Зелений';
        statusText.style.color = '#2ed573';
        delay = durations.green;
        currentState = 3;
    } else if (currentState === 3) {
        yellowLight.classList.add('active');
        statusText.textContent = 'Жовтий';
        statusText.style.color = '#ffa502';
        delay = durations.yellow;
        currentState = 0;
    }

    timerId = setTimeout(changeState, delay);
}

manualBtn.addEventListener('click', () => {
    changeState();
});

settingsBtn.addEventListener('click', () => {
    let r = prompt("Час для червоного (в секундах):", durations.red / 1000);
    let y = prompt("Час для жовтого (в секундах):", durations.yellow / 1000);
    let g = prompt("Час для зеленого (в секундах):", durations.green / 1000);

    if (r !== null && !isNaN(r)) durations.red = Number(r) * 1000;
    if (y !== null && !isNaN(y)) durations.yellow = Number(y) * 1000;
    if (g !== null && !isNaN(g)) durations.green = Number(g) * 1000;
    
    currentState = 0;
    changeState();
});

changeState();