function formatDate(dateStr) {
  const date = new Date(dateStr);
  if (isNaN(date)) return ''; // tránh lỗi
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}
window.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Bạn cần đăng nhập để xem thông tin.');
    window.location.href = 'dangnhap.html';
    return;
  }

  try {
    const res = await fetch('http://localhost:3000/api/user/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!res.ok) {
      throw new Error('Không lấy được thông tin người dùng');
    }

    const user = await res.json();

    // Hiển thị dữ liệu lên giao diện
    document.getElementById('name').value = user.name || '';
    document.getElementById('email').value = user.email || '';
    document.getElementById('phone').value = user.phone || '';
    document.getElementById('dob').value = formatDate(user.birth_date);
    document.getElementById('gender').value = user.gender || '';
    document.getElementById('role').value = user.role || '';

    // Hiển thị avatar nếu có
    const avatar = document.querySelector('.avatar');
    if (user.avatar) {
      avatar.src = user.avatar;
    }

  } catch (err) {
    console.error(err);
    alert('Lỗi khi tải thông tin người dùng.');
  }
});
