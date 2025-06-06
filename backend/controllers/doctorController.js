const db = require('../db');

exports.createDoctorProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { specialty, experience_years, phone, address, avatar } = req.body;

    // Lấy đối tượng Promise từ db
    const con = db.promise();

    // Kiểm tra role
    const [users] = await con.query('SELECT role FROM users WHERE id = ?', [userId]);
    if (!users.length || users[0].role !== 'doctor') {
      return res.status(403).json({ message: 'Không có quyền truy cập' });
    }

    // Kiểm tra đã có hồ sơ chưa
    const [existing] = await con.query('SELECT * FROM doctors WHERE user_id = ?', [userId]);
    if (existing.length > 0) {
      return res.status(400).json({ message: 'Hồ sơ bác sĩ đã tồn tại' });
    }

    // Thêm hồ sơ mới
    await con.query(
      'INSERT INTO doctors (user_id, specialty, experience_years, phone, address, avatar) VALUES (?, ?, ?, ?, ?, ?)',
      [userId, specialty, experience_years, phone, address, avatar]
    );

    return res.status(201).json({ message: 'Tạo hồ sơ bác sĩ thành công' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Lỗi máy chủ' });
  }
};

exports.getDoctorById = async (req, res) => {
  const doctorId = req.params.id;

  try {
    const [rows] = await db.promise().query(
      `SELECT d.id, d.user_id, d.specialty, d.experience_years, d.phone, d.address, d.avatar, u.name, u.email 
       FROM doctors d 
       JOIN users u ON d.user_id = u.id 
       WHERE d.id = ?`,
      [doctorId]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Không tìm thấy bác sĩ.' });
    }

    const doctor = rows[0];
    res.json({
      id: doctor.id,
      name: doctor.name,
      email: doctor.email,
      specialty: doctor.specialty,
      experience_years: doctor.experience_years,
      phone: doctor.phone,
      address: doctor.address,
      avatar: doctor.avatar ? `http://localhost:3000/${doctor.avatar}` : null,
    });
  } catch (err) {
    console.error('Lỗi lấy thông tin bác sĩ:', err);
    res.status(500).json({ message: 'Lỗi server khi lấy thông tin bác sĩ.' });
  }
};