document.querySelectorAll('.contact-button').forEach(button => {
button.addEventListener('click', () => {
    const doctorId = button.getAttribute('data-doctor-id');
    // Chuyển đến trang chat, truyền ID bác sĩ qua URL
    window.location.href = `../ChatChuyenGia/ChatChuyenGia.html?doctor=${doctorId}`;
});
});
