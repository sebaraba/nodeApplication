import express from 'express';

import { registerUser, siginUser, searchFirstOrLastName } from '../controllers/usersController.js';
import validateToken from '../middleware/validateToken.js';

const router = express.Router();

// User Routes
router.post('/login', siginUser);
router.post('/register', registerUser);
router.get('/users/search', validateToken, searchFirstOrLastName);

export default router;