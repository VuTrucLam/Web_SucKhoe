document.addEventListener('DOMContentLoaded', () => {
    const panels = document.querySelectorAll('.container .panel');

    panels.forEach(panel => {
        panel.addEventListener('mouseenter', () => {
            panels.forEach(p => {
                p.style.flex = '0.5'; // Các phần không hover thu nhỏ về 20% (0.5/2.5 tổng)
            });
            panel.style.flex = '2'; // Phần hover mở rộng lên 40% (2/5 tổng)
        });

        panel.addEventListener('mouseleave', () => {
            panels.forEach(p => {
                p.style.flex = '1'; // Trở lại trạng thái ban đầu, mỗi phần 20% (1/5 tổng)
            });
        });
    });
});