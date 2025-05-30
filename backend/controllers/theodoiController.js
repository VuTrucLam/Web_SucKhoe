const db = require('../db');

exports.addTheoDoiDieuTri = (req, res) => {
  const { ngay_bat_dau, ngay_ket_thuc, trang_thai, nhiet_do, huyet_ap, nhip_tim } = req.body;

  console.log("Dữ liệu nhận được:", req.body); 

  if ( !ngay_bat_dau || !ngay_ket_thuc) {
    
    console.log("Ngày bắt đầu:", ngay_bat_dau);
    console.log("Ngày kết thúc:", ngay_ket_thuc);

    return res.status(400).json({ error: 'Thiếu thông tin bắt buộc' });
  }
  const insertSql = `
    INSERT INTO theo_doi_dieu_tri 
    (ngay_bat_dau, ngay_ket_thuc, trang_thai, nhiet_do, huyet_ap, nhip_tim)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(insertSql, [ngay_bat_dau, ngay_ket_thuc, trang_thai, nhiet_do, huyet_ap, nhip_tim], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    res.json({ message: 'Thêm lịch theo dõi điều trị thành công!' });
  });
};

