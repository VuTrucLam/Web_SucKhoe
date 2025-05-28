const express = require('express');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/auth');
const healthRoutes = require('./routes/health');
const doctorRoutes = require('./routes/doctor');
const messageRoutes = require('./routes/message');


const app = express();
app.use(cors());
app.use(express.json());
const userRoutes = require("./routes/user");
const theoDoiDieuTriRoutes = require('./routes/theodoidieutri');
const lichKhamRoutes = require('./routes/lichkham');
const thuocRoutes = require('./routes/thuoc');

app.use('/api/auth', authRoutes);
app.use('/api/theo_doi_dieu_tri', theoDoiDieuTriRoutes);
app.use(express.static('public'));

app.use("/api/user", userRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/api/health-profiles', healthRoutes);
app.use('/api/lichkham', lichKhamRoutes);
app.use('/api/thuoc', thuocRoutes);

app.use('/api/doctors', doctorRoutes);
app.use('/api/messages', messageRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});
