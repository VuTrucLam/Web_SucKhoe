document.getElementById('register-form').addEventListener('submit', async function (e) {
  e.preventDefault(); // Ngăn reload trang

  const name = document.getElementById('hoten').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  try {
    const res = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();

    if (res.ok) {
      alert('Đăng ký thành công! Chuyển sang trang đăng nhập.');
      window.location.href = 'dangnhap.html';
    } else {
      alert(data.error || 'Đăng ký thất bại.');
    }
  } catch (err) {
    console.error(err);
    alert('Có lỗi xảy ra, vui lòng thử lại sau.');
  }
});
