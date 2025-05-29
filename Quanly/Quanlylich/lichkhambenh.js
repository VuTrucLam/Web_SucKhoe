document.addEventListener('DOMContentLoaded', function () {
  const btnSave = document.querySelector('.save-btn');

  btnSave.addEventListener('click', async function (e) {
    e.preventDefault();
    console.log('Nút Lưu Thông Tin được click');

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Bạn cần đăng nhập để thực hiện thao tác này.');
      window.location.href = 'dangnhap.html';
      return;
    }

    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const status = document.getElementById('status').value;
    const reason = document.getElementById('reason').value;
    const doctor = document.getElementById('doctor').value;
    const hospital = document.getElementById('hospital').value;
    const hospital_contact = document.getElementById('hospital_contact').value;
    const department = document.getElementById('department').value;
    const is_periodic = document.getElementById('periodic-checkup').checked;
    const note = document.getElementById('note').value;

    if (!date || !time || !reason || !doctor || !hospital) {
      alert('Vui lòng nhập đầy đủ thông tin lịch khám!');
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/api/lichkham', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          date,
          time,
          status,
          reason,
          doctor,
          hospital,
          hospital_contact,
          department,
          is_periodic,
          note
        })
      });

      const data = await res.json();

      if (res.ok) {
        alert('Đặt lịch khám thành công!');
      } else {
        alert(data.error || 'Lỗi không xác định khi lưu.');
      }

    } catch (error) {
      console.error(error);
      alert('Có lỗi kết nối, vui lòng thử lại.');
    }
  });
});
