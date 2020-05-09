import express from 'express';

import { createAdmin, updateUserToAdmin  } from '../controllers/adminController.js';
import verifyAuth from '../middleware/validateToken.js';

const router = express.Router();

// Admin Routes
router.post('/admin/signup', verifyAuth, createAdmin);
router.put('/admin/updateUser', verifyAuth, updateUserToAdmin);

export default router;