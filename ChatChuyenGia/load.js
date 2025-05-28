// ChatChuyenGia.js

document.addEventListener("DOMContentLoaded", () => {
  const chatContainer = document.getElementById("chat-container");
  const userInput = document.getElementById("user-input");
  const sendButton = document.getElementById("send-button");
  const emojiButton = document.getElementById("emoji-button");
  const emojiPicker = document.getElementById("emoji-picker");

  const doctorId = new URLSearchParams(window.location.search).get("doctorId");
  const token = localStorage.getItem("token"); // Giả sử bạn lưu token ở đây

  if (!doctorId || !token) {
    alert("Không tìm thấy thông tin bác sĩ hoặc bạn chưa đăng nhập.");
    return;
  }

  // Load tin nhắn trước đó
  async function loadMessages() {
    try {
      const res = await fetch(`/api/messages?doctorId=${doctorId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const messages = await res.json();
      chatContainer.innerHTML = "";
      messages.forEach(msg => {
        const div = document.createElement("div");
        div.classList.add("message");
        div.classList.add(msg.sender === "doctor" ? "doctor-msg" : "user-msg");
        div.textContent = msg.content;
        chatContainer.appendChild(div);
      });
      chatContainer.scrollTop = chatContainer.scrollHeight;
    } catch (err) {
      console.error("Lỗi khi tải tin nhắn:", err);
    }
  }

  // Gửi tin nhắn
  async function sendMessage() {
    const content = userInput.value.trim();
    if (!content) return;

    try {
      await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ doctorId, content }),
      });
      userInput.value = "";
      await loadMessages();
    } catch (err) {
      console.error("Lỗi khi gửi tin nhắn:", err);
    }
  }

  sendButton.addEventListener("click", sendMessage);
  userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });

  // Emoji
  emojiButton.addEventListener("click", () => {
    emojiPicker.classList.toggle("hidden");
  });

  emojiPicker.addEventListener("click", (e) => {
    if (e.target.tagName === "SPAN") {
      userInput.value += e.target.textContent;
      userInput.focus();
    }
  });

  loadMessages();
});
