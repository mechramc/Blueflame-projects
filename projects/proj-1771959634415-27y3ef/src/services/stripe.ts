// Stripe service for handling payment processing and webhooks

import Stripe from 'stripe';
import { Request, Response } from 'express';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2020-08-27' });

// Function to process one-time payments
export const processPayment = async (req: Request, res: Response) => {
  const { amount, currency, source } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method: source,
      confirm: true,
    });
    return res.status(200).json({ success: true, paymentIntent });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};

// Webhook handler for Stripe events
export const handleWebhook = async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('PaymentIntent was successful!', paymentIntent);
      break;
    case 'payment_intent.payment_failed':
      const paymentError = event.data.object;
      console.log('PaymentIntent failed:', paymentError);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).json({ received: true });
};
