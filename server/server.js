
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import productsRoutes from './routes/products.js';
import authRoutes from './routes/auth.js';
import { products } from './data/products.js';  // Updated import path
import Product from './models/Product.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productsRoutes);
app.use('/api/auth', authRoutes);

// Connect to MongoDB
let isConnected = false;

const initializeDatabase = async () => {
  if (!isConnected) {
    try {
      await connectDB();
      isConnected = true;
      
      // Seed database if empty
      try {
        const count = await Product.countDocuments();
        if (count === 0) {
          await Product.insertMany(products);
          console.log('Database seeded with initial products');
        }
      } catch (error) {
        console.error(`Error seeding database: ${error.message}`);
      }
    } catch (error) {
      console.error(`Failed to initialize database: ${error.message}`);
    }
  }
};

// Add a health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok',
    mongo: isConnected ? 'connected' : 'disconnected' 
  });
});

initializeDatabase();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
