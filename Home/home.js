// testimonial.js

const testimonials = [
  {
    text: "“Tính năng theo dõi sức khỏe cá nhân rất hữu ích. Tôi có thể dễ dàng ghi lại và theo dõi các chỉ số quan trọng của mình.”",
    name: "Vũ A",
    role: "Người dùng",
    image: "../IMAGES/avatar1L.png"
  },
  {
    text: "“Tôi đánh giá cao sự đầu tư nghiêm túc vào một nền tảng quản lý và tư vấn sức khỏe toàn diện như Core Health. Đây là một công cụ hữu ích giúp người bệnh chủ động hơn trong việc theo dõi và chăm sóc sức khỏe của bản thân.”",
    name: "Nguyễn B",
    role: "Bác sĩ",
    image: "../IMAGES/avatar2L.png"
  },
  {
    text: "“Tôi rất hài lòng với dịch vụ tư vấn trực tuyến. Bác sĩ phản hồi nhanh chóng và đưa ra những lời khuyên hữu ích.”",
    name: "Minh C",
    role: "Người dùng",
    image: "../IMAGES/avatar3L.png"
  }
];

let current = 0;

function showTestimonial(index) {
  const container = document.querySelector(".testimonial-content");
  const item = testimonials[index];

  container.innerHTML = `
    <div class="quote-icon">❝</div>
    <p class="feedback">${item.text}</p>
    <div class="user-info">
      <img src="${item.image}" alt="Avatar" class="avatar">
      <div>
        <strong>${item.name}</strong><br>
        <span>${item.role}</span>
      </div>
    </div>
  `;
}

function nextTestimonial() {
  current = (current + 1) % testimonials.length;
  showTestimonial(current);
}

function prevTestimonial() {
  current = (current - 1 + testimonials.length) % testimonials.length;
  showTestimonial(current);
}

window.addEventListener("DOMContentLoaded", () => {
  showTestimonial(current);

  document.querySelector(".arrow.right").addEventListener("click", nextTestimonial);
  document.querySelector(".arrow.left").addEventListener("click", prevTestimonial);
});
