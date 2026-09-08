// DOM Elements
const authSection = document.getElementById('auth-section');
const appSection = document.getElementById('app-section');
const authForm = document.getElementById('auth-form');
const logoutBtn = document.getElementById('logout-btn');
const usernameInput = document.getElementById('username');

// Initialize application state
const initApp = () => {
    checkAuthStatus();
};

// Check if user exists in LocalStorage
const checkAuthStatus = () => {
    const currentUser = localStorage.getItem('currentUser');
    
    if (currentUser) {
        showApp();
    } else {
        showAuth();
    }
};

const showAuth = () => {
    appSection.classList.add('hidden');
    authSection.classList.remove('hidden');
};

// Handle Login
authForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent page reload
    
    const username = usernameInput.value.trim();
    
    if (username) {
        // Save user to LocalStorage (Fake Auth)
        localStorage.setItem('currentUser', username);
        authForm.reset();
        showApp();
    }
});

// Handle Logout
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    showAuth();
});

// Start the app when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initApp);














// State to hold our fetched users
let allUsers = [];
const usersGrid = document.getElementById('users-grid');


const fetchUsers = async () => {
    try {
        usersGrid.innerHTML = '<p>Loading friends...</p>';

        const response = await fetch('https://randomuser.me/api/?results=60');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        allUsers = data.results; 


        restoreStateFromURL();
        

        applyFiltersAndSort();
        
    } catch (error) {
        console.error('Fetch error:', error);
        usersGrid.innerHTML = `
            <div style="text-align: center; color: #e74c3c; grid-column: 1 / -1;">
                <h3>Oops! Something went wrong.</h3>
                <p>Could not load friends: ${error.message}</p>
            </div>
        `;
    }
};
// Pure function to create HTML string for a single user card
const createUserCardHTML = (user) => {
    const picture = user.picture.large;
    const name = `${user.name.first} ${user.name.last}`;
    const age = user.dob.age;
    const email = user.email;
    const phone = user.phone;
    const city = user.location.city;
    const gender = user.gender.toUpperCase();

    // Check if user is already in favorites
    const savedFavorites = JSON.parse(localStorage.getItem('favoriteFriends')) || [];
    const isFavorite = savedFavorites.some(fav => fav.email === email);
    const heartIcon = isFavorite ? '❤️' : '🤍';
    const activeClass = isFavorite ? 'active' : '';

    return `
        <div class="user-card">
            <img src="${picture}" alt="${name}" class="user-card__img">
            <h3 class="user-card__name">${name}</h3>
            <p class="user-card__info" style="font-size: 0.8rem; font-weight: bold;">${gender}</p>
            <p class="user-card__info"><strong>Age:</strong> ${age}</p>
            <p class="user-card__info"><strong>Location:</strong> ${city}</p>
            <p class="user-card__info"><strong>Email:</strong> ${email}</p>
            <p class="user-card__info"><strong>Phone:</strong> ${phone}</p>
            
            <button class="user-card__fav-btn ${activeClass}" data-email="${email}">
                ${heartIcon} ${isFavorite ? 'Saved' : 'Save'}
            </button>
        </div>
    `;
};

// Function to render the array of users to the DOM
const renderUsers = (usersArray) => {
    if (usersArray.length === 0) {
        usersGrid.innerHTML = '<p style="grid-column: 1 / -1; text-align: center;">No friends found matching your criteria.</p>';
        return;
    }

    // Using functional map and join to create the full HTML string
    const usersHTML = usersArray.map(createUserCardHTML).join('');
    usersGrid.innerHTML = usersHTML;
};

// UPDATE the existing showApp function to trigger the fetch
const showApp = () => {
    authSection.classList.add('hidden');
    appSection.classList.remove('hidden');
    
    // Only fetch if we haven't loaded the data yet
    if (allUsers.length === 0) {
        fetchUsers();
    }
};














// --- Utils ---
// Pure function for debouncing
const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(null, args);
        }, delay);
    };
};

// --- DOM Elements for Filters & Sorting ---
const searchInput = document.getElementById('search-input');
const ageMinInput = document.getElementById('age-min');
const ageMaxInput = document.getElementById('age-max');
const genderRadios = document.querySelectorAll('input[name="gender"]');
const sortSelect = document.getElementById('sort-select');
const resetFiltersBtn = document.getElementById('reset-filters-btn');

// --- Pure Functions for Data Manipulation ---

// Filter by name
const filterByName = (users, searchTerm) => {
    if (!searchTerm) return users;
    const lowerTerm = searchTerm.toLowerCase();
    return users.filter(user => {
        const fullName = `${user.name.first} ${user.name.last}`.toLowerCase();
        return fullName.includes(lowerTerm);
    });
};

