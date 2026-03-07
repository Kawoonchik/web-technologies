console.log("Завдання 1");
let count = 0, a= 0, b = 1, sum=0;
while (count < 10) {
    sum += a;
    let next = a + b;
    a = b;
    b = next;
    count++;
}
console.log("Сума перших 10 чисел Фібоначчі:", sum); // 88

console.log("\nЗавдання 2");    
function isPrime(num) {
    if (num <= 1) return false; // 0 і 1 не прості числа
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true; 
}
let sumOfPrimes = 0;
for (let i = 2; i < 1000; i++) {
    if (isPrime(i)) {
        sumOfPrimes += i;
    }
}
console.log("Сума простих чисел менших:", sumOfPrimes); // 76127

console.log("\nЗавдання 3");
function getDayOfWeek(dayNumber) {
    switch (dayNumber) {
        case 1: return "Понеділок";
        case 2: return "Вівторок";
        case 3: return "Середа";
        case 4: return "Четвер";
        case 5: return "П'ятниця";
        case 6: return "Субота";
        case 7: return "Неділя";
        default: return "Некоректний номер дня тижня";
    }
}
console.log("День 3:", getDayOfWeek(3)); // Середа

console.log("\nЗавдання 4");
function filterOddLeghtStrings(arr) {
    return arr.filter(str => str.length % 2 !== 0);
}
const strings = ["яблуко", "кіт", "JavaScript", "is", "fun"];
console.log("Масив слів:", strings);
console.log("Слова з непарною кількістю символів:", filterOddLeghtStrings(strings)); // ["яблуко", "JavaScript", "is", "fun"]

console.log("\nЗавдання 5");    
const incrementNumbers = (arr) => arr.map(num => num + 1);
const numbers = [1, 2, 3, 4, 5];
console.log("Початковий масив:", numbers);
console.log("Масив після інкременту:", incrementNumbers(numbers));

console.log("Завдання 6"); 
function checkTen(num1, num2) {
    return (num1 + num2 === 10) || (Math.abs(num1 + num2) === 10);
}
console.log("6 + 4:", checkTen(6, 4)); // true
console.log("-5 + 15:", checkTen(-5, 15)); // true
console.log("3 + 2:", checkTen(3, 2)); // false