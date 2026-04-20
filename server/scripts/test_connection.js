const db = require('../config/db');
require('dotenv').config();

async function testConnection() {
  console.log('--- INITIATING MONOGRAPH REGISTRY HANDSHAKE ---');
  try {
    const result = await db.query('SELECT NOW()');
    console.log('--- CONNECTION ESTABLISHED SUCCESSFULLY ---');
    console.log('SERVER TIME:', result.rows[0].now);
    console.log('DATABASE NAME:', process.env.DB_NAME);
    process.exit(0);
  } catch (err) {
    console.error('--- CONNECTION FAILURE ---');
    console.error('ERROR MESSAGE:', err.message);
    process.exit(1);
  }
}

testConnection();
