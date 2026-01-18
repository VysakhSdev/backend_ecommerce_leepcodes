import express from 'express';
import { verifyToken, authorizeRoles } from '../middleware/authMiddleware.js';
import { getAllCustomers, getAllUsers, getMyProfile } from '../controllers/userController.js';


const router = express.Router();
router.get('/all', verifyToken, authorizeRoles('superadmin'), getAllUsers);
router.get('/customers', verifyToken, authorizeRoles('admin'), getAllCustomers);
router.get('/me', verifyToken, getMyProfile);
export default router;