import express from 'express';
import { verifyToken, authorizeRoles } from '../middleware/authMiddleware.js';
import { 
  addToCart, 
  getCart, 
  updateQuantity, 
  removeFromCart,
  getAllCarts 
} from '../controllers/cartController.js';

const router = express.Router();

//GET ALL CARTS - ADMIN
router.get('/all', verifyToken, authorizeRoles('superadmin'), getAllCarts);


router.get('/:id', verifyToken, authorizeRoles('user', 'admin', 'superadmin'), getCart)
router.get('/', verifyToken, authorizeRoles('user', 'admin', 'superadmin'), getCart);;
router.post('/add', verifyToken, authorizeRoles('user', 'admin', 'superadmin'), addToCart);
router.put('/:id', verifyToken, authorizeRoles('user', 'admin', 'superadmin'), updateQuantity);
router.delete('/:id', verifyToken, authorizeRoles('user', 'admin', 'superadmin'), removeFromCart);

export default router;