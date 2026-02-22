const title = document.getElementById('main-title');
title.innerText = "Hello, World!";

const listItems = document.querySelectorAll('ul li');

const button = document.getElementById('action-button');

const studentName = "John Javascript";

listItems.forEach(item => {
    item.onmousedown = function() {
        displayStudentName();
    }
});

button.onmousedown = displayStudentName;

function displayStudentName() {
    button.innerText = studentName;
    console.log("Ім'я студента: " + studentName);
}