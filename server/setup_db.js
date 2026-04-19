const fs = require('fs');
const path = require('path');
const db = require('./db');
require('dotenv').config();

async function setupDatabase() {
  console.log('--- INITIATING MONOGRAPH REGISTRY ARCHITECTURAL SETUP ---');
  try {
    // Read the SQL Blueprint
    const sqlPath = path.join(__dirname, 'monograph_schema.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');

    // Execute the Blueprint in segments (Postgres pg-pool.query handles multiple commands usually but split for safety)
    console.log('--- EXECUTING POSTGRESQL BLUEPRINT ---');
    await db.query(sql);

    console.log('--- MONOGRAPH REGISTRY SETUP COMPLETE ---');
    console.log('--- ELITE MEMBERS AND ORDER MANIFESTS READY ---');
    process.exit(0);
  } catch (err) {
    console.error('--- ARCHITECTURAL FAILURE ---');
    console.error('ERROR:', err.message);
    process.exit(1);
  }
}

setupDatabase();
