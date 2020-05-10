
import express from 'express';

import seedUser from '../controllers/seedUserController.js';

const router = express.Router();

// seed user route
router.get('/users/seed', seedUser);

export default router;