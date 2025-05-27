const db = require('../db');

exports.addTheoDoiDieuTri = (req, res) => {
  const { name, ngay_bat_dau, ngay_ket_thuc, trang_thai, nhiet_do, huyet_ap, nhip_tim } = req.body;

  if (!name || !ngay_bat_dau || !ngay_ket_thuc) {
    return res.status(400).json({ error: 'Thiếu thông tin bắt buộc' });
  }

  const insertSql = `
    INSERT INTO theo_doi_dieu_tri 
    (name, ngay_bat_dau, ngay_ket_thuc, trang_thai, nhiet_do, huyet_ap, nhip_tim)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(insertSql, [name, ngay_bat_dau, ngay_ket_thuc, trang_thai, nhiet_do, huyet_ap, nhip_tim], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    res.json({ message: 'Thêm lịch theo dõi điều trị thành công!' });
  });
};
