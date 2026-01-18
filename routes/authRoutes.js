import express from 'express';
import { register, login, createAdmins } from '../controllers/authController.js';
import { verifyToken, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

// --- PUBLIC ROUTES ---
router.post('/register', register);
router.post('/login', login);


// --- PROTECTED ROUTES ---
router.post('/create-admin', verifyToken, authorizeRoles('superadmin'), createAdmins);

export default router;