
let plants = [];
let currentFilter = 'Усі';
let currentSort = null;


const addPlant = (plantsArray, newPlant) => [
    ...plantsArray, 
    {
        ...newPlant,
        id: Date.now().toString(),
        dateCreated: Date.now(),
        dateUpdated: Date.now()
    }
];


const updatePlant = (plantsArray, updatedPlant) => plantsArray.map(plant =>
    plant.id === updatedPlant.id 
        ? { ...plant, ...updatedPlant, dateUpdated: Date.now() } 
        : plant
);


const deletePlant = (plantsArray, id) => plantsArray.filter(plant => plant.id !== id);


const calculateTotal = (plantsArray) => plantsArray.reduce((sum, plant) => sum + Number(plant.price), 0);


const filterPlants = (plantsArray, category) => 
    category === 'Усі' ? plantsArray : plantsArray.filter(plant => plant.category === category);


const sortPlants = (plantsArray, sortBy) => {
    if (!sortBy) return plantsArray;
    return [...plantsArray].sort((a, b) => Number(a[sortBy]) - Number(b[sortBy]));
};


const productList = document.getElementById('product-list');
const totalPriceEl = document.getElementById('total-price');
const modal = document.getElementById('modal');
const form = document.getElementById('product-form');
const snackbar = document.getElementById('snackbar');
const modalTitle = document.getElementById('modal-title');


const renderPlants = (plantsToRender) => {
    productList.innerHTML = ''; 


    if (plantsToRender.length === 0) {
        productList.textContent = "Наразі список товарів пустий. Додайте новий товар.";
        totalPriceEl.textContent = `Загальна вартість: 0 ₴`;
        return;
    }

    plantsToRender.forEach(plant => {
        const card = document.createElement('div');
        card.className = 'product-card';


        const img = document.createElement('img');
        img.src = plant.image;
        img.alt = plant.title;
        img.className = 'product-image';
        card.appendChild(img);


        const title = document.createElement('h3');
        title.appendChild(document.createTextNode(plant.title));
        card.appendChild(title);

        const idEl = document.createElement('small');
        idEl.appendChild(document.createTextNode(`ID: ${plant.id}`));
        card.appendChild(idEl);


        const categoryEl = document.createElement('p');
        categoryEl.appendChild(document.createTextNode(`Категорія: ${plant.category}`));
        card.appendChild(categoryEl);


        const priceEl = document.createElement('p');
        priceEl.appendChild(document.createTextNode(`Ціна: ${plant.price} ₴`));
        priceEl.style.fontWeight = 'bold';
        card.appendChild(priceEl);

        const actions = document.createElement('div');
        actions.className = 'card-actions';


        const editBtn = document.createElement('button');
        editBtn.appendChild(document.createTextNode('Редагувати'));
        editBtn.onclick = () => openModal(plant); 
        actions.appendChild(editBtn);


        const deleteBtn = document.createElement('button');
        deleteBtn.appendChild(document.createTextNode('Видалити'));
        deleteBtn.className = 'reset-btn';
        deleteBtn.onclick = () => handleDelete(plant.id);
        actions.appendChild(deleteBtn);

        card.appendChild(actions);
        productList.appendChild(card);
    });


    totalPriceEl.textContent = `Загальна вартість: ${calculateTotal(plantsToRender)} ₴`;
};


const showSnackbarMessage = (message) => {
    snackbar.textContent = message;
    snackbar.className = "snackbar show";
    setTimeout(() => { snackbar.className = snackbar.className.replace("show", ""); }, 3000);
};

const updateView = () => {
    let processedPlants = filterPlants(plants, currentFilter);
    processedPlants = sortPlants(processedPlants, currentSort);
    renderPlants(processedPlants);
};


const handleDelete = (id) => {
    plants = deletePlant(plants, id);
    updateView();
    showSnackbarMessage("Товар успішно видалено!"); 
};


form.addEventListener('submit', (e) => {
    e.preventDefault(); 
    
    const plantData = {
        title: document.getElementById('title').value,
        price: document.getElementById('price').value,
        category: document.getElementById('category').value,
        image: document.getElementById('image').value,
    };
    const idField = document.getElementById('product-id').value;

    if (idField) {

        plants = updatePlant(plants, { ...plantData, id: idField });
        showSnackbarMessage(`Оновлено: ID ${idField}, ${plantData.title}`); 
    } else {

        plants = addPlant(plants, plantData);
        showSnackbarMessage("Новий товар додано!");
    }

    closeModalFunc();
    updateView();
});


const openModal = (plant = null) => {
    form.reset();
    if (plant) {
        modalTitle.textContent = 'Редагувати рослину';
        document.getElementById('product-id').value = plant.id;
        document.getElementById('title').value = plant.title;
        document.getElementById('price').value = plant.price;
        document.getElementById('category').value = plant.category;
        document.getElementById('image').value = plant.image;
    } else {
        modalTitle.textContent = 'Додати рослину';
        document.getElementById('product-id').value = '';
    }
    modal.classList.remove('hidden');
};

const closeModalFunc = () => { modal.classList.add('hidden'); };

document.getElementById('add-new-btn').addEventListener('click', () => openModal());
document.getElementById('close-modal').addEventListener('click', closeModalFunc);


document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        currentFilter = e.target.dataset.category;
        updateView();
    });
});
document.getElementById('reset-filter').addEventListener('click', () => { 
    currentFilter = 'Усі';
    updateView();
});

document.querySelectorAll('.sort-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        currentSort = e.target.dataset.sort;
        updateView();
    });
});
document.getElementById('reset-sort').addEventListener('click', () => { 
    currentSort = null;
    updateView();
});


updateView();