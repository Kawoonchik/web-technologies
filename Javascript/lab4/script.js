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

    students = students.filter(student => student.name !== 'Анна');

    students.push({ name: 'Єгорчик', age: 19, course: 2 });

    students.sort((a, b) => b.age - a.age);
    console.log("Студенти після сортування за віком:", students);

    let thirdCourseStudent = students.find(student => student.course === 3);
    console.log("Студент 3-го курсу:", thirdCourseStudent);
}

function task5() {
    console.log("Завдання 5");

    let numbers = [1, 2, 3, 4, 5];
    console.log("Початковий масив:", numbers);

    let squaredNumbers = numbers.map(num => num * num);
    console.log("Квадрати чисел:", squaredNumbers);

    let evenNumbers = numbers.filter(num => num % 2 === 0);
    console.log("Парні числа:", evenNumbers);

    let sum = numbers.reduce((acc, num) => acc + num, 0);
    console.log("Сума чисел:", sum);

    let moreNumbers = [6, 7, 8, 9, 10];
    let allNumbers = numbers.concat(moreNumbers);
    console.log("Об'єднаний масив:", allNumbers);

    allNumbers.splice(0,3);
    console.log("Після видалення перших трьох елементів:", allNumbers);
}

function library() {
    console.log("Завдання 6");
    let library = [
        { title: 'Гаррі Поттер і філософський камінь', author: 'Джоан Роулінг', genre: "Фантастика", year: 1997, pages: 208, isAvailable: true },
        { title: 'Кобзар', author: 'Тарас Шевченко', genre: "Лірика", year: 1840, pages: 186, isAvailable: true },
        { title: '1984', author: 'Джордж Орвелл', genre: "Антиутопія", year: 1949, pages: 328, isAvailable: true }
    ];

    function addBook(title, author, genre, year, pages, isAvailable) {
        library.push({ title, author, genre, year, pages, isAvailable });
    }

    function removeBook(title) {
        library = library.filter(book => book.title !== title);
    }

    function findBooksByAuthor(author) {
        return library.filter(book => book.author === author);
    }
    
    function toggleAvailability(title, isBorrowed) {
        let book = library.find(book => book.title === title);
        if (book) {
            book.isAvailable = !isBorrowed;
        }
    }

    function sortBooksByPages() {
        library.sort((a, b) => a.pages - b.pages);
    }
    
    function getBooksStatistics() {
        let totalBooks = library.length;
        let availableBooks = library.filter(book => book.isAvailable).length;
        let borrowedBooks = totalBooks - availableBooks;

        let totalPages = library.reduce((acc, book) => acc + book.pages, 0);
        let averagePages = totalBooks === 0 ? 0 : totalPages / totalBooks;
        return { totalBooks, availableBooks, borrowedBooks, totalPages, averagePages };
    }
    addBook('Тіні забутих предків', 'Михайло Коцюбинський', "Пригоди", 1911, 120, true);
    toggleAvailability('1984', true);
    sortBooksByPages();

    console.log("Статистика бібліотеки:", getBooksStatistics());
    console.log("Книги в бібліотеці:", library);
}

function task7() {
    console.log("Завдання 7");

    let student = {
        name: 'Олександр',
        age: 20,
        course: 2
    };
    console.log("Початковий об'єкт:", student);

    student.subjects = ['Математика', 'Фізика', 'Інформатика'];
    console.log("Після додавання властивості subjects:", student);

    delete student.age;

    console.log("Після видалення властивості age:", student);
}

task1();
task2();
task3();
task4();
task5();
library();
task7();
