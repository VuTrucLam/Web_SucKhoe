// js2.js
document.getElementById('show-progress-chart').addEventListener('click', function(event) {
  event.preventDefault(); // Prevent default link behavior

  // Show the chart container
  const chartContainer = document.getElementById('progress-chart-container');
  chartContainer.style.display = 'block';

  // If the chart is already rendered, don't create a new one
  if (chartContainer.innerHTML !== '') return;

  // Create a canvas element for the chart
  const canvas = document.createElement('canvas');
  chartContainer.appendChild(canvas);

  // Chart.js configuration
  const chartConfig = {
    type: 'line',
    data: {
      labels: ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4', 'Tuần 5'],
      datasets: [{
        label: 'Số ngày tập luyện',
        data: [3, 4, 5, 4, 6],
        borderColor: '#2F80ED',
        backgroundColor: 'rgba(47, 128, 237, 0.2)',
        fill: true,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'top'
        },
        title: {
          display: true,
          text: 'Tiến Độ Tập Luyện (Số Ngày Tập Mỗi Tuần)',
          font: {
            size: 16,
            family: 'Poppins'
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Số ngày'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Tuần'
          }
        }
      }
    }
  };

  // Create the chart
  new Chart(canvas, chartConfig);
});