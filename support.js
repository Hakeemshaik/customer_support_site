const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// Example AI responses
const aiResponses = {
  "hello": "Hello! How can I assist you today?",
  "pricing": "Our services start at $50/month. You can find more details in the pricing section.",
  "default": "I'm not sure about that. Please check our documentation or ask another question."
};

sendBtn.addEventListener("click", () => {
  const text = userInput.value.trim();
  if (!text) return;

  // Add user message
  const userMsg = document.createElement("div");
  userMsg.classList.add("message", "user");
  userMsg.innerText = text;
  chatBox.appendChild(userMsg);

  // Scroll to bottom
  chatBox.scrollTop = chatBox.scrollHeight;

  // AI response simulation
  const aiMsg = document.createElement("div");
  aiMsg.classList.add("message", "ai");
  const key = text.toLowerCase();
  aiMsg.innerText = aiResponses[key] || aiResponses["default"];
  setTimeout(() => {
    chatBox.appendChild(aiMsg);
    chatBox.scrollTop = chatBox.scrollHeight;
  }, 600);

  userInput.value = "";
});

// Enter key
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendBtn.click();
});
