const fs = require('fs');
const db = require('./db');
db.query('SELECT * FROM products').then(res => {
  fs.writeFileSync('db_out_utf8.txt', JSON.stringify(res.rows, null, 2));
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
