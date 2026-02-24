// Import necessary libraries
import request from 'supertest';
import app from '../app'; // Assuming your Express app is exported from app.ts

describe('Payment Processing API', () => {
  it('should process payment successfully', async () => {
    const response = await request(app)
      .post('/api/payment')
      .send({
        amount: 1000,
        currency: 'usd',
        paymentMethodId: 'pm_card_visa', // Example payment method ID
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it('should save payment method successfully', async () => {
    const response = await request(app)
      .post('/api/payment/save-method')
      .send({
        paymentMethodId: 'pm_card_visa', // Example payment method ID
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
});