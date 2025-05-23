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
}
