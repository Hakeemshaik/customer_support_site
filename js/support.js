const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const typingIndicator = document.getElementById("typing-indicator");

// AI Knowledge Base
const aiResponses = {
  "hello": { text: "Hello there! Welcome to Hakeem Support. How can I help?" },
  "hi": { text: "Hi! I'm ready to assist you." },
  "guide": { text: "Sure, I have the setup guide ready for you.", download: { name: "Hakeem_Setup_Guide.pdf", link: "#" } },
  "pricing": { text: "Our basic plan is $29/mo and the Pro plan is $99/mo. Which one interests you?" },
  "software": { text: "We build automation tools for web developers and designers." },
  "contact": { text: "You can email us at support@hakeem.ai." },
  "default": { text: "I'm still learning! Could you ask about 'software', 'pricing', or 'guide'?" }
};

// Event Listeners
sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => { 
  if(e.key === "Enter") sendMessage(); 
});

function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  // 1. Add User Message
  addMessage(text, "user");
  userInput.value = "";

  // 2. Show Typing Animation
  typingIndicator.style.display = "flex";
  scrollToBottom();

  // 3. Process AI Response with delay
  const delay = 1000 + Math.random() * 1000; // 1-2 seconds delay

  setTimeout(() => {
    typingIndicator.style.display = "none";
    respondAI(text.toLowerCase());
  }, delay);
}

function addMessage(text, sender) {
  const msgWrapper = document.createElement("div");
  msgWrapper.classList.add("message", sender);

  // If it's AI, add avatar and bubble structure
  if (sender === "ai") {
    msgWrapper.innerHTML = `
      <div class="avatar">🤖</div>
      <div class="bubble">${text}</div>
    `;
  } else {
    // User message (Simple bubble)
    msgWrapper.innerHTML = `<div class="bubble">${text}</div>`;
  }

  chatBox.insertBefore(msgWrapper, typingIndicator);
  scrollToBottom();
}

function respondAI(input) {
  // Search for keyword in input
  let response = aiResponses[input];
  
  // Fallback: Check if input contains a known keyword
  if (!response) {
    const keys = Object.keys(aiResponses);
    const foundKey = keys.find(key => input.includes(key) && key !== "default");
    response = foundKey ? aiResponses[foundKey] : aiResponses["default"];
  }

  const msgWrapper = document.createElement("div");
  msgWrapper.classList.add("message", "ai");
  
  // Build HTML content
  let contentHtml = `<div class="avatar">🤖</div><div class="bubble">${response.text}`;

  // Add download button if present
  if(response.download) {
    contentHtml += `<br><a href="${response.download.link}" class="download-btn" download="${response.download.name}">⬇ Download ${response.download.name}</a>`;
  }

  contentHtml += `</div>`; // Close bubble
  msgWrapper.innerHTML = contentHtml;

  chatBox.insertBefore(msgWrapper, typingIndicator);
  scrollToBottom();
}

function scrollToBottom() {
  chatBox.scrollTop = chatBox.scrollHeight;
}
