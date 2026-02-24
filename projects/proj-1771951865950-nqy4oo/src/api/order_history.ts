// Order History API Endpoint

import express, { Request, Response } from 'express';
import { authenticateJWT } from './authentication';
import { getOrderHistory } from '../services/orderService';

const router = express.Router();

// Middleware to authenticate JWT
router.use(authenticateJWT);

/**
 * @route GET /api/order-history
 * @desc Get itemized order history with timestamps
 * @access Private
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const userId = req.user.id; // Assuming user ID is stored in JWT
    const orders = await getOrderHistory(userId);
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching order history:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
