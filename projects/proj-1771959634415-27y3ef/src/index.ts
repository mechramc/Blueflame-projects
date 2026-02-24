// Main application entry point

import express from 'express';
import paymentRoutes from './routes/payment';

const app = express();
app.use(express.json());

// Use payment routes
app.use('/api/payment', paymentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
