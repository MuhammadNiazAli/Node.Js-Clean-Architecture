import express from 'express';
import cors from 'cors';

import authRoutes from './presentation/routes/auth.routes';
import profileRoutes from './presentation/routes/profile.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

export default app;