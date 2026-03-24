const bulb = document.getElementById('bulb');
const toggleBtn = document.getElementById('toggle-btn');
const typeSelect = document.getElementById('type-select');
const brightnessBtn = document.getElementById('brightness-btn');

let inactivityTimer;

function resetTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
        if (bulb.classList.contains('on')) {
            bulb.classList.remove('on');
            toggleBtn.textContent = 'Включити';
            bulb.style.filter = 'brightness(1)';
        }
    }, 5 * 60 * 1000); 
}

toggleBtn.addEventListener('click', () => {
    bulb.classList.toggle('on');
    
    if (bulb.classList.contains('on')) {
        toggleBtn.textContent = 'Виключити';
    } else {
        toggleBtn.textContent = 'Включити';
        bulb.style.filter = 'brightness(1)';
    }
    
    resetTimer();
});

typeSelect.addEventListener('change', (e) => {
    const isCurrentlyOn = bulb.classList.contains('on');
    
    bulb.className = e.target.value;
    
    if (isCurrentlyOn) {
        bulb.classList.add('on');
    }
    
    resetTimer();
});

brightnessBtn.addEventListener('click', () => {
    if (!bulb.classList.contains('on')) {
        alert("Спочатку увімкніть лампочку!");
        return;
    }
    
    let brightness = prompt("Введіть яскравість (від 10 до 100):", "100");
    
    if (brightness !== null && !isNaN(brightness) && brightness.trim() !== "") {
        brightness = Math.max(10, Math.min(100, Number(brightness)));
        bulb.style.filter = `brightness(${brightness / 100})`;
    }
    
    resetTimer();
});

['mousemove', 'keydown', 'click'].forEach(event => {
    window.addEventListener(event, resetTimer);
});

resetTimer();