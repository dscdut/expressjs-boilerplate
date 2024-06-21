import express from 'express';
import authRoute from './auth.route';
import docRoute from './docs.routes';

const router = express.Router();

router.use('/auth', authRoute);
router.use('/docs', docRoute);

export default router;
