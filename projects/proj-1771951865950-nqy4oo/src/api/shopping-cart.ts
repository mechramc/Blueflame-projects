// Shopping Cart API

import express, { Request, Response } from 'express';

const router = express.Router();

// In-memory cart storage for demonstration purposes
const cart: Record<string, any[]> = {};

// Add item to cart
router.post('/cart/:userId/items', (req: Request, res: Response) => {
    const { userId } = req.params;
    const { itemId, quantity } = req.body;

    if (!itemId || quantity <= 0) {
        return res.status(400).json({ error: 'Invalid item or quantity.' });
    }

    if (!cart[userId]) {
        cart[userId] = [];
    }

    const existingItem = cart[userId].find(item => item.itemId === itemId);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart[userId].push({ itemId, quantity });
    }

    res.status(201).json(cart[userId]);
});

// Remove item from cart
router.delete('/cart/:userId/items/:itemId', (req: Request, res: Response) => {
    const { userId, itemId } = req.params;

    if (!cart[userId]) {
        return res.status(404).json({ error: 'Cart not found.' });
    }

    cart[userId] = cart[userId].filter(item => item.itemId !== itemId);
    res.status(204).send();
});

// Update item quantity in cart
router.put('/cart/:userId/items/:itemId', (req: Request, res: Response) => {
    const { userId, itemId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity <= 0) {
        return res.status(400).json({ error: 'Invalid quantity.' });
    }

    if (!cart[userId]) {
        return res.status(404).json({ error: 'Cart not found.' });
    }

    const existingItem = cart[userId].find(item => item.itemId === itemId);
    if (!existingItem) {
        return res.status(404).json({ error: 'Item not found in cart.' });
    }

    existingItem.quantity = quantity;
    res.status(200).json(cart[userId]);
});

export default router;
