function enableEdit() {
  // Lấy tất cả input trong class .menu
  const inputs = document.querySelectorAll(".menu input");

  // Bỏ thuộc tính disabled cho từng input
  inputs.forEach(input => {
    input.disabled = false;
  });

  // Đặt con trỏ vào ô đầu tiên
  if (inputs.length > 0) {
    inputs[0].focus();
  }
// Hiện nút lưu
  saveBtn.style.display = "block";
}

// Hàm lưu thông tin
  document.getElementById("saveBtn").addEventListener("click", function () {
    const inputs = document.querySelectorAll(".menu input");
    inputs.forEach(input => {
      input.disabled = true; // Khoá lại
    });

    // Ẩn nút lưu
    this.style.display = "none";

    alert("Thông tin đã được lưu."); // Tuỳ chọn thông báo  (chưa gửi server)
  });