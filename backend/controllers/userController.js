const db = require("../db");

const getUserInfo = (req, res) => {
  const userId = req.user.id;

  db.query("SELECT id, name, email, phone, birth_date, gender, role, avatar FROM users WHERE id = ?", 
    [userId], 
    (err, results) => {
      if (err) return res.status(500).json({ message: "Lỗi truy vấn", error: err });
      if (results.length === 0) return res.status(404).json({ message: "Không tìm thấy người dùng" });
      return res.json(results[0]);
    }
  );
};

const updateMe = (req, res) => {
  const userId = req.user.id;
  const { name, email, phone, birth_date, gender, role, avatar } = req.body;

  const sql = `UPDATE users 
               SET name = ?, email = ?, phone = ?, birth_date = ?, gender = ?, role = ?, avatar = ?
               WHERE id = ?`;

  db.query(
    sql,
    [name, email, phone, birth_date, gender, role, avatar, userId],
    (err, result) => {
      if (err) {
        console.error("Lỗi cập nhật:", err);
        return res.status(500).json({ message: "Lỗi cập nhật thông tin.", error: err.message });
      }

      res.json({ message: "Cập nhật thông tin thành công." });
    }
  );
};

module.exports = {
  getUserInfo,
  updateMe,
};
