
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const productsRoutes = require('./routes/products');
const authRoutes = require('./routes/auth');
const { products } = require('../src/data/products');
const Product = require('./models/Product');

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productsRoutes);
app.use('/api/auth', authRoutes);

// Seed database if empty
const seedDatabase = async () => {
  try {
    const count = await Product.countDocuments();
    if (count === 0) {
      await Product.insertMany(products);
      console.log('Database seeded with initial products');
    }
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

seedDatabase();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
