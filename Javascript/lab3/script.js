function getMinMax(arr) {
    let maxVal = Math.max(...arr); 
    let minVal = Math.min(...arr);
    
    return { max: maxVal, min: minVal };
}

console.log("Min/Max:", getMinMax([5, 12, -3, 8, 100])); 

function compareObjects(obj1, obj2) {
    let keys1 = Object.keys(obj1); 
    let keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

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

function isNumberInRange(num, min, max) {
    return (num >= min && num <= max);
}

console.log("Чи 15 в діапазоні [10, 20]:", isNumberInRange(15, 10, 20)); // true
console.log("Чи 5 в діапазоні [10, 20]:", isNumberInRange(5, 10, 20));  // false


let isRegistered = true;
console.log("Початковий стан:", isRegistered); // true

isRegistered = !isRegistered; 
console.log("Після NOT (!):", isRegistered); // false

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

function getGradeTernary(score) {
    // умова ? якщотак : якщоні
    return (score >= 90 && score <= 100) ? "відмінно" :
           (score >= 75 && score < 90) ? "добре" :
           (score >= 60 && score < 75) ? "задовільно" : "незадовільно";
}

console.log("Оцінка 85 (if):", getGradeIf(85));       
console.log("Оцінка 85 (ternary):", getGradeTernary(85)); 

function getSeasonIf(monthNumber) {
    if (monthNumber === 12 || monthNumber === 1 || monthNumber === 2) {
        return "Зима";
    } else {
        if (monthNumber >= 3 && monthNumber <= 5) {
            return "Весна";
        } else {
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

function getSeasonTernary(monthNumber) {
    return (monthNumber === 12 || monthNumber === 1 || monthNumber === 2) ? "Зима" :
           ((monthNumber >= 3 && monthNumber <= 5) ? "Весна" :
           ((monthNumber >= 6 && monthNumber <= 8) ? "Літо" :
           ((monthNumber >= 9 && monthNumber <= 11) ? "Осінь" : "Некоректний місяць")));
}

console.log("Місяць 4 (if):", getSeasonIf(4));            
console.log("Місяць 10 (ternary):", getSeasonTernary(10)); 