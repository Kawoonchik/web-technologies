const tasks = document.querySelectorAll('.task');
const taskLists = document.querySelectorAll('.task-list');

tasks.forEach(task => {
    task.addEventListener('dragstart', (e) => {
        task.classList.add('dragging');
        e.dataTransfer.setData('text/plain', task.id);
        e.dataTransfer.effectAllowed = 'move';
    });

    task.addEventListener('dragend', () => {
        task.classList.remove('dragging');
    });
});

taskLists.forEach(list => {
    list.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        list.classList.add('drag-over');
    });

    list.addEventListener('dragleave', () => {
        list.classList.remove('drag-over');
    });

    list.addEventListener('drop', (e) => {
        e.preventDefault();
        list.classList.remove('drag-over');
        
        const taskId = e.dataTransfer.getData('text/plain');
        const draggedTask = document.getElementById(taskId);
        
        if (draggedTask) {
            list.appendChild(draggedTask);
        }
    });
});