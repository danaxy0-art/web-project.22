require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const authRoutes = require('./src/routes/authRoutes');
const courseRoutes = require('./src/routes/courseRoutes');

const app = express();


// ===== Middleware =====

app.use(cors({
  origin: '*'
}));

app.use(express.json());


// ===== MongoDB Connection =====

mongoose.connect(process.env.MONGO_URI)

.then(() => {
  console.log('MongoDB Atlas connected');
})

.catch((err) => {
  console.log('MongoDB connection error:', err);
});


// ===== Routes =====

app.use('/api/auth', authRoutes);

app.use('/api/courses', courseRoutes);


// ===== Test Route =====

app.get('/', (req, res) => {
  res.json({
    message: 'Study Planner API is running...'
  });
});


// ===== Server =====

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});