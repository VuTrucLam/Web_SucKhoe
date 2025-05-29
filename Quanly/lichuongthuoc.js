document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');

  searchInput.addEventListener('input', async () => {
    const keyword = searchInput.value.trim();

    if (keyword === '') {
      searchResults.innerHTML = '';
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Bạn cần đăng nhập để sử dụng chức năng tìm thuốc.');
      window.location.href = 'dangnhap.html';
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/api/thuoc/search?keyword=${encodeURIComponent(keyword)}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const result = await res.json();

      if (res.ok) {
        renderSearchResults(result.data);
      } else {
        searchResults.innerHTML = `<p style="color: red;">${result.message || 'Không tìm thấy thuốc nào.'}</p>`;
      }
    } catch (error) {
      console.error('Lỗi tìm kiếm thuốc:', error);
      searchResults.innerHTML = `<p style="color: red;">Lỗi khi tìm thuốc. Vui lòng thử lại sau.</p>`;
    }
  });

  function renderSearchResults(thuocs) {
    if (thuocs.length === 0) {
      searchResults.innerHTML = '<p>Không tìm thấy thuốc nào phù hợp.</p>';
      return;
    }

    searchResults.innerHTML = thuocs.map(thuoc => `
      <div class="medication-card">
        <h3>${thuoc.name}</h3>
        <p>Liều dùng: ${thuoc.dosage || 'Không có'}</p>
        <p>Thời gian: ${thuoc.time || 'Không có'}</p>
        <p>Số lần uống: ${thuoc.frequency || 'Không có'} / ngày</p>
        <p>Ngày uống: ${thuoc.day || 'Không có'}</p>
        <p>Ngày hiện tại: Day ${thuoc.taken_times || 0} of ${thuoc.total_times || 0}</p>
        <div class="status-indicators">
          <span class="status-taken"></span>
          <span class="status-taken"></span>
          <span class="status-pending"></span>
        </div>
        <button class="taken-btn">✓ Taken</button>
        <a href="#" class="order-link">Order Now</a>
      </div>
    `).join('');
  }
const toggleBtn = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    toggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  
});
