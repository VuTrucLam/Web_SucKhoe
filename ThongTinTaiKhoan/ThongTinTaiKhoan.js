

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