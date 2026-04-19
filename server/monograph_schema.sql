-- ===============================
-- 1. USERS (with admin support)
-- ===============================
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role VARCHAR(20) DEFAULT 'user', -- 'admin' or 'user'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===============================
-- 2. PRODUCTS (with discount)
-- ===============================
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  category VARCHAR(100),
  price NUMERIC(10,2) NOT NULL,
  discount NUMERIC(5,2) DEFAULT 0, -- %
  final_price NUMERIC(10,2),
  image_url TEXT,
  stock INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===============================
-- 3. ORDERS
-- ===============================
CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  total_price NUMERIC(10,2),
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===============================
-- 4. ORDER ITEMS (VERY IMPORTANT)
-- ===============================
CREATE TABLE IF NOT EXISTS order_items (
  id SERIAL PRIMARY KEY,
  order_id INT REFERENCES orders(id) ON DELETE CASCADE,
  product_id INT REFERENCES products(id),
  quantity INT NOT NULL,
  price NUMERIC(10,2)
);

-- ===============================
-- 5. AUTO FINAL PRICE CALCULATION
-- ===============================
CREATE OR REPLACE FUNCTION update_final_price()
RETURNS TRIGGER AS $$
BEGIN
  NEW.final_price = NEW.price - (NEW.price * NEW.discount / 100);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_final_price ON products;
CREATE TRIGGER trigger_final_price
BEFORE INSERT OR UPDATE ON products
FOR EACH ROW
EXECUTE FUNCTION update_final_price();

-- ===============================
-- 6. CREATE ADMIN USER
-- ===============================
-- Note: Replace 'admin123' with a bcrypt-hashed password in production
INSERT INTO users (name, email, password_hash, role)
VALUES ('Admin', 'admin@store.com', 'admin123', 'admin')
ON CONFLICT (email) DO NOTHING;
