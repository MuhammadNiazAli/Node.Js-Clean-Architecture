import { Router } from 'express';

import { getProfile } from '../controllers/profile.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', authMiddleware, getProfile);

export default router;