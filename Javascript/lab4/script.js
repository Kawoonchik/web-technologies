function task1() {
    console.log("Завдання 1");

    let fruits = ['кавун', 'яблуко', 'виноград', 'ківі'];
    console.log("Початковий масив:", fruits);

    fruits.pop();
    console.log("Після видалення останнього елемента:", fruits);

    fruits.unshift('ананас');
    console.log("Після додавання ананаса:", fruits);

    fruits.sort().reverse();
    console.log("Відсортовано у зворотньому порядку:", fruits);

    let appleIndex = fruits.indexOf('яблуко');
    console.log("Індекс елемента 'яблуко':", appleIndex);
}

function task2() {
    console.log("Завдання 2");
    let colors = ['червоний', 'зелений', 'синій', 'жовтий'];
    console.log("Початковий масив:", colors);

    let longetstColor = colors.reduce((longest, current) => longest.length >= current.length ? longest : current);
    let shortestColor = colors.reduce((shortest, current) => shortest.length <= current.length ? shortest : current);

    console.log("Найдовший колір:", longetstColor);
    console.log("Найкоротший колір:", shortestColor);

    let blueColors = colors.filter(color => color.includes('синій'));
    console.log("Сині кольори:", blueColors);

    let colorString = colors.join(', ');
    console.log("Рядок з кольорів:", colorString);
}

function task3() {
    console.log("Завдання 3");
    let employees = [
        { name: 'Іван', age: 30, position: 'Програміст' },
        { name: 'Марія', age: 25, position: 'Менеджер' },
        { name: 'Петро', age: 35, position: 'Дизайнер' },
        { name: 'Олена', age: 28, position: 'Аналітик' }
    ];

    employees.sort((a, b) => a.name.localeCompare(b.name));
    console.log("Відсортовані співробітники:", employees);

    let developers = employees.filter(employee => employee.position === 'Програміст');
    console.log("Програмісти:", developers);

    employees = employees.filter(employee => employee.age >= 30);
    console.log("Співробітники віком 30 і більше:", employees);

    employees.push({ name: 'Сергій', age: 32, position: 'Тестувальник' });
    console.log("Після додавання нового співробітника:", employees);
}

function task4() {
    console.log("Завдання 4");

    let students = [
        { name: 'Анна', age: 19, course: 2 },
        { name: 'Борис', age: 20, course: 2 },
        { name: 'Олексій', age: 18, course: 1 },
        { name: 'Ганна', age: 21, course: 3 }
    ];
    console.log("Студенти:", students);
}


task1();
task2();
task3();