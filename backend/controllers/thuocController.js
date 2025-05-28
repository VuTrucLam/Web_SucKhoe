const db = require('../db');

exports.searchThuoc = (req, res) => {
  const keyword = req.query.keyword;

  if (!keyword) {
    return res.status(400).json({ error: 'Vui lòng nhập từ khóa tìm kiếm' });
  }

  const sql = `
    SELECT * FROM thuoc 
    WHERE name LIKE ?
  `;
  const searchValue = `%${keyword}%`;

  db.query(sql, [searchValue], (err, results) => {
    if (err) {
      console.error('Lỗi truy vấn:', err);
      return res.status(500).json({ error: 'Lỗi máy chủ' });
    }

    res.json({ data: results });
  });
};
