// Order Service to handle order-related operations

import { Order } from '../models/order';

/**
 * Fetch order history for a user
 * @param userId - The ID of the user
 * @returns Promise<Order[]>
 */
export const getOrderHistory = async (userId: string): Promise<Order[]> => {
  // Simulated database fetch. Replace with actual DB call.
  const orders = await Order.find({ userId }).sort({ createdAt: -1 });
  return orders;
};
