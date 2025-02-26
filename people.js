async function fetchTeamData() {
    try {
        console.log('Fetching team data...');
        const response = await fetch('team.json'); // Adjust path if needed
        console.log('Response status:', response.status);
        
        if (!response.ok) throw new Error('Network response was not ok');

        const teamMembers = await response.json();
        console.log('Fetched team members:', teamMembers);
        renderTeamMembers(teamMembers);
    } catch (error) {
        console.error('Error fetching team data:', error);
    }
}

function renderTeamMembers(members) {
    const teamContainer = document.getElementById('team-container'); // Get the container by ID
    teamContainer.innerHTML = ''; // Clear previous content

    members.forEach(member => {
        const memberCard = document.createElement('div');
        memberCard.className = 'bg-gray-100 rounded-xl shadow-md w-52 p-4'; // Ensured padding for visual uniformity

        memberCard.innerHTML = `
            <h3 class="font-semibold text-lg">${member.name}</h3>
            <p class="text-gray-600 text-sm">${member.position}</p>
            <img src="${member.image}" alt="${member.alt}" class="rounded-lg w-full h-auto">
        `;
        
        teamContainer.appendChild(memberCard); // Append the card to the container
    });
}

// Fetch team data on page load
document.addEventListener('DOMContentLoaded', fetchTeamData);