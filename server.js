import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB, sequelize } from './config/db.js';
import './models/associations.js';
import authRoutes from './routes/authRoutes.js'
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import userRoutes from './routes/userRoutes.js';
import seedAdmin from './adminSeeder.js';    
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

connectDB();

sequelize.sync({ alter: true })
  .then(async () => {
    console.log('Database tables synced.');
    await seedAdmin(); 
  })
  .catch((err) => console.log('Sync error: ' + err));

// 4. Routes
app.use('/api/auth', authRoutes);
app.use('/api/products',productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/users', userRoutes);


// 5. Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});