// Filter by age
const filterByAge = (users, min, max) => {
    return users.filter(user => {
        const age = user.dob.age;
        const isAboveMin = min ? age >= parseInt(min, 10) : true;
        const isBelowMax = max ? age <= parseInt(max, 10) : true;
        return isAboveMin && isBelowMax;
    });
};

// Filter by gender
const filterByGender = (users, gender) => {
    if (!gender || gender === 'all') return users;
    return users.filter(user => user.gender.toLowerCase() === gender.toLowerCase());
};

// Sort users (using pure approach by copying array first)
const sortUsers = (users, sortType) => {
    const usersCopy = [...users]; 
    
    switch (sortType) {
        case 'name-asc':
            return usersCopy.sort((a, b) => a.name.first.localeCompare(b.name.first));
        case 'name-desc':
            return usersCopy.sort((a, b) => b.name.first.localeCompare(a.name.first));
        case 'age-asc':
            return usersCopy.sort((a, b) => a.dob.age - b.dob.age);
        case 'age-desc':
            return usersCopy.sort((a, b) => b.dob.age - a.dob.age);
        default:
            return usersCopy;
    }
};
const USERS_PER_PAGE = 30;
// --- Core Logic to Apply All Filters ---
const applyFiltersAndSort = () => {
    const searchTerm = searchInput.value.trim();
    const minAge = ageMinInput.value;
    const maxAge = ageMaxInput.value;
    
    let selectedGender = 'all';
    genderRadios.forEach(radio => {
        if (radio.checked) selectedGender = radio.value;
    });

    const sortValue = sortSelect.value;

    let processedUsers = filterByName(allUsers, searchTerm);
    processedUsers = filterByAge(processedUsers, minAge, maxAge);
    processedUsers = filterByGender(processedUsers, selectedGender);
    processedUsers = sortUsers(processedUsers, sortValue);

    const totalPages = Math.ceil(processedUsers.length / USERS_PER_PAGE);

    if (currentPage > totalPages) currentPage = totalPages || 1;

    const startIndex = (currentPage - 1) * USERS_PER_PAGE;
    const paginatedUsers = processedUsers.slice(startIndex, startIndex + USERS_PER_PAGE);

    renderUsers(paginatedUsers);
    
    updatePaginationUI(totalPages);
    updateURLParams();

};

// --- Event Listeners ---

// Apply debounce to search input (e.g., 500ms delay)
const debouncedSearch = debounce(applyFiltersAndSort, 500);
searchInput.addEventListener('input', debouncedSearch);

// Other inputs can trigger immediately
ageMinInput.addEventListener('input', applyFiltersAndSort);
ageMaxInput.addEventListener('input', applyFiltersAndSort);
genderRadios.forEach(radio => radio.addEventListener('change', applyFiltersAndSort));
sortSelect.addEventListener('change', applyFiltersAndSort);

// Handle Reset Button
resetFiltersBtn.addEventListener('click', () => {
    searchInput.value = '';
    ageMinInput.value = '';
    ageMaxInput.value = '';
    document.querySelector('input[name="gender"][value="all"]').checked = true;
    sortSelect.value = 'default';
    
    applyFiltersAndSort();
});














// --- URL API & History API ---

// Update the URL based on current input values
const updateURLParams = () => {
    const url = new URL(window.location);
    
    // Set or delete URL parameters based on inputs
    searchInput.value ? url.searchParams.set('search', searchInput.value) : url.searchParams.delete('search');
    ageMinInput.value ? url.searchParams.set('minAge', ageMinInput.value) : url.searchParams.delete('minAge');
    ageMaxInput.value ? url.searchParams.set('maxAge', ageMaxInput.value) : url.searchParams.delete('maxAge');
    
    const selectedGender = document.querySelector('input[name="gender"]:checked').value;
    selectedGender !== 'all' ? url.searchParams.set('gender', selectedGender) : url.searchParams.delete('gender');
    
    sortSelect.value !== 'default' ? url.searchParams.set('sort', sortSelect.value) : url.searchParams.delete('sort');

    // Update the browser URL without reloading the page
    window.history.pushState({}, '', url);
};

