import express from 'express';
import rbacRoutes from './rbac/rbac.routes';

const app = express();

app.use(express.json());
app.use('/api/rbac', rbacRoutes);

export default app;