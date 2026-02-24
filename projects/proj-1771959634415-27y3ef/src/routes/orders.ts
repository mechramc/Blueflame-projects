// Import necessary modules
import express, { Request, Response } from 'express';
import { getOrderHistory } from '../services/orderService';
import { authenticateJWT } from '../middleware/auth';

const router = express.Router();

// Order history retrieval endpoint
router.get('/history', authenticateJWT, async (req: Request, res: Response) => {
    try {
        const userId = req.user.id;
        const orders = await getOrderHistory(userId);
        return res.status(200).json(orders);
    } catch (error) {
        return res.status(500).json({ message: 'Error retrieving order history', error: error instanceof Error ? error.message : 'Unknown error' });
    }
});

export default router;
