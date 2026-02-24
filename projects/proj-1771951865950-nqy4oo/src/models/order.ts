// Order Model

import mongoose, { Document, Schema } from 'mongoose';

export interface Order extends Document {
  userId: string;
  items: Array<{ productId: string; quantity: number; }>; // Itemized details
  createdAt: Date;
}

const orderSchema: Schema = new Schema({
  userId: { type: String, required: true },
  items: [{ productId: String, quantity: Number }],
  createdAt: { type: Date, default: Date.now }
});

export const Order = mongoose.model<Order>('Order', orderSchema);
