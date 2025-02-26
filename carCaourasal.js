// Constants for pagination
const itemsPerPage = 4; // Number of items to display per page
let currentPageLatest = 1; // Current page for Latest Cars
let currentPageMostSearched = 1; // Current page for Most Searched Cars

// Global arrays for storing car data
let latestCars = [];
let mostSearchedCars = [];

// Default type for filtering Most Searched Cars
let selectedType = 'In Stock'; 

// Function to fetch car data from JSON
async function fetchCars() {
    try {
        const response = await fetch('cars.json'); // Adjust path if needed
        const cars = await response.json();
        
        latestCars = cars.filter(car => car.isLatest === true);// Assign to latest cars globally
        mostSearchedCars = cars.filter(car=>car.mostSearched ===true); // Assign to most searched cars globally
        
        renderLatestCars(); // Render cars for Latest Cars section
        renderMostSearchedCars(); // Render cars for Most Searched Cars section
    } catch (error) {
        console.error('Error fetching car data:', error);
    }
}
function renderLatestCars() {
    const carContainer = document.getElementById('latest-car-container');
    carContainer.innerHTML = ''; // Clear previous content

    const startIndex = (currentPageLatest - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, latestCars.length);

    for (let i = startIndex; i < endIndex; i++) {
        const car = latestCars[i];
        const carCard = document.createElement('div');
        carCard.className = 'bg-white rounded-xl overflow-hidden shadow-md h-full flex flex-col cursor-pointer';
        carCard.setAttribute('data-index', i);

        carCard.innerHTML = `
            <img src="${car.image}" alt="${car.name}" class="w-full h-40 object-cover">
            <div class="p-4 bg-gray-900 text-white flex flex-col flex-grow">
                <h3 class="text-lg font-semibold">${car.name}</h3>
                <p class="text-sm text-gray-400 flex-grow">${car.description}</p>
                <div class="mt-auto">
                    <span class="text-sm block">${car.mileage} • ${car.fuel} • ${car.transmission}</span>
                    <div class="flex justify-between items-center mt-4">
                        <span class="font-bold">${car.price}</span>
                        <span class="text-blue-400 hover:underline" onclick="openCarModal(${i})">View Details →</span>
                    </div>
                </div>
            </div>
        `;
        
        carContainer.appendChild(carCard);
    }

    renderLatestPagination(); // Render pagination for Latest Cars
}

function openCarModal(index) {
    const car = latestCars[index];
    const modal = document.getElementById('car-details-modal');
    const modalContent = document.getElementById('modal-content');

    // Clear previous content
    modalContent.innerHTML = '';

    // Insert new content
    modalContent.innerHTML = `
        <div>
            <img src="${car.image}" alt="${car.name}" class="w-full h-48 object-cover rounded">
            <h2 class="text-xl font-bold mt-4">${car.name}</h2>
            <p class="text-gray-600">${car.description}</p>
            <ul class="mt-3 text-gray-700">
                <li><strong>Price:</strong> ${car.price}</li>
                <li><strong>Mileage:</strong> ${car.mileage} miles</li>
                <li><strong>Fuel:</strong> ${car.fuel}</li>
                <li><strong>Transmission:</strong> ${car.transmission}</li>
                <li><strong>Year:</strong> ${car.year}</li>
            </ul>
            <button class="mt-4 bg-red-500 text-white px-4 py-2 rounded" onclick="closeCarModal()">Close</button>
        </div>
    `;

    modal.classList.remove('hidden');
}


// Function to close modal
function closeCarModal() {
    document.getElementById('car-details-modal').classList.add('hidden');
}


// Function to render pagination for Latest Cars
function renderLatestPagination() {
    const paginationContainer = document.getElementById('latest-pagination-container');
    paginationContainer.innerHTML = ''; // Clear previous pagination

    const totalPages = Math.ceil(latestCars.length / itemsPerPage);

    // Create 'Previous' button
    const prevButton = document.createElement('button');
    prevButton.innerText = '←';
    prevButton.disabled = currentPageLatest === 1;
    prevButton.addEventListener('click', () => {
        if (currentPageLatest > 1) {
            currentPageLatest--;
            renderLatestCars();
        }
    });
    paginationContainer.appendChild(prevButton);

    // Create page number buttons
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.innerText = i;
        pageButton.className = `p-2 mx-1 ${currentPageLatest === i ? 'bg-blue-600 text-white' : 'bg-gray-300'}`;
        pageButton.addEventListener('click', () => {
            currentPageLatest = i;
            renderLatestCars();
        });
        paginationContainer.appendChild(pageButton);
    }

    // Create 'Next' button
    const nextButton = document.createElement('button');
    nextButton.innerText = '→';
    nextButton.disabled = currentPageLatest === totalPages;
    nextButton.addEventListener('click', () => {
        if (currentPageLatest < totalPages) {
            currentPageLatest++;
            renderLatestCars();
        }
    });
    paginationContainer.appendChild(nextButton);
}


