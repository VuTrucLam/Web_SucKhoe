document.addEventListener("DOMContentLoaded", function () {
  const chatContainer = document.getElementById("chat-container");
  const userInput = document.getElementById("user-input");
  const sendButton = document.getElementById("send-button");
  const emojiButton = document.getElementById("emoji-button");
  const emojiPicker = document.getElementById("emoji-picker");

  function appendMessage(text, sender) {
    const message = document.createElement("div");
    message.classList.add("message", sender);

    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const textDiv = document.createElement("div");
    textDiv.classList.add("message-text");
    textDiv.innerText = text;

    const timeDiv = document.createElement("div");
    timeDiv.classList.add("message-time");
    timeDiv.innerText = time;

    message.appendChild(textDiv);
    message.appendChild(timeDiv);

    chatContainer.appendChild(message);
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }

  function botReply(userText) {
  const lowerText = userText.toLowerCase();
  let reply = "Tôi là trợ lý ảo, tôi có thể giúp gì cho bạn?";

  if (lowerText.includes("đau đầu")) {
    reply = "Có thể bạn đang bị stress hoặc thiếu ngủ. Hãy nghỉ ngơi và uống đủ nước.";
  } else if (lowerText.includes("đau bụng")) {
    reply = "Bạn có thể bị rối loạn tiêu hóa. Hãy uống nước ấm và nghỉ ngơi.";
  } else if (lowerText.includes("sốt")) {
    reply = "Bạn nên kiểm tra nhiệt độ cơ thể và nghỉ ngơi. Nếu sốt cao, hãy đến cơ sở y tế.";
  } else if (lowerText.includes("ho")) {
    reply = "Bạn nên uống nước ấm, hạn chế đồ lạnh và giữ ấm cổ.";
  } else if (lowerText.includes("đau họng")) {
    reply = "Bạn nên súc miệng bằng nước muối và tránh thực phẩm cay nóng.";
  } else if (lowerText.includes("mất ngủ")) {
    reply = "Bạn nên thư giãn, tránh dùng thiết bị điện tử trước khi ngủ.";
  } else if (lowerText.includes("mệt mỏi")) {
    reply = "Hãy nghỉ ngơi và bổ sung năng lượng bằng thực phẩm lành mạnh.";
  } else if (lowerText.includes("đau lưng")) {
    reply = "Bạn nên ngồi đúng tư thế và hạn chế mang vác nặng.";
  } else if (lowerText.includes("cảm lạnh") || lowerText.includes("hắt hơi")) {
    reply = "Bạn nên giữ ấm cơ thể, uống nước ấm và nghỉ ngơi nhiều hơn.";
  } else if (lowerText.includes("tiêu chảy")) {
    reply = "Bạn cần uống nhiều nước và ăn thức ăn nhẹ, dễ tiêu. Nếu kéo dài, hãy đi khám.";
  } else if (lowerText.includes("chóng mặt")) {
    reply = "Hãy nghỉ ngơi một lúc, tránh đứng dậy quá nhanh. Nếu lặp lại nhiều, nên đi kiểm tra.";
  } else if (lowerText.includes("dị ứng")) {
    reply = "Bạn nên tránh tiếp xúc với dị nguyên, và có thể dùng thuốc theo chỉ dẫn bác sĩ.";
  } else if (lowerText.includes("đau răng")) {
    reply = "Bạn nên súc miệng bằng nước muối ấm và đến nha sĩ nếu cơn đau kéo dài.";
  } else if (lowerText.includes("đau mắt") || lowerText.includes("mỏi mắt")) {
    reply = "Bạn nên cho mắt nghỉ ngơi, tránh nhìn màn hình quá lâu và có thể dùng nước nhỏ mắt.";
  }

  appendMessage(reply, "bot");
}


  sendButton.addEventListener("click", () => {
    const text = userInput.value.trim();
    if (text !== "") {
      appendMessage(text, "user");
      userInput.value = "";
      emojiPicker.classList.add("hidden");
      setTimeout(() => botReply(text), 500);
    }
  });

  userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendButton.click();
    }
  });

  // Hiển thị / ẩn emoji picker
  emojiButton.addEventListener("click", () => {
    emojiPicker.classList.toggle("hidden");
  });

  // Thêm emoji vào ô input khi click
  emojiPicker.addEventListener("click", (e) => {
    if (e.target.tagName === "SPAN") {
      userInput.value += e.target.innerText;
      userInput.focus();
    }
  });
});
