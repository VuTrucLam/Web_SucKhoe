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
    document.getElementById('dob').value = user.dob || '';
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
