document.addEventListener("DOMContentLoaded", function () {
    const signinLinks = document.querySelectorAll("[data-signin]");
    const signinModal = document.getElementById("signin-modal");
    const closeModal = document.getElementById("close-modal");
    const signinForm = document.getElementById("signin-form");

    // User Display Elements
    const userNameDisplayDesktop = document.getElementById("signin-link-desktop");
    const userNameDisplayMobile = document.getElementById("signin-link-mobile");
    const logoutBtnDesktop = document.getElementById("logout-btn-desktop");
    const logoutBtnMobile = document.getElementById("logout-btn-mobile");

    // Mobile Menu Toggle
    document.getElementById("menu-btn").addEventListener("click", function () {
        const mobileMenu = document.getElementById("mobile-menu");
        mobileMenu.classList.toggle("hidden");
    });

    // Show Sign-In Modal
    signinLinks.forEach(link => {
        link.addEventListener("click", function () {
            signinModal.classList.remove("hidden");
        });
    });

    // Close Sign-In Modal
    closeModal?.addEventListener("click", function () {
        signinModal.classList.add("hidden");
    });

    // Handle Sign-In Form Submission
    signinForm?.addEventListener("submit", function (event) {
        event.preventDefault();

        // Get input values
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        // Save to localStorage
        localStorage.setItem("userName", name);
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userPassword", password);

        // Update UI
        updateUserUI(name);

        // Close modal
        signinModal.classList.add("hidden");
    });

    // Logout Functionality
    [logoutBtnDesktop, logoutBtnMobile].forEach(btn => {
        btn?.addEventListener("click", function () {
            localStorage.removeItem("userName");
            localStorage.removeItem("userEmail");
            localStorage.removeItem("userPassword");
            updateUserUI(null);
        });
    });

    // UI Update Function
    function updateUserUI(name) {
        if (name && name.trim() !== "") {
            userNameDisplayDesktop.innerHTML = `👤 ${name}`;
            userNameDisplayMobile.innerHTML = `👤 ${name}`;
            logoutBtnDesktop.classList.remove("hidden");
            logoutBtnMobile.classList.remove("hidden");
        } else {
            userNameDisplayDesktop.textContent = "👤 Sign In";
            userNameDisplayMobile.textContent = "👤 Sign In";
            logoutBtnDesktop.classList.add("hidden");
            logoutBtnMobile.classList.add("hidden");
        }
    }





    // submit listing
    




    // Function to show modal for newletter model
    function showModal() {
        const modal = document.getElementById('congratulations-modal');
        modal?.classList.remove('hidden');

        // Auto-hide the modal after 2 minutes
        setTimeout(() => {
            modal?.classList.add('hidden');
        }, 1000);
    }


    
    // Event listener for the Signup button
    document.getElementById('signup-button')?.addEventListener('click', () => {
        const emailInput = document.getElementById('email-input');
        const emailValue = emailInput?.value.trim();

        if (emailValue) {
            showModal(); 
            emailInput.value = ''; // Clear the input field
        } else {
            alert('Please enter a valid email address.');
        }
    });



    
    // Close modal functionality
    document.getElementById('modal-close')?.addEventListener('click', () => {
        document.getElementById('congratulations-modal')?.classList.add('hidden');
    });

    // Load user data on page load
    const savedName = localStorage.getItem("userName");
    updateUserUI(savedName);
});

