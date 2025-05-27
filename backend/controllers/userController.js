const db = require("../db");

exports.getUserInfo = (req, res) => {
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
