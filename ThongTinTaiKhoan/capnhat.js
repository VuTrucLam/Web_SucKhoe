function enableEdit() {
  document.querySelectorAll(".menu input").forEach(input => input.disabled = false);
  document.getElementById("saveBtn").style.display = "block";
}

document.getElementById("saveBtn").addEventListener("click", () => {
  const token = localStorage.getItem("token");

  const data = {
    name: document.getElementById("name").value,
    phone: document.getElementById("phone").value,
    email: document.getElementById("email").value,
    birth_date: document.getElementById("dob").value,
    gender: document.getElementById("gender").value,
    role: document.getElementById("role").value,
    avatar: document.querySelector(".avatar").src
  };

  fetch("http://localhost:3000/api/user/me", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((res) => {
      alert(res.message || "Cập nhật thành công");
      location.reload();
    })
    .catch((err) => {
      console.error("Lỗi cập nhật:", err);
      alert("Lỗi khi cập nhật thông tin.");
    });
});