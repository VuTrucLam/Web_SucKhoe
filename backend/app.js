const express = require('express');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/auth');
const healthRoutes = require('./routes/health');


const app = express();
app.use(cors());
app.use(express.json());
const userRoutes = require("./routes/user");
const theoDoiDieuTriRoutes = require('./routes/theodoidieutri');

app.use('/api/auth', authRoutes);
app.use('/api/theo_doi_dieu_tri', theoDoiDieuTriRoutes);
app.use(express.static('public'));

app.use("/api/user", userRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/api/health-profiles', healthRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});
