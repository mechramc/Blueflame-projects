// Import necessary modules and types
import express, { Request, Response } from 'express';
import { checkStockAndPricing } from '../services/cartService';

const router = express.Router();

// Validate shopping cart for stock availability and pricing
router.post('/validate', async (req: Request, res: Response) => {
  const cartItems = req.body.cartItems;

  if (!cartItems || !Array.isArray(cartItems)) {
    return res.status(400).json({ error: 'Invalid cart items' });
  }

  try {
    const validationResult = await checkStockAndPricing(cartItems);
    if (!validationResult.isValid) {
      return res.status(400).json({ error: validationResult.message });
    }

    return res.status(200).json({ message: 'Cart is valid', data: validationResult });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
