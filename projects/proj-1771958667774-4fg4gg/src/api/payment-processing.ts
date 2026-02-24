// Import necessary modules and types
import express, { Request, Response } from 'express';
import Stripe from 'stripe';
import paypal from 'paypal-rest-sdk';

// Initialize Stripe and PayPal configurations
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2020-08-27' });
paypal.configure({
  mode: 'sandbox', // Change to 'live' for production
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET
});

const router = express.Router();

// Payment processing endpoint
router.post('/process-payment', async (req: Request, res: Response) => {
  const { paymentMethod, amount } = req.body;

  if (!paymentMethod || !amount) {
    return res.status(400).json({ error: 'Payment method and amount are required.' });
  }

  try {
    let paymentResult;

    if (paymentMethod === 'stripe') {
      paymentResult = await stripe.charges.create({
        amount,
        currency: 'usd',
        source: req.body.token,
        description: 'Payment for order'
      });
    } else if (paymentMethod === 'paypal') {
      const create_payment_json = {
        intent: 'sale',
        payer: {
          payment_method: 'paypal'
        },
        transactions: [{
          amount: {
            currency: 'USD',
            total: (amount / 100).toFixed(2)
          },
          description: 'Payment for order'
        }],
        redirect_urls: {
          return_url: 'http://localhost:3000/success',
          cancel_url: 'http://localhost:3000/cancel'
        }
      };

      paymentResult = await new Promise((resolve, reject) => {
        paypal.payment.create(create_payment_json, (error, payment) => {
          if (error) {
            reject(error);
          } else {
            resolve(payment);
          }
        });
      });
    } else {
      return res.status(400).json({ error: 'Invalid payment method.' });
    }

    return res.status(200).json({ success: true, paymentResult });
  } catch (error) {
    return res.status(500).json({ error: 'Payment processing failed.', details: error.message });
  }
});

export default router;
