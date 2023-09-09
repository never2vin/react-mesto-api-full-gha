const express = require('express');
const router = require('./routes');

const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');

const mongoose = require('mongoose');
require('dotenv').config();

const {
  PORT = 3000,
  MONGODB_URL = 'mongodb://localhost:27017/mestodb',
  CLIENT_URL = 'https://pr15.nomoredomainsicu.ru',
} = process.env;

mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
})
  .then(() => { console.log('Connected to db'); })
  .catch((err) => console.log(err));

const app = express();

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  }),
);

app.use(
  cors({
    origin: CLIENT_URL,
  }),
);

app.use(helmet());
app.use(express.json());

app.use(router);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
