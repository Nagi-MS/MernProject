require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const reviewRoutes = require('./routes/reviewRoutes');

const server = express();
server.use(cors());
server.use(express.json());
server.use('/api/reviews', reviewRoutes);
server.get('/', (req, res) => res.send('Feedback API running'));

mongoose
  .connect(process.env.DATABASE_URI)
  .then(() => {
    console.log('Database connected');
    server.listen(process.env.PORT || 5000, () => console.log('Listening...'));
  })
  .catch((e) => console.log('DB error:', e.message));