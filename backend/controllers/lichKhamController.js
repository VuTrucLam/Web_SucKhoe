const db = require('../db');

// Thêm lịch khám bệnh mới
exports.addLichKham = (req, res) => {
  const {date,time,status,reason,doctor,hospital,hospital_contact,department,is_periodic,note
  } = req.body;

  if (!date || !time || !status || !doctor || !hospital) {
    return res.status(400).json({ error: 'Thiếu thông tin bắt buộc.' });
  }

  const insertSql = `
    INSERT INTO lichkham (
      date, time, status, reason, doctor,
      hospital, hospital_contact, department,
      is_periodic, note
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(insertSql, [
    date,
    time,
    status,
    reason,
    doctor,
    hospital,
    hospital_contact,
    department,
    is_periodic ? 1 : 0,
    note
  ], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    res.json({ message: '🩺 Lưu lịch khám thành công!' });
  });
};

// Lấy tất cả lịch khám (tùy chọn)
exports.getAllLichKham = (req, res) => {
  db.query('SELECT * FROM lichkham ORDER BY date DESC, time DESC', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    res.json(results);
  });
};
