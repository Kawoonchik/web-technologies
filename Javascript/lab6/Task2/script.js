let tasks = [];
let currentSort = 'createdAt';

const addTask = (tasksArray, title) => [
    ...tasksArray,
    {
        id: Date.now().toString(),
        title: title,
        isCompleted: false,
        createdAt: Date.now(),
        updatedAt: Date.now()
    }
];

const deleteTask = (tasksArray, id) => tasksArray.filter(task => task.id !== id);

const toggleTaskStatus = (tasksArray, id) => tasksArray.map(task =>
    task.id === id 
        ? { ...task, isCompleted: !task.isCompleted, updatedAt: Date.now() } 
        : task
);

const updateTaskText = (tasksArray, id, newTitle) => tasksArray.map(task =>
    task.id === id && task.title !== newTitle
        ? { ...task, title: newTitle, updatedAt: Date.now() }
        : task
);

const sortTasks = (tasksArray, sortBy) => {
    const copy = [...tasksArray];
    
    switch (sortBy) {
        case 'createdAt':
            return copy.sort((a, b) => b.createdAt - a.createdAt);
        case 'updatedAt':
            return copy.sort((a, b) => b.updatedAt - a.updatedAt);
        case 'status':
            return copy.sort((a, b) => Number(a.isCompleted) - Number(b.isCompleted));
        default:
            return copy;
    }
};

const todoList = document.getElementById('todo-list');
const todoForm = document.getElementById('todo-form');
const taskInput = document.getElementById('task-input');
const sortSelect = document.getElementById('sort-select');

const renderTasks = (tasksToRender) => {
    todoList.innerHTML = '';

    tasksToRender.forEach(task => {
        const li = document.createElement('li');
        li.className = `todo-item ${task.isCompleted ? 'completed' : ''}`;
        li.dataset.id = task.id;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-checkbox';
        checkbox.checked = task.isCompleted;

        checkbox.addEventListener('change', () => {
            handleToggleStatus(task.id);
        });

        const textSpan = document.createElement('span');
        textSpan.className = 'task-text';
        textSpan.contentEditable = !task.isCompleted; 
        textSpan.appendChild(document.createTextNode(task.title));

        textSpan.addEventListener('blur', (e) => {
            const newText = e.target.textContent.trim();
            if (newText.length > 0) {
                handleUpdateText(task.id, newText);
            } else {
                e.target.textContent = task.title;
            }
        });

        textSpan.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                textSpan.blur(); 
            }
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn-delete';
        deleteBtn.appendChild(document.createTextNode('Видалити'));
        
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation(); 
            handleDeleteWithAnimation(task.id, li);
        });

        li.appendChild(checkbox); 
        li.appendChild(textSpan);
        li.appendChild(deleteBtn);
        
        todoList.appendChild(li);
    });
};

const updateView = () => {
    const processedTasks = sortTasks(tasks, currentSort);
    renderTasks(processedTasks);
};

todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = taskInput.value.trim();
    
    if (title.length >= 3) {
        tasks = addTask(tasks, title);
        taskInput.value = '';
        updateView();
    }
});

sortSelect.addEventListener('change', (e) => {
    currentSort = e.target.value;
    updateView();
});

const handleToggleStatus = (id) => {
    tasks = toggleTaskStatus(tasks, id);
    updateView();
};

const handleUpdateText = (id, newText) => {
    tasks = updateTaskText(tasks, id, newText);
    updateView();
};

const handleDeleteWithAnimation = (id, domElement) => {
    domElement.classList.add('removing');
    
    setTimeout(() => {
        tasks = deleteTask(tasks, id);
        updateView();
    }, 300);
};

updateView();