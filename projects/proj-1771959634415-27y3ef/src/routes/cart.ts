// Import necessary modules
import express, { Request, Response } from 'express';
import { CartService } from '../services/cartService';

const router = express.Router();
const cartService = new CartService();

// Add item to cart
router.post('/add', async (req: Request, res: Response) => {
    const { userId, itemId, quantity } = req.body;
    try {
        const result = await cartService.addItemToCart(userId, itemId, quantity);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// Remove item from cart
router.delete('/remove', async (req: Request, res: Response) => {
    const { userId, itemId } = req.body;
    try {
        const result = await cartService.removeItemFromCart(userId, itemId);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// Update item quantity in cart
router.patch('/update', async (req: Request, res: Response) => {
    const { userId, itemId, quantity } = req.body;
    try {
        const result = await cartService.updateItemQuantity(userId, itemId, quantity);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// Get cart items
router.get('/', async (req: Request, res: Response) => {
    const { userId } = req.query;
    try {
        const cartItems = await cartService.getCartItems(userId);
        return res.status(200).json(cartItems);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default router;