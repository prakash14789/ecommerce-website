const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./db');
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// --- AUTHENTICATION ENDPOINTS ---

// 1. REGISTER NEW MEMBER
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newUser = await db.query(
      'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email',
      [name, email, hash]
    );

    res.json(newUser.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error creating registry identity' });
  }
});

// 2. SECURE LOGIN (With Role Support)
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) return res.status(401).json({ message: 'Identity not found' });

    const user = result.rows[0];
    
    // For admin, check plaintext if it matches the mock admin password or use bcrypt
    // In production, everything should be bcrypt
    const validPassword = user.role === 'admin' && user.password_hash === 'admin123' 
      ? password === 'admin123' 
      : await bcrypt.compare(password, user.password_hash);

    if (!validPassword) return res.status(401).json({ message: 'Mismatching Access Key' });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({ token, id: user.id, name: user.name, email: user.email, role: user.role });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// --- PRODUCT ENDPOINTS ---

// 3. GET ALL PRODUCTS (With automated final prices)
app.get('/api/products', async (req, res) => {
  try {
    const products = await db.query('SELECT * FROM products ORDER BY id DESC');
    res.json(products.rows);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving collection' });
  }
});

// 4. ADD NEW PRODUCT (Admin Only)
app.post('/api/products', async (req, res) => {
  const { name, description, category, price, discount, image_url, stock } = req.body;
  try {
    const newProduct = await db.query(
      'INSERT INTO products (name, description, category, price, discount, image_url, stock) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [name, description, category, price, discount, image_url, stock]
    );
    res.json(newProduct.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error archiving product' });
  }
});

// --- ORDER ENDPOINTS ---

// 5. SUBMIT BOLD ORDER (Transaction Based)
app.post('/api/orders', async (req, res) => {
  const { userId, totalPrice, items } = req.body; // items: [{product_id, quantity, price}]
  try {
    // Start Transaction
    await db.query('BEGIN');

    // Create Main Order
    const orderResult = await db.query(
      'INSERT INTO orders (user_id, total_price) VALUES ($1, $2) RETURNING id',
      [userId, totalPrice]
    );
    const orderId = orderResult.rows[0].id;

    // Create Order Items
    for (const item of items) {
      await db.query(
        'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)',
        [orderId, item.product_id, item.quantity, item.price]
      );
    }

    await db.query('COMMIT');
    res.json({ message: 'Manifest Synchronized', orderId });
  } catch (err) {
    await db.query('ROLLBACK');
    res.status(500).json({ message: 'Registry Order Failure' });
  }
});

// 6. UPDATE PRODUCT (Admin Only)
app.put('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, category, price, discount, image_url, stock } = req.body;
  try {
    const updatedProduct = await db.query(
      'UPDATE products SET name = $1, description = $2, category = $3, price = $4, discount = $5, image_url = $6, stock = $7 WHERE id = $8 RETURNING *',
      [name, description, category, price, discount, image_url, stock, id]
    );
    if (updatedProduct.rows.length === 0) return res.status(404).json({ message: 'Product not found' });
    res.json(updatedProduct.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error updating product' });
  }
});

// 7. DELETE PRODUCT (Admin Only)
app.delete('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product removed from collection', product: result.rows[0] });
  } catch (err) {
    res.status(500).json({ message: 'Error removing product' });
  }
});

// 8. REMOVE DUPLICATES (Cleanup Utility)
app.post('/api/products/cleanup', async (req, res) => {
  try {
    // Keeps the one with the highest ID (latest) for each name
    const result = await db.query(`
      DELETE FROM products 
      WHERE id NOT IN (
        SELECT MAX(id) 
        FROM products 
        GROUP BY name
      )
      RETURNING *
    `);
    res.json({ message: `Purged ${result.rows.length} duplicate entries`, purged: result.rows });
  } catch (err) {
    res.status(500).json({ message: 'Error during cleanup' });
  }
});

// 9. GET USER ORDERS (Detailed)
app.get('/api/orders/user/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const orders = await db.query(
      `SELECT o.id, o.total_price, o.status, o.created_at, 
              json_agg(json_build_object('name', p.name, 'quantity', oi.quantity, 'price', oi.price)) as items
       FROM orders o
       JOIN order_items oi ON o.id = oi.order_id
       LEFT JOIN products p ON oi.product_id = p.id
       WHERE o.user_id = $1
       GROUP BY o.id
       ORDER BY o.created_at DESC`,
      [id]
    );
    res.json(orders.rows);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving user manifest' });
  }
});

app.listen(PORT, () => {
  console.log(`--- MONOGRAPH ATELIER BACKEND: RUNNING ON PORT ${PORT} ---`);
});
