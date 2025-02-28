async function fetchBlogPosts() {
    try {
        const response = await fetch('/Data/posts.json'); // Adjust path if needed
        if (!response.ok) throw new Error('Network response was not ok');
        
        const posts = await response.json();
        renderBlogPosts(posts);
    } catch (error) {
        console.error('Error fetching blog posts:', error);
    }
}

function renderBlogPosts(posts) {
    const blogContainer = document.getElementById('blog-container');
    blogContainer.innerHTML = ''; // Clear previous content

    posts.forEach(post => {
        const postCard = document.createElement('div');
        postCard.className = 'bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300';

        postCard.innerHTML = `
            <div class="relative">
                <img src="${post.image}" alt="${post.title}" class="w-full h-56 object-cover" >
                <span class="absolute top-3 left-3 bg-white text-gray-700 text-xs font-medium px-2 py-1 rounded-lg shadow">${post.tags[0]}</span>
            </div>
            <div class="p-4">
                <p class="text-sm text-gray-500">${post.date}</p>
                <h3 class="text-lg font-semibold mt-2">${post.title}</h3>
            </div>
        `;

        // Add click event to show modal
        postCard.addEventListener('click', () => showModal(post));
        
        blogContainer.appendChild(postCard);
    });
}

function showModal(post) {
    const modal = document.getElementById('modal');
    document.getElementById('modal-title').innerText = post.title;
    document.getElementById('modal-description').innerText = post.description;
    document.getElementById('modal-image').src = post.image;

    modal.classList.remove('hidden'); // Show the modal
}

// Close modal functionality
document.getElementById('modal-close').addEventListener('click', () => {
    document.getElementById('modal').classList.add('hidden'); // Hide the modal
});

// Fetch blog posts on page load
document.addEventListener('DOMContentLoaded', fetchBlogPosts);