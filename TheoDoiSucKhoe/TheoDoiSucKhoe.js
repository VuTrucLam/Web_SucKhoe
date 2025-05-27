document.addEventListener('DOMContentLoaded', function () {
  // Bước đi
  const steps = 2628;
  const goal = 10000;

  const stepsCtx = document.getElementById('stepsChart').getContext('2d');
  new Chart(stepsCtx, {
    type: 'doughnut',
    data: {
      labels: ['Đã đi', 'Còn lại'],
      datasets: [{
        data: [steps, goal - steps],
        backgroundColor: ['#E45DFC', '#eee'],
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

  // Nhịp tim động
  const bpmElement = document.getElementById("heartRateValue");
  const heartCtx = document.getElementById("heartChart").getContext("2d");

  const heartChart = new Chart(heartCtx, {
    type: "line",
    data: {
      labels: Array(20).fill(""),
      datasets: [{
        label: "Nhịp tim",
        data: Array(20).fill(100),
        borderColor: "#f44336",
        backgroundColor: "rgba(244,67,54,0.1)",
        tension: 0.3
      }]
    },
    options: {
      animation: false,
      responsive: false,
      scales: {
        y: { min: 60, max: 140 }
      },
      plugins: { legend: { display: false } }
    }
  });

  function randomBpm() {
    return Math.floor(90 + Math.random() * 30);
  }

  setInterval(() => {
    const bpm = randomBpm();
    bpmElement.innerText = bpm + " bpm";

    const data = heartChart.data.datasets[0].data;
    data.push(bpm);
    data.shift();

    heartChart.update();
  }, 1000);

  // Theo dõi nước
  const HOURS = ["6h", "8h", "10h", "12h", "15h", "17h", "19h", "22h"];
  const barsContainer = document.getElementById("bars");
  const hoursContainer = document.getElementById("hours");
  const water = document.getElementById("water");
  const totalText = document.getElementById("total");

  let state = JSON.parse(localStorage.getItem("water-tracker") || "[]");

  function renderWater() {
    barsContainer.innerHTML = "";
    hoursContainer.innerHTML = "";
    HOURS.forEach((hour, index) => {
      const isActive = state.includes(index);

      const bar = document.createElement("div");
      bar.className = "bar" + (isActive ? " active" : "");
      bar.style.height = (60 + Math.random() * 40) + "px";
      barsContainer.appendChild(bar);

      const label = document.createElement("div");
      label.className = "hour";
      label.textContent = hour;
      label.onclick = () => toggleWater(index);
      hoursContainer.appendChild(label);
    });

    const totalMl = state.length * 250;
    const percent = (totalMl / 2000) * 100;
    water.style.height = Math.min(percent, 100) + "%";
    totalText.textContent = (totalMl / 1000).toFixed(2) + " lít";
  }

  function toggleWater(index) {
    const found = state.indexOf(index);
    if (found >= 0) state.splice(found, 1);
    else state.push(index);
    localStorage.setItem("water-tracker", JSON.stringify(state));
    renderWater();
  }

  renderWater();
});

const bpCtx = document.getElementById('bp-chart').getContext('2d');
    const sugarCtx = document.getElementById('sugar-chart').getContext('2d');

    let bpData = [102];
    let sugarData = [80];

    const bpChart = new Chart(bpCtx, {
      type: 'line',
      data: {
        labels: ['Lần 1'],
        datasets: [{
          label: 'Tâm thu',
          data: bpData,
          backgroundColor: 'rgba(0, 183, 255, 0.2)',
          borderColor: '#00b7ff',
          fill: true
        }]
      },
      options: { responsive: true }
    });

    const sugarChart = new Chart(sugarCtx, {
      type: 'line',
      data: {
        labels: ['Lần 1'],
        datasets: [{
          label: 'Đường huyết',
          data: sugarData,
          backgroundColor: 'rgba(255, 165, 0, 0.2)',
          borderColor: 'orange',
          fill: true
        }]
      },
      options: { responsive: true }
    });

    function updateData() {
      const bpInput = document.getElementById('bp-input').value;
      const sugarInput = parseInt(document.getElementById('sugar-input').value);

      if (bpInput.includes('/')) {
        const [sys, dia] = bpInput.split('/').map(Number);
        document.getElementById('bp-value').innerText = `${sys} / ${dia}`;
        bpChart.data.labels.push(`Lần ${bpChart.data.labels.length + 1}`);
        bpChart.data.datasets[0].data.push(sys);
        bpChart.update();

        const bpStatus = document.getElementById('bp-status');
        if (sys > 130 || dia > 85) {
          bpStatus.innerText = 'Cao'; bpStatus.className = 'status high';
        } else if (sys < 90 || dia < 60) {
          bpStatus.innerText = 'Thấp'; bpStatus.className = 'status low';
        } else {
          bpStatus.innerText = 'Bình thường'; bpStatus.className = 'status normal';
        }
      }

      if (!isNaN(sugarInput)) {
        document.getElementById('sugar-value').innerText = sugarInput;
        sugarChart.data.labels.push(`Lần ${sugarChart.data.labels.length + 1}`);
        sugarChart.data.datasets[0].data.push(sugarInput);
        sugarChart.update();

        const sugarStatus = document.getElementById('sugar-status');
        if (sugarInput > 130) {
          sugarStatus.innerText = 'Cao'; sugarStatus.className = 'status high';
        } else if (sugarInput < 70) {
          sugarStatus.innerText = 'Thấp'; sugarStatus.className = 'status low';
        } else {
          sugarStatus.innerText = 'Bình thường'; sugarStatus.className = 'status normal';
        }
      }
    }

    // Tính chỉ số BMI
const ctx = document.getElementById('bmiChart').getContext('2d');
const bmiChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: [],
    datasets: [
      {
        label: 'Gầy',
        data: [{ x: 16.5, y: 1 }],
        backgroundColor: '#99ccff', // Xanh nhạt
        barPercentage: 1.0,
        categoryPercentage: 1.0
      },
      {
        label: 'Khỏe mạnh',
        data: [{ x: 21.7, y: 1 }],
        backgroundColor: '#66ff66', // Xanh lá
        barPercentage: 1.0,
        categoryPercentage: 1.0
      },
      {
        label: 'Thừa cân',
        data: [{ x: 27.5, y: 1 }],
        backgroundColor: '#ffff66', // Vàng
        barPercentage: 1.0,
        categoryPercentage: 1.0
      },
      {
        label: 'Béo phì',
        data: [{ x: 35, y: 1 }],
        backgroundColor: '#ff9933', // Cam
        barPercentage: 1.0,
        categoryPercentage: 1.0
      },
      {
        label: 'Béo phì nghiêm trọng',
        data: [{ x: 42, y: 1 }],
        backgroundColor: '#ff3333', // Đỏ
        barPercentage: 1.0,
        categoryPercentage: 1.0
      },
      {
        label: 'Chỉ số BMI của bạn',
        type: 'scatter',
        data: [],
        backgroundColor: '#000000',
        pointRadius: 6
      }
    ]
  },
  options: {
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        min: 15,
        max: 45,
        title: {
          display: true,
          text: 'Chỉ số BMI'
        },
        ticks: {
          stepSize: 5
        }
      },
      y: {
        display: false,
        min: 0,
        max: 1.5
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: false
      }
    }
  }
});

