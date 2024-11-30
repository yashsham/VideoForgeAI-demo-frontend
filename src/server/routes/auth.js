import express from 'express';
import { register, login, logout, validate } from '../controllers/authController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', authenticateToken, logout);
router.get('/validate', authenticateToken, validate);

export default router;