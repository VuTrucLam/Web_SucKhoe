const db = require('../db');

exports.createHealthProfile = async (req, res) => {
  const userId = req.user.id;
  const { height, weight, blood_type, allergies, underlying_conditions, mental_health_status } = req.body;

  try {
    // Sử dụng db.promise().query để dùng với await
    const [existing] = await db.promise().query('SELECT * FROM user_health_profiles WHERE user_id = ?', [userId]);
    if (existing.length > 0) {
      return res.status(400).json({ message: 'Hồ sơ sức khỏe đã tồn tại.' });
    }

    await db.promise().query(
      `INSERT INTO user_health_profiles 
      (user_id, height, weight, blood_type, allergies, underlying_conditions, mental_health_status) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [userId, height, weight, blood_type, allergies, underlying_conditions, mental_health_status]
    );

    res.json({ message: 'Tạo hồ sơ sức khỏe thành công.' });
  } catch (err) {
    console.error('Lỗi tạo hồ sơ:', err);
    res.status(500).json({ message: 'Lỗi server khi tạo hồ sơ.' });
  }
};

exports.getHealthProfile = async (req, res) => {
  const userId = req.user.id;

  try {
    const [rows] = await db.promise().query(
      `SELECT 
        u.birth_date,
        u.gender,
        h.height,
        h.weight,
        h.blood_type,
        h.allergies,
        h.underlying_conditions,
        h.mental_health_status
      FROM users u
      JOIN user_health_profiles h ON u.id = h.user_id
      WHERE u.id = ?`,
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Không tìm thấy hồ sơ sức khỏe.' });
    }

    const profile = rows[0];
    const currentYear = new Date().getFullYear();
    let age = null;
    if (profile.birth_date) {
      const birthDate = new Date(profile.birth_date); // Chuyển birth_date thành đối tượng Date
      const currentYear = new Date().getFullYear();
      age = currentYear - birthDate.getFullYear();

      // Kiểm tra xem đã qua sinh nhật trong năm nay chưa
      const currentMonth = new Date().getMonth();
      const birthMonth = birthDate.getMonth();
      const currentDay = new Date().getDate();
      const birthDay = birthDate.getDate();
      if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)) {
        age -= 1; // Nếu chưa qua sinh nhật, giảm tuổi đi 1
      }
    }
    const bmi = (profile.weight / ((profile.height / 100) ** 2)).toFixed(2); // chiều cao cm → m

    res.json({
      age,
      gender: profile.gender,
      height: profile.height,
      weight: profile.weight,
      bmi,
      blood_type: profile.blood_type,
      allergies: profile.allergies,
      underlying_conditions: profile.underlying_conditions,
      mental_health_status: profile.mental_health_status
    });
  } catch (err) {
    console.error('Lỗi lấy hồ sơ:', err);
    res.status(500).json({ message: 'Lỗi server khi lấy hồ sơ sức khỏe.' });
  }
};

