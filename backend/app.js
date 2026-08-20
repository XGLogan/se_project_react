require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');

const router = require('./routes');

const app = express();
const { PORT = 3001 } = process.env;

mongoose.connect('mongodb://localhost:27017/wtwr_db');

app.use(cors());
app.use(express.json());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

app.use('/', router);

app.use(errors());

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});