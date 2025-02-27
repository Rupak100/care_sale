const API_KEY = ""; // Replace with your actual API key
const API_URL = ""; // Use the correct model

const chatIcon = document.getElementById('chat-icon');
const chatBox = document.getElementById('chat-box');
const closeChat = document.getElementById('close-chat');

chatIcon.addEventListener('click', () => {
    chatBox.classList.remove('hidden');
    chatIcon.classList.add('hidden');
});

closeChat.addEventListener('click', () => {
    chatBox.classList.add('hidden');
    chatIcon.classList.remove('hidden');
});

async function sendMessage() {
    const userInput = document.getElementById('user-input');
    const chatMessages = document.getElementById('chat-messages');
    const userMessage = userInput.value.trim();
    
    if (!userMessage) return; // Prevent sending empty messages

    userInput.value = '';

    // Display user message
    chatMessages.innerHTML += `<div class="mb-2"><strong>You:</strong> ${userMessage}</div>`;

    try {
        const response = await fetch(`${API_URL}?key=${API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `You are a helpful assistant for a car dealership. The customer asks: ${userMessage}`
                    }]
                }],
                generationConfig: {
                    temperature: 0.9,
                    topK: 1,
                    topP: 1,
                    maxOutputTokens: 2048
                }
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`API Error: ${errorData.error.message}`);
        }

        const data = await response.json();
        const botResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't generate a response.";

        // Display bot message
        chatMessages.innerHTML += `<div class="mb-2"><strong>Bot:</strong> ${botResponse}</div>`;
    } catch (error) {
        console.error('Error:', error);
        chatMessages.innerHTML += `<div class="mb-2 text-red-500"><strong>Error:</strong> ${error.message}</div>`;
    }

    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
