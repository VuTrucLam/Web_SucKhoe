// Gán userId tạm thời để thử nghiệm (sau này sẽ gán khi người dùng đăng nhập)
localStorage.setItem('userId', '2');

function getDoctorIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('doctorId');
}

const urlParams = new URLSearchParams(window.location.search);
const doctorId = urlParams.get('doctorId');
const userId = parseInt(localStorage.getItem('userId'));
const token = localStorage.getItem('token');

// Hiển thị thông tin bác sĩ
async function loadDoctorInfo() {
  try {
    const res = await fetch(`http://localhost:3000/api/users/${doctorId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!res.ok) throw new Error('Không lấy được thông tin bác sĩ');

    const doctor = await res.json();

    document.getElementById('doctor-name').textContent = doctor.name;
    document.getElementById('doctor-avatar').src = doctor.avatar_url || '../IMAGES/AvatarChuyenGiaO.png';
  } catch (err) {
    console.error(err);
    alert('Lỗi khi tải thông tin bác sĩ');
  }
}

// Hiển thị tin nhắn
async function loadMessages() {
  try {
    const res = await fetch(`http://localhost:3000/api/messages/${doctorId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!res.ok) throw new Error('Không thể lấy tin nhắn');

    const messages = await res.json();
    const chatContainer = document.getElementById('chat-container');
    chatContainer.innerHTML = '';

    messages.forEach(msg => {
      const div = document.createElement('div');
      div.classList.add('chat-message');
      div.classList.add(msg.sender_id === userId ? 'me' : 'doctor');
      div.innerText = msg.content;
      chatContainer.appendChild(div);
    });

    chatContainer.scrollTop = chatContainer.scrollHeight;
  } catch (err) {
    console.error(err);
    alert('Lỗi khi tải tin nhắn');
  }
}

// Gửi tin nhắn mới
async function sendMessage() {
  const content = document.getElementById("messageInput").value.trim();
  const senderId = parseInt(localStorage.getItem("userId"));
  const token = localStorage.getItem("token");
  const urlParams = new URLSearchParams(window.location.search);
  const receiverId = parseInt(urlParams.get("doctorId"));

  if (!content || !token || !senderId || !receiverId) {
    console.error("Thiếu thông tin!", { content, token, senderId, receiverId });
    return;
  }

  const bodyData = {
    sender_id: senderId,
    receiver_id: receiverId,
    content: content
  };

  try {
    const response = await fetch("http://localhost:3000/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(bodyData)
    });

    const data = await response.json();
    if (!response.ok) throw new Error(`${response.status} - ${JSON.stringify(data)}`);

    document.getElementById("messageInput").value = "";
    await loadMessages();
  } catch (err) {
    console.error("Không gửi được tin nhắn:", err);
  }
}

// Sự kiện DOM
window.addEventListener("DOMContentLoaded", async function () {
  await loadDoctorInfo();
  await loadMessages();

  const sendBtn = document.getElementById("send-button");
  sendBtn?.addEventListener("click", sendMessage);
});
