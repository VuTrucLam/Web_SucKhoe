const db = require('../db');

// Gửi tin nhắn
exports.sendMessage = async (req, res) => {
  const { receiver_id, message } = req.body;
  const sender_id = req.user.id;

  if (!receiver_id || !message) {
    return res.status(400).json({ message: "Thiếu thông tin!" });
  }

  try {
    await db.promise().query(
      "INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)",
      [sender_id, receiver_id, message]
    );
    res.status(201).json({ message: "Gửi tin nhắn thành công!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server!" });
  }
};

// Lấy lịch sử tin nhắn giữa 2 người
exports.getConversation = async (req, res) => {
  const user_id = req.user.id;
  const partner_id = req.params.partnerId;

  try {
    const [rows] = await db.promise().query(
      `SELECT * FROM messages 
       WHERE (sender_id = ? AND receiver_id = ?) 
          OR (sender_id = ? AND receiver_id = ?) 
       ORDER BY sent_at ASC`,
      [user_id, partner_id, partner_id, user_id]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi lấy tin nhắn!" });
  }
};
