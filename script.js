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

    // Close Modal
    closeModal.addEventListener("click", function () {
        signinModal.classList.add("hidden");
    });

    // Handle Sign-In Form Submission
    signinForm.addEventListener("submit", function (event) {
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
        btn.addEventListener("click", function () {
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

    // Loading user data on page load
    window.addEventListener("load", function () {
        const savedName = localStorage.getItem("userName");
        updateUserUI(savedName);
    });
});

// https://mmg14xj7-5500.inc1.devtunnels.ms/


// https://mmg14xj7-5500.inc1.devtunnels.ms/