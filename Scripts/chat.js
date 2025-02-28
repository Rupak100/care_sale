const API_KEY = "";
const API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent";

const chatIcon = document.getElementById('chat-icon');
const chatBox = document.getElementById('chat-box');
const closeChat = document.getElementById('close-chat');
const typingIndicator = document.getElementById('typing-indicator');

let isWaitingForResponse = false;

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
    
    if (!userMessage || isWaitingForResponse) return; // Prevent sending empty messages or while waiting for a response

    userInput.value = '';

    // Display user message
    chatMessages.innerHTML += `<div class="mb-2"><strong>You:</strong> ${userMessage}</div>`;

    // Show typing indicator
    typingIndicator.classList.remove('hidden');
    isWaitingForResponse = true;

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

        // Hide typing indicator
        typingIndicator.classList.add('hidden');

        // Display bot message
        chatMessages.innerHTML += `<div class="mb-2"><strong>Bot:</strong> ${botResponse}</div>`;
    } catch (error) {
        console.error('Error:', error);
        chatMessages.innerHTML += `<div class="mb-2 text-red-500"><strong>Error:</strong> ${error.message}</div>`;
        
        // Hide typing indicator in case of error
        typingIndicator.classList.add('hidden');
    } finally {
        isWaitingForResponse = false;
    }

    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Add event listener for Enter key
document.getElementById('user-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});