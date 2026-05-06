const grid = document.getElementById('card-grid');
const editBtn = document.getElementById('edit-btn');
const statusText = document.getElementById('status-text');

let isEditing = false;
let draggedElement = null;
let placeholder = document.createElement('div');
placeholder.className = 'placeholder';

const toggleEditMode = () => {
    isEditing = !isEditing;
    const cards = document.querySelectorAll('.card');
    
    if (isEditing) {
        grid.classList.add('edit-mode');
        editBtn.classList.add('active');
        editBtn.textContent = 'Готово';
        statusText.textContent = 'Перетягуйте картки або натискайте × щоб видалити';
        cards.forEach(card => card.setAttribute('draggable', 'true'));
    } else {
        grid.classList.remove('edit-mode');
        editBtn.classList.remove('active');
        editBtn.textContent = 'Редагувати';
        statusText.textContent = 'Натисніть «Редагувати» для керування картками';
        cards.forEach(card => card.setAttribute('draggable', 'false'));
    }
};

editBtn.addEventListener('click', toggleEditMode);

grid.addEventListener('click', (e) => {
    if (!isEditing) return;
    if (e.target.classList.contains('delete-btn')) {
        const card = e.target.closest('.card');
        if (card) {
            grid.removeChild(card);
        }
    }
});

grid.addEventListener('dragstart', (e) => {
    if (!isEditing || !e.target.classList.contains('card')) {
        e.preventDefault();
        return;
    }
    
    draggedElement = e.target;
    e.dataTransfer.effectAllowed = 'move';
    
    setTimeout(() => {
        draggedElement.classList.add('dragging');
        draggedElement.parentNode.insertBefore(placeholder, draggedElement.nextSibling);
        draggedElement.style.display = 'none';
    }, 0);
});

grid.addEventListener('dragover', (e) => {
    e.preventDefault();
    if (!isEditing || !draggedElement) return;

    e.dataTransfer.dropEffect = 'move';
    
    const targetCard = e.target.closest('.card');
    if (targetCard && targetCard !== draggedElement && targetCard !== placeholder) {
        const rect = targetCard.getBoundingClientRect();
        const next = (e.clientX - rect.left) / (rect.right - rect.left) > 0.5;
        grid.insertBefore(placeholder, next && targetCard.nextSibling ? targetCard.nextSibling : targetCard);
    }
});

grid.addEventListener('dragend', () => {
    if (!draggedElement) return;
    
    draggedElement.classList.remove('dragging');
    draggedElement.style.display = 'flex';
    
    if (placeholder.parentNode) {
        placeholder.parentNode.insertBefore(draggedElement, placeholder);
        placeholder.parentNode.removeChild(placeholder);
    }
    
    draggedElement = null;
});