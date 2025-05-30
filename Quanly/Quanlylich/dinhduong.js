document.querySelector('.hamburger').addEventListener('click', function() {
        document.getElementById('dropdownMenu').classList.toggle('active');
    });
    document.getElementById('header').addEventListener('click', function(event) {
    
        if (window.innerWidth <= 768 && !event.target.closest('.hamburger')) {
            document.getElementById('dropdownMenu').classList.toggle('active');
        }
    });

   
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