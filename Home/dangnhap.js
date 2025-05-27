document.getElementById('login-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  try {
    const res = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
      // ✅ Lưu token vào localStorage
      localStorage.setItem('token', data.token);
      alert('Đăng nhập thành công!');

      // ✅ Chuyển sang trang chính (hoặc Thông tin tài khoản)
      window.location.href = 'home.html';
    } else {
      alert(data.error || 'Đăng nhập thất bại!');
    }
  } catch (err) {
    console.error(err);
    alert('Lỗi kết nối đến server!');
  }
});
