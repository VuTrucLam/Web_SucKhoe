// Toggle menu khi nhấn hamburger
    document.querySelector('.hamburger').addEventListener('click', function() {
        document.getElementById('dropdownMenu').classList.toggle('active');
    });

    // Toggle menu khi nhấn header trên mobile
    document.getElementById('header').addEventListener('click', function(event) {
        // Chỉ toggle menu nếu màn hình nhỏ hơn 768px và không nhấn vào hamburger
        if (window.innerWidth <= 768 && !event.target.closest('.hamburger')) {
            document.getElementById('dropdownMenu').classList.toggle('active');
        }
    });

    // Hàm toggle chi tiết (giữ nguyên từ code của bạn)
    function toggleDetails(dayId) {
        const content = document.getElementById(dayId);
        const button = content.previousElementSibling;
        if (content.classList.contains('show')) {
            content.classList.remove('show');
            button.textContent = 'Xem Chi Tiết';
        } else {
            content.classList.add('show');
            button.textContent = 'Ẩn Chi Tiết';
        }
    }