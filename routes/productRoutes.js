import express from 'express';
import { verifyToken, authorizeRoles } from '../middleware/authMiddleware.js';
import { createProduct, deleteProduct, getProducts, updateProduct } from '../controllers/productController.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// Public: Everyone can view products

router.get('/', getProducts);

// Admin & Superadmin: Can Create & Update
router.post('/', verifyToken, authorizeRoles('admin', 'superadmin'), upload, createProduct);
router.put('/:id', verifyToken, authorizeRoles('admin', 'superadmin'), upload, updateProduct);

// SUPERADMIN: Can Delete
router.delete('/:id', verifyToken, authorizeRoles('superadmin'), deleteProduct);

export default router;