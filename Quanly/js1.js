// script.js
document.querySelector('.llu').addEventListener('click', function() {
  // Hiển thị thông báo
  alert('Cảm ơn bạn, chúng tôi đã nhận được thông tin');

  // Xóa nội dung trong các ô nhập liệu
  // Lấy tất cả các thẻ input và textarea trong form
  const inputs = document.querySelectorAll('input');
  const textareas = document.querySelectorAll('textarea');

  // Xóa nội dung của các input
  inputs.forEach(input => {
    input.value = ''; // Đặt giá trị về rỗng
  });

  // Xóa nội dung của các textarea
  textareas.forEach(textarea => {
    textarea.value = ''; // Đặt giá trị về rỗng
  });
});