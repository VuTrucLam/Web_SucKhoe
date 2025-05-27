document.addEventListener('DOMContentLoaded', function () {
const chatContainer = document.getElementById('chat-container');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const emojiButton = document.getElementById('emoji-button');
const emojiPicker = document.getElementById('emoji-picker');

let isUserTurn = true; // true: người dùng, false: bác sĩ

sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    sendMessage();
  }
});

emojiButton.addEventListener('click', () => {
  emojiPicker.classList.toggle('hidden');
});

emojiPicker.addEventListener('click', (e) => {
  if (e.target.tagName === 'SPAN') {
    userInput.value += e.target.textContent;
    userInput.focus();
  }
});

function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  // Người dùng gửi (luôn bên phải)
  appendMessage(text, 'user');

  userInput.value = '';

  // Giả lập phản hồi của chuyên gia sau 1 giây
  setTimeout(() => {
    const reply = generateExpertReply(text); // Có thể viết logic phản hồi riêng
    appendMessage(reply, 'bot');
  }, 1000);
}

function appendMessage(text, sender) {
  const messageEl = document.createElement('div');
  messageEl.className = `message ${sender}`;

  const textEl = document.createElement('div');
  textEl.className = 'text';
  textEl.textContent = text;

  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const timeEl = document.createElement('div');
  timeEl.className = 'message-time';
  timeEl.textContent = time;

  messageEl.appendChild(textEl);
  messageEl.appendChild(timeEl);
  chatContainer.appendChild(messageEl);

  chatContainer.scrollTop = chatContainer.scrollHeight;
}


});