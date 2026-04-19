require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
});

const products = [
  {
    name: 'Noir Wool Overcoat',
    description: 'A tailored charcoal wool coat with a minimalist silhouette and structured shoulders.',
    category: 'Outerwear',
    price: 890.00,
    discount: 0,
    image_url: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400&q=80',
    stock: 42
  },
  {
    name: 'Obsidian Leather Duffel',
    description: 'Full-grain leather duffel in midnight black with brass hardware.',
    category: 'Leather Goods',
    price: 1250.00,
    discount: 0,
    image_url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80',
    stock: 3
  },
  {
    name: 'Merlot Silk Slip Dress',
    description: 'Bias-cut silk slip in deep merlot, draped with effortless precision.',
    category: 'Dresses',
    price: 420.00,
    discount: 19,
    image_url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80',
    stock: 18
  },
  {
    name: 'Steel Chrono Watch',
    description: 'Swiss-movement chronograph with sapphire crystal and black leather strap.',
    category: 'Accessories',
    price: 595.00,
    discount: 0,
    image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80',
    stock: 56
  },
  {
    name: 'Calfskin Derby Shoes',
    description: 'Hand-stitched calfskin derbies in cognac with a leather sole.',
    category: 'Footwear',
    price: 680.00,
    discount: 10,
    image_url: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=400&q=80',
    stock: 27
  },
  {
    name: 'Cashmere Turtleneck',
    description: 'Grade-A cashmere ribbed turtleneck in ivory with a relaxed silhouette.',
    category: 'Knitwear',
    price: 345.00,
    discount: 0,
    image_url: 'https://images.unsplash.com/photo-1581803118522-7b72a50f7e9f?w=400&q=80',
    stock: 0
  },
  {
    name: 'Hammered Gold Cuff',
    description: 'Hand-hammered 18k gold-plated brass cuff with a raw, sculptural finish.',
    category: 'Jewellery',
    price: 220.00,
    discount: 0,
    image_url: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80',
    stock: 15
  },
  {
    name: 'Linen Blazer — Chalk',
    description: 'Unstructured linen blazer in chalk white. Relaxed Italian cut.',
    category: 'Outerwear',
    price: 490.00,
    discount: 15,
    image_url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&q=80',
    stock: 9
  },
  {
    name: 'Marche Shoulder Bag',
    description: 'Crafted from vegetable-tanned Italian calfskin. The deep maroon hue is achieved through a 14-day immersion process in organic pigments, ensuring a patina that deepens over a lifetime of use.',
    category: 'Leather Goods',
    price: 2850.00,
    discount: 0,
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtgtxP_rCpWLOrvqLh8EYmKWXDkXHbc_ccSaZndlqRmac3rXTTdcx-CRzU2tyE0Fmys7_jQvP6V7_JoVlE2QIbbNPhBPIII7ZSv9Gfrse_NP9hDGsDvn7eQaXc1mTkRrQWRcGGBhg5MK8VGAZDaVuIqZDUR1ZAG0nOzQUXfridGI3g6PCm7XnJCbd8M2o9wVOOLwf8ebxqtpfiMYS5SMQHz0VxBk1_H7JM6OMDuhf4dwsQ-DULYLowzQ-lE6K5nm-6N43ZmCreFRk',
    stock: 5
  },
  {
    name: 'Signature Scent No. 04',
    description: 'Notes of sandalwood & aged vine. A scent that captures the essence of the Monograph heritage.',
    category: 'Accessories',
    price: 245.00,
    discount: 5,
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQxDcW0UdyHBJ0Hdb874qoec-sBsvLA1BK_GCOksJaZwAvFJLWjkno2vkbJhiOpmXDyrp07LkN-eg_sEoFRqR9cujYuAQ1VETW982bMJlQSvnFadaFCwsbQfhPn-9H2wO_u3BFZJ1FggqS-1u7aJLzeB2TKUrBSqxseDyyN0YpBpxeXRSQzmitpyoiDgSqS5P4PK1kXeomZM9w1Rm5t20WgX38TTaEts3GCn2XROZvEikvCAF0fbCVe3bzHilKAHkvray_6NF_p0I',
    stock: 12
  }
];

async function seed() {
  const client = await pool.connect();
  try {
    console.log('Seeding products...');
    for (const p of products) {
      await client.query(
        `INSERT INTO products (name, description, category, price, discount, image_url, stock)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         ON CONFLICT DO NOTHING`,
        [p.name, p.description, p.category, p.price, p.discount, p.image_url, p.stock]
      );
      console.log(`  ✓ ${p.name}`);
    }
    console.log('\nDone! Products seeded successfully.');
  } catch (err) {
    console.error('Seed error:', err.message);
  } finally {
    client.release();
    await pool.end();
  }
}

seed();
