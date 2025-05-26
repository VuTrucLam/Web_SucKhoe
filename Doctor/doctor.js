document.addEventListener('DOMContentLoaded', function () {
  const dots = document.querySelectorAll('.dot');
  const track = document.querySelector('.carousel-track');

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const index = dot.getAttribute('data-index');
      const width = document.querySelector('.carousel-container').offsetWidth;
      track.style.transform = `translateX(-${index * width}px)`;

      // Cập nhật dot active
      dots.forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
    });
  });

  // Responsive resize update
  window.addEventListener('resize', () => {
    const activeDot = document.querySelector('.dot.active');
    if (activeDot) {
      const index = activeDot.getAttribute('data-index');
      const width = document.querySelector('.carousel-container').offsetWidth;
      track.style.transform = `translateX(-${index * width}px)`;
    }
  });
});
