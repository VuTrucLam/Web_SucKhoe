document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token"); // token từ đăng nhập

  if (!token) {
    alert("Bạn chưa đăng nhập.");
    window.location.href = "/login.html";
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/api/health-profiles", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error("Không lấy được dữ liệu sức khỏe.");
    }

    const data = await response.json();

    // Gán dữ liệu vào các input
    document.getElementById("age").value = data.age || "";
    document.getElementById("gender").value = data.gender || "";
    document.getElementById("height").value = data.height || "";
    document.getElementById("weight").value = data.weight || "";
    document.getElementById("blood").value = data.blood_type || "";
    document.getElementById("disease").value = data.underlying_conditions || "";
    document.getElementById("allergy").value = data.allergies || "";
    document.getElementById("mental").value = data.mental_health_status || "";
    document.getElementById("bmi").value = data.bmi || "";
  } catch (err) {
    console.error("Lỗi:", err);
    alert("Có lỗi xảy ra khi tải dữ liệu sức khỏe.");
  }
});
