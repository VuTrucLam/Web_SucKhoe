// File: load.js

const token = localStorage.getItem("token"); // Đảm bảo đã lưu token sau khi đăng nhập

const apiUrl = "http://localhost:3000/api/health-profiles";

function enableEdit() {
  const inputs = document.querySelectorAll(".menu input");
  inputs.forEach((input) => {
  const id = input.id;
  if (id !== "age" && id !== "gender" && id !== "bmi") {
    input.disabled = false;
  }
});
  document.getElementById("saveBtn").style.display = "block";
}

document.getElementById("saveBtn").addEventListener("click", async () => {
  const height = parseFloat(document.getElementById("height").value);
  const weight = parseFloat(document.getElementById("weight").value);
  const blood_type = document.getElementById("blood").value;
  const allergies = document.getElementById("allergy").value;
  const underlying_conditions = document.getElementById("disease").value;
  const mental_health_status = document.getElementById("mental").value;

  try {
    const res = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        height,
        weight,
        blood_type,
        allergies,
        underlying_conditions,
        mental_health_status
      })
    });

    if (!res.ok) throw new Error("Cập nhật thất bại");
    alert("Cập nhật thành công!");

    const bmi = (weight / ((height / 100) ** 2)).toFixed(1);
    document.getElementById("bmi").value = bmi;

    const inputs = document.querySelectorAll(".menu input");
    inputs.forEach(input => input.disabled = true);
    document.getElementById("saveBtn").style.display = "none";

  } catch (err) {
    console.error(err);
    alert("Có lỗi xảy ra khi cập nhật dữ liệu.");
  }
});

window.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch(apiUrl, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    if (!res.ok) throw new Error("Không thể tải dữ liệu");

    const data = await res.json();

    document.getElementById("age").value = data.age || "Chưa xác định";
    document.getElementById("gender").value = data.gender || "";
    document.getElementById("height").value = data.height || "";
    document.getElementById("weight").value = data.weight || "";
    document.getElementById("blood").value = data.blood_type || "";
    document.getElementById("allergy").value = data.allergies || "";
    document.getElementById("disease").value = data.underlying_conditions || "";
    document.getElementById("mental").value = data.mental_health_status || "";

    const bmi = (data.weight / ((data.height / 100) ** 2)).toFixed(1);
    document.getElementById("bmi").value = isNaN(bmi) ? "" : bmi;

  } catch (err) {
    console.error(err);
    alert("Không thể tải dữ liệu sức khỏe.");
  }
});
