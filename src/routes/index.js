import express from 'express';
import authRoute from './auth.route';
import docRoute from './docs.routes';
import adminRoute from './admin.route';
import { authenticateToken, isAmdin } from '@/middlewares/authentication';

const router = express.Router();

router.use('/auth', authRoute);
router.use('/docs', docRoute);
router.use('/admin', authenticateToken, isAmdin, adminRoute);

module.exports = router;
