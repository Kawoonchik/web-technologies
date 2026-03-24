const clockDisplay = document.getElementById('digital-clock');
const countdownInput = document.getElementById('countdown-input');
const countdownResult = document.getElementById('countdown-result');
const bdayInput = document.getElementById('bday-input');
const bdayResult = document.getElementById('bday-result');

function formatTime(val) {
    return String(val).padStart(2, '0');
}

setInterval(() => {
    const now = new Date();
    clockDisplay.innerHTML = `${formatTime(now.getHours())}<span class="blink">:</span>${formatTime(now.getMinutes())}<span class="blink">:</span>${formatTime(now.getSeconds())}`;
}, 1000);

let countdownInterval;

countdownInput.addEventListener('change', (e) => {
    clearInterval(countdownInterval);
    const targetDate = new Date(e.target.value).getTime();

    countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            clearInterval(countdownInterval);
            countdownResult.textContent = "Час вийшов!";
            return;
        }

        const d = Math.floor(distance / (1000 * 60 * 60 * 24));
        const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((distance % (1000 * 60)) / 1000);

        countdownResult.textContent = `${d}д ${h}г ${m}хв ${s}с`;
    }, 1000);
});

let bdayInterval;

bdayInput.addEventListener('change', (e) => {
    clearInterval(bdayInterval);
    
    bdayInterval = setInterval(() => {
        const now = new Date();
        const bdayDate = new Date(e.target.value);
        
        bdayDate.setFullYear(now.getFullYear());
        
        if (now > bdayDate) {
            bdayDate.setFullYear(now.getFullYear() + 1);
        }

        const distance = bdayDate.getTime() - now.getTime();
        
        const d = Math.floor(distance / (1000 * 60 * 60 * 24));
        const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((distance % (1000 * 60)) / 1000);
        
        const months = Math.floor(d / 30);
        const days = d % 30;

        bdayResult.textContent = `${months} міс, ${days} дн, ${h} год, ${m} хв, ${s} сек`;
    }, 1000);
});