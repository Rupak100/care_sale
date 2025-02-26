const itemsPerPage = 4; // Number of items to display per page
let currentPage = 1;
let cars = [];
let selectedType = 'In Stock'; // Default type

async function fetchCars() {
    try {
        const response = await fetch('cars.json'); // Adjust path if needed
        cars = await response.json();
        renderCars();
        renderTabs();
        renderPagination();
    } catch (error) {
        console.error('Error fetching car data:', error);
    }
}

// Function to render car cards based on the selected type
function renderCars() {
    const carContainer = document.getElementById('car-container');
    carContainer.innerHTML = '';
    
    // Filter cars based on selectedType
    const filteredCars = selectedType === 'In Stock' ? cars : cars.filter(car => car.type === selectedType);

    // Paginate filtered cars
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredCars.length);

    for (let i = startIndex; i < endIndex; i++) {
        const car = filteredCars[i];
        const carCard = document.createElement('div');
        carCard.className = 'bg-white rounded-xl shadow-lg overflow-hidden';

        carCard.innerHTML = `
            <div class="relative">
                <img src="${car.image}" alt="${car.name}" class="w-full h-40 object-cover">
                ${car.label ? `<span class="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 text-xs rounded">${car.label}</span>` : ''}
                <button class="absolute top-2 right-2 bg-white p-1 rounded-full shadow">🔖</button>
            </div>
            <div class="p-4 bg-gray-900 text-white">
                <h3 class="text-lg font-semibold">${car.name}</h3>
                <p class="text-sm opacity-80">${car.description}</p>
                <div class="flex justify-between text-xs mt-3">
                    <span>${car.mileage}</span>
                    <span>${car.fuel}</span>
                    <span>${car.transmission}</span>
                </div>
                <div class="flex justify-between items-center mt-4">
                    <span class="text-xl font-bold">${car.price}</span>
                    <button class="text-white underline">View Details →</button>
                </div>
            </div>
        `;

        carContainer.appendChild(carCard);
    }
}

// Function to render tabs for filtering cars
function renderTabs() {
    const tabButtons = document.querySelectorAll('#tab-navigation button');
    tabButtons.forEach(button => {
        button.classList.remove('border-b-2', 'border-blue-600', 'text-blue-600');
        if (button.getAttribute('data-type') === selectedType) {
            button.classList.add('border-b-2', 'border-blue-600', 'text-blue-600');
        }
        button.addEventListener('click', () => {
            selectedType = button.getAttribute('data-type');
            currentPage = 1; // Reset to the first page
            renderCars();
            renderPagination();
        });
    });
}

// Function to handle pagination (add pagination logic if needed)
function renderPagination() {
    const paginationContainer = document.getElementById('pagination-container');
    paginationContainer.innerHTML = ''; // Clear existing buttons

    const filteredCars = selectedType === 'In Stock' ? cars : cars.filter(car => car.type === selectedType);
    const totalPages = Math.ceil(filteredCars.length / itemsPerPage);

    // Previous Button
    const prevButton = document.createElement('button');
    prevButton.innerText = '←';
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderCars();
            renderPagination();
        }
    });
    paginationContainer.appendChild(prevButton);

    // Page Numbers
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.innerText = i;
        pageButton.className = `${currentPage === i ? 'bg-blue-600 text-white' : 'bg-gray-300'} rounded-full p-2 mx-1`;
        pageButton.addEventListener('click', () => {
            currentPage = i;
            renderCars();
            renderPagination();
        });
        paginationContainer.appendChild(pageButton);
    }

    // Next Button
    const nextButton = document.createElement('button');
    nextButton.innerText = '→';
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderCars();
            renderPagination();
        }
    });
    paginationContainer.appendChild(nextButton);
}

// Fetch cars data on page load
document.addEventListener('DOMContentLoaded', fetchCars);