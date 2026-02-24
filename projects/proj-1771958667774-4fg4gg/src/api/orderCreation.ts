// Order creation and summary return for e-commerce checkout

import { Request, Response } from 'express';
import { Order } from '../models/order';
import { Result, ok, err } from '../utils/result';

export const createOrder = async (req: Request, res: Response): Promise<Response> => {
    const orderData = req.body;

    // Validate order data
    if (!orderData || !orderData.items || orderData.items.length === 0) {
        return res.status(400).json({ message: 'Invalid order data' });
    }

    try {
        // Create order record in the database
        const newOrder = await Order.create(orderData);

        // Return order summary in JSON format
        return res.status(201).json({
            orderId: newOrder.id,
            items: newOrder.items,
            total: newOrder.total,
            status: newOrder.status
        });
    } catch (error) {
        console.error('Error creating order:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
