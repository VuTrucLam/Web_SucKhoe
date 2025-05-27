// File: TheoDoiSucKhoe.js

document.addEventListener('DOMContentLoaded', function () {
  const steps = 2628;
  const goal = 10000;

  const ctx = document.getElementById('stepsChart').getContext('2d');
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Đã đi', 'Còn lại'],
      datasets: [{
        data: [steps, goal - steps],
        backgroundColor: ['#e91e63', '#eee'],
        borderWidth: 0
      }]
    },
    options: {
      cutout: '70%',
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false }
      }
    }
  });

  document.getElementById('stepsCount').textContent = steps;
});
