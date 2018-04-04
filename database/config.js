// require('dotenv').config();

const dotenv = require('dotenv');

dotenv.config();

// module.exports = {
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DB,
//   port: process.env.DB_PORT,
// };

module.exports = {
  host: 'thebeatbook.cf0tcwamdz9t.us-west-2.rds.amazonaws.com',
  user: 'thebeatbook',
  password: 'Manikstevetrent',
  database: 'beatbook',
  port: '3306',
};