function renderMostSearchedCars() {
    const carContainer = document.getElementById('most-searched-car-container');
    carContainer.innerHTML = ''; // Clear previous content

    // Filter cars based on selectedType
    const filteredCars = selectedType === 'In Stock'
        ? mostSearchedCars
        : mostSearchedCars.filter(car => car.type === selectedType);

    // Calculate pagination indexes
    const startIndex = (currentPageMostSearched - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredCars.length);

    for (let i = startIndex; i < endIndex; i++) {
        const car = filteredCars[i];

        const carCard = document.createElement('div');
        carCard.className = 'bg-white rounded-xl overflow-hidden shadow-md h-full flex flex-col cursor-pointer';
        // (Optional: you can remove setting data-index if not used elsewhere)
        carCard.setAttribute('data-index', i);

        carCard.innerHTML = `
            <img src="${car.image}" alt="${car.name}" class="w-full h-40 object-cover">
            <div class="p-4 bg-gray-900 text-white flex flex-col flex-grow">
                <h3 class="text-lg font-semibold">${car.name}</h3>
                <p class="text-sm text-gray-400 flex-grow">${car.description}</p>
                <div class="mt-auto">
                    <span class="text-sm block">${car.mileage} • ${car.fuel} • ${car.transmission}</span>
                    <div class="flex justify-between items-center mt-4">
                        <span class="font-bold">${car.price}</span>
                        <!-- Pass the car's id instead of the index -->
                        <span class="text-blue-400 hover:underline" onclick="openMostSearchedCarModal(${car.id})">View Details →</span>
                    </div>
                </div>
            </div>
        `;

        carContainer.appendChild(carCard);
    }

    const totalPages = Math.ceil(filteredCars.length / itemsPerPage);
    renderMostSearchedPagination(totalPages); // Render pagination for Most Searched Cars
}


function renderMostSearchedPagination(totalPages) {
    const paginationContainer = document.getElementById('most-searched-pagination-container');
    paginationContainer.innerHTML = ''; // Clear previous pagination
    if (totalPages <= 1) return; // No need to show pagination if only one page

    // Create 'Previous' button
    const prevButton = document.createElement('button');
    prevButton.innerText = '←';
    prevButton.disabled = currentPageMostSearched === 1;
    prevButton.addEventListener('click', () => {
        if (currentPageMostSearched > 1) {
            currentPageMostSearched--;
            renderMostSearchedCars();
        }
    });
    paginationContainer.appendChild(prevButton);

    // Create page number buttons
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.innerText = i;
        pageButton.className = `p-2 mx-1 ${currentPageMostSearched === i ? 'bg-blue-600 text-white' : 'bg-gray-300'}`;
        pageButton.addEventListener('click', () => {
            currentPageMostSearched = i;
            renderMostSearchedCars();
        });
        paginationContainer.appendChild(pageButton);
    }

    // Create 'Next' button
    const nextButton = document.createElement('button');
    nextButton.innerText = '→';
    nextButton.disabled = currentPageMostSearched === totalPages;
    nextButton.addEventListener('click', () => {
        if (currentPageMostSearched < totalPages) {
            currentPageMostSearched++;
            renderMostSearchedCars();
        }
    });
    paginationContainer.appendChild(nextButton);
}




function openMostSearchedCarModal(carId) {
    carId = Number(carId); // Ensure it's a number
    console.log("Opening modal for car ID:", carId); // Debugging

    // Find the car in the mostSearchedCars array by id
    const car = mostSearchedCars.find(c => c.id === carId);
    if (!car) {
        console.error("Car not found!");
        return;
    }

    const modal = document.getElementById('mostSearchedCarModal');
    const modalContent = document.getElementById('mostSearchedCarModalContent');

    modalContent.innerHTML = `
        <div class="p-6">
            <h2 class="text-2xl font-bold">${car.name}</h2>
            <img src="${car.image}" alt="${car.name}" class="w-full h-60 object-cover mt-4">
            <p class="mt-2">${car.description}</p>
            <p class="mt-2"><strong>Mileage:</strong> ${car.mileage}</p>
            <p class="mt-2"><strong>Fuel Type:</strong> ${car.fuel}</p>
            <p class="mt-2"><strong>Transmission:</strong> ${car.transmission}</p>
            <p class="mt-2"><strong>Price:</strong> ${car.price}</p>
            <button onclick="closeMostSearchedCarModal()" class="mt-4 bg-red-500 text-white px-4 py-2 rounded">Close</button>
        </div>
    `;
    modal.classList.remove('hidden'); // Show the modal
}


function closeMostSearchedCarModal() {
    document.getElementById('mostSearchedCarModal').classList.add('hidden');
}



function scrollToMostSearchedCars() {
    const section = document.getElementById("most-cont");
    if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}

function goToMostSearchedType(type) {
    // Get all available types from the tab navigation
    const availableTypes = Array.from(document.querySelectorAll("#tab-navigation button"))
        .map(button => button.getAttribute("data-type"));

    // If the type doesn't exist, do nothing
    if (!availableTypes.includes(type)) {
        console.warn(`Type "${type}" not found in tabs.`);
        return;
    }

    // Set the selected type
    selectedType = type;

    // Update active tab styling
    document.querySelectorAll("#tab-navigation button").forEach(button => {
        if (button.getAttribute("data-type") === type) {
            button.classList.add("border-b-2", "border-blue-600", "text-blue-600", "font-semibold");
        } else {
            button.classList.remove("border-b-2", "border-blue-600", "text-blue-600", "font-semibold");
        }
    });

    // Scroll to most searched section
    scrollToMostSearchedCars();

    // Re-render the most searched cars
    renderMostSearchedCars();
}








// Add event listeners to tabs for filtering
document.querySelectorAll('#tab-navigation button').forEach(button => {
    button.addEventListener('click', () => {
        selectedType = button.getAttribute('data-type'); // Get the selected type
        currentPageMostSearched = 1; // Reset to the first page
        
        // Update active tab style
        document.querySelectorAll('#tab-navigation button').forEach(btn => {
            btn.classList.remove('border-b-2', 'border-blue-600', 'text-blue-600');
            btn.classList.add('text-gray-600'); // Change color back to default
        });

        // Set active class for the clicked button
        button.classList.add('border-b-2', 'border-blue-600', 'text-blue-600'); // Update active button style
        renderMostSearchedCars(); // Re-render the cars based on the selected type
    });
});

// Fetch car data on page load
document.addEventListener('DOMContentLoaded', fetchCars);