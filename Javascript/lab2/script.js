// --- 1.1 Знайти максимальний та мінімальний елементи ---
function getMinMax(arr) {
    // У JS є вбудований об'єкт Math (як <cmath> у C++).
    // Оператор '...' (spread) "розпаковує" масив, передаючи числа як окремі аргументи
    let maxVal = Math.max(...arr); 
    let minVal = Math.min(...arr);
    
    // Повертаємо об'єкт із двома значеннями (у C++ для цього б робили struct або std::pair)
    return { max: maxVal, min: minVal };
}

console.log("Min/Max:", getMinMax([5, 12, -3, 8, 100])); // Виведе: {max: 100, min: -3}


// --- 1.2 Порівняти два об'єкти за їхніми властивостями ---
// У JS не можна просто написати obj1 == obj2 (це порівняє вказівники на пам'ять, як у C++)
// Тому пишемо функцію для порівняння "нутрощів" (полів).
function compareObjects(obj1, obj2) {
    let keys1 = Object.keys(obj1); // Отримуємо масив ключів першого об'єкта
    let keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    // Перевіряємо, чи співпадають значення для кожного ключа
    for (let key of keys1) {
        if (obj1[key] !== obj2[key]) {
            return false;
        }
    }
    return true;
}

const student1 = { name: "Іван", age: 20 };
const student2 = { name: "Іван", age: 20 };
const student3 = { name: "Степан", age: 21 };

console.log("Порівняння 1 і 2:", compareObjects(student1, student2)); // true
console.log("Порівняння 1 і 3:", compareObjects(student1, student3)); // false

// --- 2.1 Перевірка, чи число в діапазоні ---
function isNumberInRange(num, min, max) {
    // Логічне "І" (&&)
    return (num >= min && num <= max);
}

console.log("Чи 15 в діапазоні [10, 20]:", isNumberInRange(15, 10, 20)); // true
console.log("Чи 5 в діапазоні [10, 20]:", isNumberInRange(5, 10, 20));  // false


// --- 2.2 Використання логічного NOT (!) ---
let isRegistered = true;
console.log("Початковий стан:", isRegistered); // true

// Змінюємо стан на протилежний
isRegistered = !isRegistered; 
console.log("Після NOT (!):", isRegistered); // false

// --- 3.1 Оцінка студента в словесному форматі (через IF) ---
function getGradeIf(score) {
    if (score >= 90 && score <= 100) {
        return "відмінно";
    } else if (score >= 75 && score < 90) {
        return "добре";
    } else if (score >= 60 && score < 75) {
        return "задовільно";
    } else {
        return "незадовільно";
    }
}

// --- 3.1 Оцінка студента (через тернарний оператор "?") ---
function getGradeTernary(score) {
    // Синтаксис: умова ? якщо_так : якщо_ні
    return (score >= 90 && score <= 100) ? "відмінно" :
           (score >= 75 && score < 90) ? "добре" :
           (score >= 60 && score < 75) ? "задовільно" : "незадовільно";
}

console.log("Оцінка 85 (if):", getGradeIf(85));       // добре
console.log("Оцінка 85 (ternary):", getGradeTernary(85)); // добре


// --- 3.2 Сезон за місяцем (Вкладені IF) ---
function getSeasonIf(monthNumber) {
    if (monthNumber === 12 || monthNumber === 1 || monthNumber === 2) {
        return "Зима";
    } else {
        // Вкладений if
        if (monthNumber >= 3 && monthNumber <= 5) {
            return "Весна";
        } else {
            // Ще один вкладений if
            if (monthNumber >= 6 && monthNumber <= 8) {
                return "Літо";
            } else {
                if (monthNumber >= 9 && monthNumber <= 11) {
                    return "Осінь";
                } else {
                    return "Некоректний місяць";
                }
            }
        }
    }
}

// --- 3.2 Сезон за місяцем (Вкладені тернарні оператори "?") ---
function getSeasonTernary(monthNumber) {
    return (monthNumber === 12 || monthNumber === 1 || monthNumber === 2) ? "Зима" :
           ((monthNumber >= 3 && monthNumber <= 5) ? "Весна" :
           ((monthNumber >= 6 && monthNumber <= 8) ? "Літо" :
           ((monthNumber >= 9 && monthNumber <= 11) ? "Осінь" : "Некоректний місяць")));
}

console.log("Місяць 4 (if):", getSeasonIf(4));            // Весна
console.log("Місяць 10 (ternary):", getSeasonTernary(10)); // Осінь