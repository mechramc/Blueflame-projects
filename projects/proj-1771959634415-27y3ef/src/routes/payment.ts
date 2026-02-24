// Payment routes for handling payment processing and webhooks

import { Router } from 'express';
import { processPayment, handleWebhook } from '../services/stripe';

const router = Router();

// Route for processing payments
router.post('/process', processPayment);

// Route for handling Stripe webhooks
router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);

export default router;