// Read the URL and set inputs accordingly on load
const restoreStateFromURL = () => {
    const params = new URLSearchParams(window.location.search);
    let hasFilters = false;

    if (params.has('search')) { searchInput.value = params.get('search'); hasFilters = true; }
    if (params.has('minAge')) { ageMinInput.value = params.get('minAge'); hasFilters = true; }
    if (params.has('maxAge')) { ageMaxInput.value = params.get('maxAge'); hasFilters = true; }
    if (params.has('gender')) { 
        const gender = params.get('gender');
        const radio = document.querySelector(`input[name="gender"][value="${gender}"]`);
        if (radio) radio.checked = true;
        hasFilters = true; 
    }
    if (params.has('sort')) { sortSelect.value = params.get('sort'); hasFilters = true; }

    return hasFilters;
};














// --- Pagination & Infinite Scroll ---

let currentPage = 1;
let isFetching = false;
const loader = document.getElementById('loader');
const paginationContainer = document.getElementById('pagination');

// Pure function to generate pagination HTML
const generatePaginationHTML = (activePage) => {
    // Create an array of page numbers from 1 to activePage (e.g., [1, 2, 3])
    const pages = Array.from({ length: activePage }, (_, i) => i + 1);
    
    return pages.map(page => {
        // Highlight the currently active page
        const activeStyle = page === activePage ? 'background-color: var(--primary-color);' : '';
        return `<button class="auth__btn" style="padding: 0.5rem 1rem; margin: 0 0.2rem; cursor: default; ${activeStyle}">${page}</button>`;
    }).join('');
};


const updatePaginationUI = (totalPages) => {

    if (totalPages <= 1) {
        paginationContainer.innerHTML = '';
        return;
    }

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    
    paginationContainer.innerHTML = pages.map(page => {
        const activeStyle = page === currentPage ? 'background-color: var(--primary-color); color: white;' : '';
        return `<button class="pagination-btn auth__btn" data-page="${page}" style="padding: 0.5rem 1rem; margin: 0 0.2rem; cursor: pointer; ${activeStyle}">${page}</button>`;
    }).join('');
};

// Function to fetch the next page of users
const fetchMoreUsers = async () => {
    // Prevent multiple simultaneous fetches
    if (isFetching) return; 
    
    isFetching = true;
    loader.classList.remove('hidden');

    try {
        currentPage++;
        // Fetch next 30 users using the 'page' query parameter
        const response = await fetch(`https://randomuser.me/api/?results=60&page=${currentPage}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Append new users to the existing state without mutating the original array directly
        allUsers = [...allUsers, ...data.results];
        
        // Re-apply existing filters and sort so new users are also filtered
        applyFiltersAndSort();
        updatePaginationUI();
        
    } catch (error) {
        console.error('Error fetching more users:', error);
    } finally {
        loader.classList.add('hidden');
        isFetching = false;
    }
};

// Setup Intersection Observer to watch the loader element
const setupScrollObserver = () => {
    const observer = new IntersectionObserver((entries) => {
        const firstEntry = entries[0];
        
        // If the loader is visible and we already have some users loaded, fetch more
        if (firstEntry.isIntersecting && allUsers.length > 0) {
            fetchMoreUsers();
        }
    }, { 
        // Trigger the fetch when the user is 150px away from the loader
        rootMargin: '150px' 
    });

    observer.observe(loader);
};

// Initialize the observer
setupScrollObserver();











// --- Favorites Logic ---

// Pure function to calculate the new favorites array
const getUpdatedFavorites = (currentFavorites, targetUser) => {
    const isAlreadyFav = currentFavorites.some(fav => fav.email === targetUser.email);
    
    if (isAlreadyFav) {
        // Remove from favorites using pure filter
        return currentFavorites.filter(fav => fav.email !== targetUser.email);
    } else {
        // Add to favorites using spread operator
        return [...currentFavorites, targetUser];
    }
};

// Handle clicks on favorite buttons using event delegation
usersGrid.addEventListener('click', (e) => {
    const favBtn = e.target.closest('.user-card__fav-btn');
    
    // If click was not on a favorite button, do nothing
    if (!favBtn) return;
    
    const userEmail = favBtn.getAttribute('data-email');
    
    // Find the full user object from our current fetched state
    const userToToggle = allUsers.find(u => u.email === userEmail);
    if (!userToToggle) return;

    // Get current favorites from LocalStorage
    const currentFavorites = JSON.parse(localStorage.getItem('favoriteFriends')) || [];
    
    // Get the updated array using our pure function
    const updatedFavorites = getUpdatedFavorites(currentFavorites, userToToggle);
    
    // Save back to LocalStorage
    localStorage.setItem('favoriteFriends', JSON.stringify(updatedFavorites));
    
    // Re-render the UI so the button updates its state (red heart / white heart)
    applyFiltersAndSort();
});


paginationContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('pagination-btn')) {

        currentPage = Number(e.target.dataset.page);
        

        applyFiltersAndSort(); 
        

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});