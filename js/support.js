const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// AI responses with optional download links
const aiResponses = {
  "hello": { text: "Hello! How can I assist you today?" },
  "guide": { text: "Here is a helpful guide you can download:", download: { name: "Hakeem_Guide.pdf", link: "downloads/Hakeem_Guide.pdf" } },
  "pricing": { text: "Our services start at $50/month. You can find more details in the pricing section." },
  "default": { text: "I'm not sure about that. Please check our documentation or ask another question." }
};

// Send message
sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => { if(e.key === "Enter") sendMessage(); });

function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  // Add user message
  addMessage(text, "user");

  userInput.value = "";

  // Simulate AI typing
  const typing = addMessage("...", "ai");
  setTimeout(() => {
    chatBox.removeChild(typing);
    respondAI(text.toLowerCase());
  }, 800 + Math.random()*800);
}

function addMessage(text, type) {
  const msg = document.createElement("div");
  msg.classList.add("message", type);
  msg.innerHTML = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
  return msg;
}

function respondAI(input) {
  const response = aiResponses[input] || aiResponses["default"];
  const msg = document.createElement("div");
  msg.classList.add("message", "ai");
  msg.innerHTML = response.text;

  // Add download button if exists
  if(response.download) {
    const btn = document.createElement("a");
    btn.href = response.download.link;
    btn.download = response.download.name;
    btn.className = "download-btn";
    btn.innerHTML = "⬇ " + response.download.name;
    msg.appendChild(document.createElement("br"));
    msg.appendChild(btn);
  }

  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

