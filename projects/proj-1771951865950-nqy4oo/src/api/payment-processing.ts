// Import necessary libraries
import Stripe from 'stripe';
import { Request, Response } from 'express';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2020-08-27' });

// Payment processing handler
export const processPayment = async (req: Request, res: Response): Promise<void> => {
  const { amount, currency, paymentMethodId } = req.body;

  try {
    // Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method: paymentMethodId,
      confirmation_method: 'manual',
      confirm: true,
    });

    // Respond with the payment intent details
    res.status(200).json({ success: true, paymentIntent });
  } catch (error) {
    // Handle errors
    res.status(400).json({ success: false, error: error.message });
  }
};

// Endpoint to save a payment method
export const savePaymentMethod = async (req: Request, res: Response): Promise<void> => {
  const { paymentMethodId } = req.body;

  try {
    // Attach the payment method to the customer
    const customer = await stripe.customers.create({
      payment_method: paymentMethodId,
    });

    res.status(200).json({ success: true, customer });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Exporting the functions for use in routes
export default { processPayment, savePaymentMethod };