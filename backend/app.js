const express = require('express');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/auth');

const userRoutes = require("./routes/user");

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.use("/api/user", userRoutes);
app.use('/uploads', express.static('uploads'));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});
