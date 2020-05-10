import express from 'express';

import { healthCheck } from '../controllers/healthCheckController.js';

const router = express.Router();

// Admin Routes
router.get('/health', healthCheck);

export default router;