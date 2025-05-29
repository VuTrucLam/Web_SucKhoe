document.getElementById('btnSave').addEventListener('click', async function(e) {
  e.preventDefault();

 const token = localStorage.getItem('token');
  if (!token) {
    alert('Bạn cần đăng nhập để xem thông tin.');
    window.location.href = 'dangnhap.html';
    return;
  }

  const ngay_bat_dau = document.getElementById('ngay_bat_dau').value;
  const ngay_ket_thuc = document.getElementById('ngay_ket_thuc').value;
  const trang_thai = document.getElementById('trang_thai').value.trim();
  const nhiet_do = document.getElementById('nhiet_do').value;
  const huyet_ap = document.getElementById('huyet_ap').value.trim();
  const nhip_tim = document.getElementById('nhip_tim').value;

  if (!ngay_bat_dau || !ngay_ket_thuc) {
    alert('Vui lòng nhập đầy đủ thông tin bắt buộc: từ ngày, đến ngày.');
    return;
  }

  try {
    const res = await fetch('http://localhost:3000/api/theo_doi_dieu_tri', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, ngay_bat_dau, ngay_ket_thuc, trang_thai, nhiet_do, huyet_ap, nhip_tim })
    });

    const data = await res.json();

    if (res.ok) {
      alert('Lưu thông tin thành công!');
      // Có thể reset form hoặc chuyển trang
    } else {
      alert(data.error || 'Lưu thông tin thất bại.');
    }
  } catch (error) {
    console.error(error);
    alert('Có lỗi xảy ra, vui lòng thử lại sau.');
  }
});
