document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.getElementById('searchButton');
    searchButton.addEventListener('click', async function() {
        try {
            const response = await fetch('/Data/cars.json');
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            const cars = await response.json(); // This converts JSON data into JavaScript objects
            console.log(cars);          
            filterCars(cars);
        } catch (error) {
            console.error("Failed to fetch cars:", error);
            displayErrorMessage("Failed to load car data.");
        }
    });
});



function filterCars(cars) {

    const typeFilterValue = document.getElementById("typeFilter").value;
    const fuelFilterValue = document.getElementById("fuelFilter").value;
    const transmissionFilterValue = document.getElementById("transmissionFilter").value;

    const filteredCars = cars.filter(car => {
        return (typeFilterValue === "" || car.type === typeFilterValue) &&
               (fuelFilterValue === "" || car.fuel === fuelFilterValue) &&
               (transmissionFilterValue === "" || car.transmission === transmissionFilterValue);
    });

    displayCars(filteredCars);
}

function displayCars(filteredCars) {
    const resultsContainer = document.getElementById('carResults');
    resultsContainer.innerHTML = '';

    if (filteredCars.length === 0) {
        resultsContainer.innerHTML = "<p>No cars found.</p>";
        return;
    }

    filteredCars.forEach(car => {
        const carElement = document.createElement('div');
        carElement.className = 'bg-white shadow-md rounded-lg p-4 m-2 w-64';
        carElement.innerHTML = `
            <img src="${car.image}" alt="${car.name}" class="w-full h-40 object-cover rounded">
            <h3 class="text-lg font-bold mt-2">${car.name}</h3>
            <p>${car.description}</p>
            <p class="details">Mileage: ${car.mileage} - Fuel: ${car.fuel} - Transmission: ${car.transmission}</p>`;
        resultsContainer.appendChild(carElement);
    });
}

function displayErrorMessage(message) {
    const resultsContainer = document.getElementById('carResults');
    resultsContainer.innerHTML = `<p>${message}</p>`;
}



document.getElementById('showAllBrandsBtn').addEventListener('click', function() {
    const brandsContainer = document.getElementById('brandsContainer');
    brandsContainer.innerHTML = ''; // Clear previous content

    const brands = [
        { name: "Toyota", image: "assets/car_brands/icons8-toyota-50.png" },
        { name: "Mercedes-Benz", image: "assets/car_brands/icons8-mercedes-48.png" },
        { name: "BMW", image: "assets/car_brands/icons8-bmw-50.png" },
        { name: "Land Rover", image: "assets/car_brands/icons8-land-rover-48.png" },
        { name: "Volkswagen", image: "assets/car_brands/icons8-volkswagen-50.png" },
        { name: "Audi", image: "assets/car_brands/icons8-audi-50.png" },
        { name: "Mini Cooper", image: "assets/car_brands/icons8-mini-cooper-48.png" }
    ];

    // Creating a flex container for brands
    const flexContainer = document.createElement('div');
    flexContainer.className = 'flex flex-wrap gap-4';

    // Generate HTML for each brand and add to the flex container
    brands.forEach(brand => {
        const brandElement = document.createElement('div');
        brandElement.className = 'flex flex-col items-center w-10';  // Smaller width divs
        brandElement.innerHTML = `
            <img src="${brand.image}" alt="${brand.name}" class="w-full h-24 object-contain mx-auto">
        `;
        flexContainer.appendChild(brandElement);
    });

    brandsContainer.appendChild(flexContainer); // Add the flex container to the brands container
});



document.getElementById('submitListingBtn').addEventListener('click', function() {
    document.getElementById('submitModal').classList.remove('hidden'); // Show the modal
});

document.getElementById('carForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    // Handling the form data here

    // Optionally close the modal on submission
    document.getElementById('submitModal').classList.add('hidden');
    alert('Listing submitted');
});

function closeModal() {
    document.getElementById('submitModal').classList.add('hidden');
}



document.addEventListener('DOMContentLoaded', function() {
    const slider = document.getElementById('imageSlider');
    const sliderContent = slider.querySelector('div');
    const images = sliderContent.getElementsByTagName('img');
    let currentIndex = 0;

    function showNextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        sliderContent.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    // Change image every 2 seconds
    setInterval(showNextImage, 2000);
});