function calculateBMI() {
  const height = parseFloat(document.getElementById('height').value) / 100;
  const weight = parseFloat(document.getElementById('weight').value);
  if (!height || !weight || height <= 0 || weight <= 0) {
    alert('Vui lòng nhập chiều cao và cân nặng hợp lệ!');
    return;
  }

  const bmi = (weight / (height * height)).toFixed(1);
  document.getElementById('bmiResult').innerText = `Chỉ số BMI: ${bmi}`;

  let status = '';
  if (bmi < 18.5) status = 'Bạn gầy';
  else if (bmi >= 18.5 && bmi <= 24.9) status = 'Bạn khỏe mạnh';
  else if (bmi >= 25 && bmi <= 29.9) status = 'Bạn thừa cân';
  else if (bmi >= 30 && bmi <= 39.9) status = 'Bạn béo phì';
  else status = 'Bạn béo phì nghiêm trọng';
  document.getElementById('status').innerText = status;

  // Cập nhật điểm BMI
  bmiChart.data.datasets[5].data = [{ x: parseFloat(bmi), y: 1 }];
  bmiChart.update();
}

// Khởi tạo biểu đồ Giấc Ngủ
  const sleepCtx = document.getElementById('sleepChart').getContext('2d');
  sleepChart = new Chart(sleepCtx, {
    type: 'doughnut',
    data: {
      labels: ["Xấu", "Thức Giấc", "Chất Lượng"],
      datasets: [{
        data: [60, 28, 93],
        backgroundColor: ["#4682B4", "#FFC1CC", "#FFD700"],
        borderWidth: 0,
        borderColor: "transparent"
      }]
    },
    options: {
      cutout: "70%",
      plugins: {
        legend: {
          display: true,
          position: "right",
          labels: {
            generateLabels: function(chart) {
              const data = chart.data;
              return data.labels.map((label, i) => ({
                text: `${label} ${data.datasets[0].data[i]}%`,
                fillStyle: data.datasets[0].backgroundColor[i],
                strokeStyle: "transparent",
                lineWidth: 0,
                hidden: false
              }));
            }
          }
        },
        tooltip: {
          enabled: false
        }
      }
    }
  });


function calculateSleepQuality() {
  const sleepTime = parseFloat(document.getElementById('sleepTime').value);
  const wakeCount = parseInt(document.getElementById('wakeCount').value);
  const qualityElement = document.getElementById('sleepQuality');

  if (isNaN(sleepTime) || isNaN(wakeCount) || sleepTime <= 0) {
    qualityElement.innerText = 'Vui lòng nhập dữ liệu hợp lệ!';
    qualityElement.style.color = 'red';
    return;
  }

  let poor = 0, awake = 0, quality = 0;
  if (sleepTime < 6 || wakeCount > 3) {
    poor = 60; // Giấc ngủ kém nếu dưới 6 giờ hoặc thức nhiều
    awake = 28;
    quality = 12;
  } else if (sleepTime >= 6 && sleepTime <= 9 && wakeCount <= 2) {
    poor = 20; // Giấc ngủ tốt
    awake = 15;
    quality = 65;
  } else {
    poor = 40; // Giấc ngủ trung bình
    awake = 25;
    quality = 35;
  }

  // Cập nhật biểu đồ
  sleepChart.data.datasets[0].data = [poor, awake, quality];
  sleepChart.update();

  // Hiển thị chất lượng
  if (quality > 50) {
    qualityElement.innerText = 'Giấc ngủ của bạn tốt!';
    qualityElement.style.color = 'green';
  } else {
    qualityElement.innerText = 'Cần cải thiện giấc ngủ!';
    qualityElement.style.color = 'red';
  }
}